interface QueueEntry {
	resolve: (value: undefined) => void
	reject: (error: unknown) => void
}

export class Mutex {
	private queue: QueueEntry[] = []
	private locked = false

	public async acquire(): Promise<void> {
		if (this.locked) {
			await new Promise<void>((resolve, reject) => {
				this.queue.push({ resolve, reject })
			})
		}

		this.locked = true
	}

	public release(): void {
		if (this.queue.length > 0) {
			const { resolve } = this.queue.shift()
			resolve(undefined)
		} else {
			this.locked = false
		}
	}

	public isLocked(): boolean {
		return this.locked
	}

	public cancel(error: unknown) {
		this.queue.forEach(({ reject }) => reject(error))
		this.queue = []
		this.locked = false
	}
}
