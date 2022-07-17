
export default class Serial {
    #port;
    #baudRate;
    connected = false;
    #connecting;

    #writer = null;
    #writableStreamClosed = undefined;
    #reader = null;
    #readableStreamClosed = undefined;
    #keepReading = true;
    #closedPromise = null;

    #errorContactingCount = 0;
    #onConnectionLost = undefined;

    constructor(port = undefined) {
        this.#port = port;

        navigator.serial.addEventListener("connect", (event) => {
            console.log(event);
            this.connected = true;
        });

        navigator.serial.addEventListener("disconnect", (event) => {
            // If the serial port was opened, a stream error would be observed as well.
            console.log(event);
            this.connected = false;
        });
    }

    static async requestPort() {
        // Prompt user to select any serial port.
        const port = await navigator.serial.requestPort();

        return new Serial(port);
    }

    async connect(baudRate = 9600, readCallback = undefined, onConnectionLost = undefined) {
        this.#connecting = true;

        try {
            await this.#port.open({ baudRate: baudRate });

            // eslint-disable-next-line
            const textEncoder = new TextEncoderStream();
            this.#writableStreamClosed = textEncoder.readable.pipeTo(this.#port.writable);
            this.#writer = textEncoder.writable.getWriter();

            this.#closedPromise = this.readUntilClosed(readCallback);

            this.#connecting = false;
            this.connected = true;
            this.#onConnectionLost = onConnectionLost;
            console.log("Serial Device CONNECTED");
        } catch (e) {
            this.disconnect(false);
            throw (e);
        }
    }

    async disconnect(log = true) {
        this.#keepReading = false;
        if (this.live) {
            await this.stop();
        }

        if (this.#reader) {
            this.#reader.cancel()
            await this.#readableStreamClosed.catch(() => { /* Ignore the error */ });
            await this.#closedPromise;
        }

        if (this.#writer) {
            this.#writer.close();
            await this.#writableStreamClosed;
        }

        await this.#port.close();

        this.connected = false;
        if (log) {
            console.log("Serial Device DISCONNECTED");
        }
    }

    async readUntilClosed(callback = undefined) {
        while (this.#port.readable && this.#keepReading) {
            // eslint-disable-next-line
            const textDecoder = new TextDecoderStream();
            this.#readableStreamClosed = this.#port.readable.pipeTo(textDecoder.writable);
            // eslint-disable-next-line
            this.#reader = textDecoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer())).getReader();
            try {
                // eslint-disable-next-line
                while (true) {
                    const { value, done } = await this.#reader.read();
                    if (done) {
                        // Allow the serial port to be closed later.
                        break;
                    }
                    if (callback != undefined) {
                        callback(value);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                // Allow the serial port to be closed later.
                this.#reader.releaseLock();
            }
        }
    }
}

class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.chunks = "";
    }

    transform(chunk, controller) {
        // Append new chunks to existing chunks.
        this.chunks += chunk;
        // For each line breaks in chunks, send the parsed lines out.
        const lines = this.chunks.split("\r\n");
        this.chunks = lines.pop();
        lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
        // When the stream is closed, flush any remaining chunks out.
        controller.enqueue(this.chunks);
    }
}