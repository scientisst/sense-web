// around 5 mb
const CHUNK_LENGTH = 5200000

export default class FileWriter {
	buffer = null
	file = null
	dataChunks = null

	constructor() {
		this.buffer = ""
		this.dataChunks = []
	}

	addLine(line) {
		this.buffer += line
		this.serialize()
	}

	// store chunks of CHUNK_LENGTH to avoid the overflow of lines
	serialize() {
		if (this.buffer.length > CHUNK_LENGTH) {
			this.dataChunks.push(this.buffer.slice(0, CHUNK_LENGTH))
			this.buffer = this.buffer.slice(CHUNK_LENGTH)
		}
	}

	// convert chunks to blob file
	getFile() {
		this.dataChunks.push(this.buffer)
		this.file = new Blob(this.dataChunks, { type: "text/plain" })
		this.buffer = ""
		this.dataChunks = []
		return this.file
	}
}
