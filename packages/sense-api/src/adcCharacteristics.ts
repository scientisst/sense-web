export enum ADC_UNIT {
	ADC_UNIT_1 = 1,
	ADC_UNIT_2 = 2,
	ADC_UNIT_BOTH = 3,
	ADC_UNIT_ALTER = 7
}

export enum ADC_ATTEN {
	ADC_ATTEN_DB_0 = 0,
	ADC_ATTEN_DB_2_5 = 1,
	ADC_ATTEN_DB_6 = 2,
	ADC_ATTEN_DB_11 = 3
}

export enum ADC_BITS_WIDTH {
	ADC_BITS_WIDTH_9 = 1,
	ADC_BITS_WIDTH_10 = 2,
	ADC_BITS_WIDTH_11 = 3,
	ADC_BITS_WIDTH_12 = 4
}

export class ScientISSTAdcCharacteristics {
	public readonly adcNum: ADC_UNIT
	public readonly adcAtten: ADC_ATTEN
	public readonly adcBitWidth: ADC_BITS_WIDTH
	public readonly coeffA: number
	public readonly coeffB: number
	public readonly vRef: number

	constructor(
		adcNum: ADC_UNIT,
		adcAtten: ADC_ATTEN,
		adcBitWidth: ADC_BITS_WIDTH,
		coeffA: number,
		coeffB: number,
		vRef: number
	) {
		ScientISSTAdcCharacteristics.validateAdcCharacteristics(
			adcNum,
			adcAtten,
			adcBitWidth,
			coeffA,
			coeffB,
			vRef
		)

		this.adcNum = adcNum
		this.adcAtten = adcAtten
		this.adcBitWidth = adcBitWidth
		this.coeffA = coeffA
		this.coeffB = coeffB
		this.vRef = vRef
	}

	private static validateAdcCharacteristics(
		adcNum?: ADC_UNIT,
		adcAtten?: ADC_ATTEN,
		adcBitWidth?: ADC_BITS_WIDTH,
		coeffA?: number,
		coeffB?: number,
		vRef?: number
	): void {
		if (adcNum === undefined) throw new Error("adcNum is undefined")
		if (ADC_UNIT[adcNum] === undefined) throw new Error("adcNum is invalid")

		if (adcAtten === undefined) throw new Error("adcAtten is undefined")
		if (ADC_ATTEN[adcAtten] === undefined)
			throw new Error("adcAtten is invalid")

		if (adcBitWidth === undefined)
			throw new Error("adcBitWidth is undefined")
		if (ADC_BITS_WIDTH[adcBitWidth] === undefined)
			throw new Error("adcBitWidth is invalid")

		if (coeffA === undefined) throw new Error("coeffA is undefined")

		if (coeffB === undefined) throw new Error("coeffB is undefined")

		if (vRef === undefined) throw new Error("vRef is undefined")
	}

	public toJSON(): string {
		return JSON.stringify({
			adcNum: this.adcNum,
			adcAtten: this.adcAtten,
			adcBitWidth: this.adcBitWidth,
			coeffA: this.coeffA,
			coeffB: this.coeffB,
			vRef: this.vRef
		})
	}

	public static fromJSON(json: string): ScientISSTAdcCharacteristics {
		const obj = JSON.parse(json)

		return new ScientISSTAdcCharacteristics(
			obj.adcNum,
			obj.adcAtten,
			obj.adcBitWidth,
			obj.coeffA,
			obj.coeffB,
			obj.vRef
		)
	}
}
