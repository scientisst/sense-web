onmessage = (
	event: MessageEvent<{
		data: [number, number | null][]
		samplesPerBucket: number
	}>
) => {
	const { data, samplesPerBucket } = event.data

	if (data.length === 0) {
		postMessage({
			downsampledData: [],
			lastOriginal: 0,
			lastDownsampled: 0
		})
		return
	}

	const downsampledData: [number, number | null][] = []
	const segments: [number, number][] = []

	for (let i = 0; i < data.length; i++) {
		if (data[i][1] === null) {
			continue
		}

		const segmentStart = i

		while (i < data.length && data[i][1] !== null) {
			i++
		}
		i--

		segments.push([segmentStart, i])
	}

	let lastBlockStart = 0
	let lastBlockDownsampledIndex = 0

	if (data[0][1] === null) {
		downsampledData.push([data[0][0], null])
		lastBlockStart = 1
		lastBlockDownsampledIndex = 1
	}

	for (let i = 0; i < segments.length; i++) {
		const [segmentStart, segmentEnd] = segments[i]
		const segmentLength = segmentEnd - segmentStart + 1

		downsampledData.push(data[segmentStart])

		const buckets = Math.ceil((segmentLength - 2) / samplesPerBucket)

		if (segmentLength > 2) {
			for (let j = 0; j < buckets; j++) {
				const bucketStart = j * samplesPerBucket + segmentStart + 1
				const bucketEnd = Math.min(
					(j + 1) * samplesPerBucket + segmentStart,
					segmentEnd - 1
				)

				lastBlockStart = bucketStart
				lastBlockDownsampledIndex = downsampledData.length

				const nextBucketStart = bucketEnd + 1
				const nextBucketEnd = Math.min(
					(j + 2) * samplesPerBucket + segmentStart,
					segmentEnd
				)

				const previousBucketPoint =
					downsampledData[downsampledData.length - 1]

				let xAvg = 0
				let yAvg = 0
				for (let k = nextBucketStart; k <= nextBucketEnd; k++) {
					xAvg += data[k][0]
					yAvg += data[k][1] as number
				}

				xAvg /= bucketEnd - bucketStart + 1
				yAvg /= bucketEnd - bucketStart + 1

				let max_area = -1
				let max_area_index = -1
				for (let k = bucketStart; k <= bucketEnd; k++) {
					const area = Math.abs(
						previousBucketPoint[0] *
							((data[k][1] as number) - yAvg) +
							data[k][0] *
								(yAvg - (previousBucketPoint[1] as number)) +
							xAvg *
								((previousBucketPoint[1] as number) -
									(data[k][1] as number))
					)

					if (area > max_area) {
						max_area_index = k
						max_area = area
					}
				}

				downsampledData.push(data[max_area_index])
			}
		}

		if (segmentLength >= 2) {
			downsampledData.push(data[segmentEnd])
		}

		if (i !== segments.length - 1) {
			let xAvg = 0

			for (let k = segmentEnd + 1; k < segments[i + 1][0]; k++) {
				xAvg += data[k][0]
			}

			xAvg /= segments[i + 1][0] - segmentEnd - 1

			downsampledData.push([xAvg, null])
		}
	}

	if (data[data.length - 1][1] === null && data.length > 1) {
		downsampledData.push([data[data.length - 1][0], null])
		lastBlockStart = data.length - 1
		lastBlockDownsampledIndex = downsampledData.length - 1
	}

	postMessage({
		downsampledData,
		lastOriginal: lastBlockStart,
		lastDownsampled: lastBlockDownsampledIndex
	})
}

export {}
