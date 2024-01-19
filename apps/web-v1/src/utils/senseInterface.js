import ScientISST from "@scientisst/sense"

export async function connectSense(
	comMode,
	address,
	onConnectionLost,
	errorCallback
) {
	let scientisst
	if (comMode === "bth") {
		scientisst = ScientISST.requestPort()
	} else if (comMode === "wifi") {
		scientisst = ScientISST.fromWS(address)
	} else {
		this.toast("Uknown communication mode")
		throw "Uknown communication mode"
	}
	return await scientisst
		.then(async scientisst => {
			if (scientisst) {
				try {
					await scientisst.connect(onConnectionLost)
					return scientisst
				} catch (e) {
					if (e instanceof DOMException) {
						if (
							e.message ===
							"Failed to execute 'open' on 'SerialPort': The port is already open."
						) {
							errorCallback(
								"The port is already open. Reloading SENSE... Try again."
							)
							setTimeout(() => location.reload(), 1000)
						}
						// specific error
					} else if (e.target && e.target instanceof WebSocket) {
						await checkCertificate(
							scientisst,
							`https://${address}/cert`,
							errorCallback
						)
					} else {
						errorCallback(e.toString())
					}
					return null
				}
			}
		})
		.catch(e => {
			if (e instanceof DOMException) {
				errorCallback(
					"Make sure the device is paired and select a port"
				)
				// specific error
			} else {
				errorCallback(e.toString())
				throw e // let others bubble up
			}
			return null
		})
}

async function checkCertificate(scientisst, url, errorCallback) {
	const promise = new Promise(resolve => {
		const request = new XMLHttpRequest()
		request.timeout = 2000 // time in ms
		request.open("GET", url, true) // false for synchronous request

		request.onload = function () {
			resolve()
			errorCallback("Certificate is valid")
		}

		request.ontimeout = function () {
			resolve()
			errorCallback("Timeout. Are you connected to the device WiFi?")
		}

		request.onerror = function () {
			resolve()
			errorCallback("Redirecting to certificate authorization page...")
			setTimeout(() => scientisst.requestCert(), 1000)
		}

		request.send(null)
		return true
	})
	await promise
}
