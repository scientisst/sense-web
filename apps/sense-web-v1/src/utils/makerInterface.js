import Serial from "@/utils/serial.js";

export async function connectMaker(
  baudRate,
  onSerialData,
  onConnectionLost,
  errorCallback
) {
  let serial = await Serial.requestPort();

  try {
    await serial.connect(baudRate, onSerialData, onConnectionLost);
      return serial;
  } catch (e) {
    if (e instanceof DOMException) {
      if (
        e.message ===
        "Failed to execute 'open' on 'SerialPort': The port is already open."
      ) {
        this.toast("The port is already open. Reloading page... Try again.");
        setTimeout(() => location.reload(), 1000);
      }
    } else {
      errorCallback(e.toString());
    }
  }
  return null;
}
