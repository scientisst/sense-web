import { useEffect, useState } from "react"

const Page = () => {
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		if (loaded && typeof window !== "undefined") {
			;(async () => {
				const { loadPyodide } = await import("pyodide")
				console.log("loading")
				const pyodide = await loadPyodide({
					indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/"
				})
				console.log("loaded")
				console.log("install packages")
				await pyodide.loadPackage("micropip")
				const micropip = pyodide.pyimport("micropip")
				await micropip.install("numpy")
				const resultB = await pyodide.runPythonAsync(
					"import numpy; numpy.__version__"
				)
				console.log(resultB)

				const resultC = await pyodide.runPythonAsync(
					"import numpy; numpy.average([1, 2, 3])"
				)

				console.log(typeof resultC)

				console.log(resultC)
				console.log("done installing packages")
				const result = await pyodide.runPythonAsync("2 + 2")
				console.log(result)

				// load ecg.txt from /public/static
				const response = await fetch("/static/ecg.txt")
				const text = await response.text()

				// insert file into pyodide
				pyodide.FS.writeFile("ecg.txt", text)

				// biosppy
				await micropip.install("biosppy")

				console.log("code")

				const code = `
				import numpy as np
				from biosppy.signals import ecg
				
				# load raw ECG signal
				signal = np.loadtxt('./ecg.txt')
				
				print("running...")
				
				# process it and plot
				ecg.ecg(signal=signal, sampling_rate=1000., show=False)
				`

				console.log("done")

				const resultD = await pyodide.runPythonAsync(code)

				console.log(resultD)
				console.log("done2")
			})()
			return
		}

		setLoaded(true)
	}, [loaded])

	return <>Hello World</>
}

export default Page
