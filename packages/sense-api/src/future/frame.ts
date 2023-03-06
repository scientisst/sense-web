import { ScientISSTAdcCharacteristics } from "./adcCharacteristics"
import { CHANNEL } from "./enums"

export class ScientISSTFrame {
	public readonly adcCharacteristics: ScientISSTAdcCharacteristics
	public readonly analog: Record<CHANNEL, number | null | undefined>
	public readonly sequence: number

	constructor(
		adcCharacteristics: ScientISSTAdcCharacteristics,
		analog: Record<CHANNEL, number | null | undefined>,
		sequence: number
	) {
		this.adcCharacteristics = adcCharacteristics
		this.analog = analog
		this.sequence = sequence
	}
}
