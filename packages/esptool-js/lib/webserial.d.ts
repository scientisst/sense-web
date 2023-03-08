/// <reference types="w3c-web-serial" />
declare class Transport {
    device: SerialPort;
    slip_reader_enabled: boolean;
    left_over: Uint8Array;
    baudrate: number;
    constructor(device: SerialPort);
    get_info(): string;
    get_pid(): number | undefined;
    slip_writer(data: Uint8Array): Uint8Array;
    write(data: Uint8Array): Promise<void>;
    _appendBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBufferLike;
    slip_reader(data: Uint8Array): Uint8Array;
    read(timeout?: number, min_data?: number): Promise<Uint8Array>;
    rawRead(timeout?: number): Promise<Uint8Array>;
    _DTR_state: boolean;
    setRTS(state: boolean): Promise<void>;
    setDTR(state: boolean): Promise<void>;
    connect(baud?: number): Promise<void>;
    sleep(ms: number): Promise<unknown>;
    waitForUnlock(timeout: number): Promise<void>;
    disconnect(): Promise<void>;
}
export { Transport };
