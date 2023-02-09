import { AspectRatio, chakra } from "@chakra-ui/react"

export interface SenseLogotypeProps {
	className?: string
	style?: React.CSSProperties
	monochrome?: boolean
}

export const SenseLogotype = chakra(
	({ monochrome, ...props }: SenseLogotypeProps) => {
		return (
			<AspectRatio
				as={chakra.svg}
				viewBox="0 0 501.81 143.87"
				ratio={501.81 / 143.87}
				xmlns="http://www.w3.org/2000/svg"
				aria-label="ScientISST Sense"
				fill="currentColor"
				{...props}
			>
				<g transform="translate(1.81 1.81)">
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M137.37,64.16c-4,0-8.07,0-12.11,0-1.33,0-1.77-.44-1.75-1.75.08-3,.09-6.06,0-9.09-.05-1.51.56-1.88,2-1.86,3.93.07,7.87,0,11.8,0,1.3,0,1.8-.4,1.77-1.74-.07-3.12-.06-6.26,0-9.39,0-1.27-.5-1.66-1.7-1.65-3.79,0-7.57,0-11.36,0-2.44,0-2.4,0-2.45-2.38-.1-4.41.7-8.91-.83-13.1-2.24-6.1-7.83-9-14.31-9-1.87,0-3.74-.05-5.6,0-1.25.05-1.69-.44-1.67-1.68l0-3.4c0-2.46,0-4.93,0-7.39a3.5,3.5,0,0,0,0-.67C101,.3,100.51,0,99.43,0c-3.12.08-6.25.07-9.38,0-1.13,0-1.57.38-1.64,1.32a2.31,2.31,0,0,0,0,.38c0,.39,0,7.62,0,10.85,0,1.23-.4,1.72-1.66,1.7-3.08-.06-6.15-.08-9.23,0-1.41,0-1.82-.48-1.8-1.85,0-1.08,0-8.17,0-10.63A3,3,0,0,0,75.7,1C75.55.28,75.06,0,74,0c-3.12.08-6.25.07-9.38,0C63.36,0,63,.5,63,1.71v.1h0C63,5.38,63,9,63,12.53c0,1.35-.51,1.75-1.79,1.73-3-.06-5.94-.08-8.9,0-1.44,0-1.8-.56-1.78-1.88,0-1.07,0-9.46.05-10.6a3.83,3.83,0,0,0,0-.61C50.45.32,50,0,48.86,0c-3.12.08-6.25.07-9.38,0C38.39,0,38,.36,37.85,1.22a2.57,2.57,0,0,0,0,.49c0,.9,0,8,0,10.69,0,1.34-.39,1.92-1.81,1.86-2.31-.09-4.63,0-7,0-7.62.08-12.95,4.78-14,12.34-.48,3.36-.16,6.74-.25,10.11-.05,2.06,0,2.08-2.15,2.08-3.11,0-11.24,0-11.38,0C.36,38.87,0,39.33,0,40.5c.08,3.13.07,6.26,0,9.39,0,1,.31,1.48,1.08,1.61.19,0,9.76,0,12.08,0,1.22,0,1.71.39,1.68,1.65,0,3.08-.07,6.16,0,9.24,0,1.41-.49,1.82-1.85,1.8-3.08,0-11.66,0-11.84,0-.85.13-1.19.6-1.17,1.71.08,3.13.07,6.26,0,9.39,0,1.09.36,1.54,1.22,1.63.15,0,7.94,0,7.94,0l4,0c1.34,0,1.75.52,1.72,1.79,0,2.09-.06,4.17,0,6.25,0,.89,0,1.77,0,2.66,0,1.44-.56,1.8-1.88,1.78-3.55,0-7.11,0-10.67,0H1.46C.4,89.42,0,89.87,0,91.09c.08,3.13.07,6.26,0,9.39,0,1,.3,1.47,1,1.61a4.33,4.33,0,0,0,.66,0c2.49,0,5,0,7.46,0h0l3.85,0c1.37,0,1.85.42,1.85,1.82a75.21,75.21,0,0,0,.21,9.37,14.43,14.43,0,0,0,14.06,12.77c2.32,0,4.65.07,7,0,1.31,0,1.8.39,1.77,1.73-.07,3.48,0,7,0,10.45,0,1.83.16,2,2,2,2.93,0,5.85,0,8.78,0,1.8,0,2-.16,2-2,0-3.43,0-6.86,0-10.29,0-1.34.34-1.91,1.79-1.87,3,.09,6,.07,9.08,0,1.17,0,1.61.41,1.6,1.58,0,3.59,0,7.17,0,10.75,0,1.38.49,1.89,1.86,1.87,3.08-.07,6.16-.06,9.23,0,1.23,0,1.7-.43,1.68-1.69-.06-3.63,0-7.26,0-10.89,0-1.16.34-1.64,1.55-1.62,3.18.06,6.35.06,9.53,0,1.18,0,1.61.4,1.6,1.59,0,3.58,0,7.16,0,10.75,0,1.38.49,1.89,1.85,1.86,3.08-.05,6.16,0,9.23,0,1.24,0,1.71-.49,1.69-1.72,0-3.58,0-7.17,0-10.75,0-1.34.46-1.8,1.77-1.73l1.3,0V117.8H30.73c-5,0-7.41-2.34-7.41-7.4V70q0-20.52,0-41c0-4.36,1.86-6.21,6.14-6.21h79.35c7.56,0,6.25,6.41,6.25,12.36q0,24.93,0,49.86h8.49c0-2.14,0-4.29,0-6.43,0-1.17.44-1.62,1.61-1.61,3.93,0,7.87,0,11.8,0,2.06,0,2.09,0,2.09-2.14,0-3,0-6,0-8.94,0-1.24-.43-1.69-1.67-1.67"
						fillRule="evenodd"
					/>
					<chakra.path
						d="M258.57,70.25v2.9H246.75V76h5.91v2.9h-5.91v2.9h11.82v2.89H243.79V70.25Zm-17.71,0v2.9H229V76h11.82v8.69H226.08V81.84h11.83v-2.9H226.08V70.25Zm-17.7,0V84.73h-3V73.15h-8.87V84.73h-3V70.25Zm-17.71,0v2.9H193.63V76h5.91v2.9h-5.91v2.9h11.82v2.89H190.67V70.25Zm-17.7,0v2.9H175.92V76h11.83v8.69H173V81.84h11.82v-2.9H173V70.25Z"
						fillRule="evenodd"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M173,49.34h25.69V42.92H173V23.65h32.11v6.42H179.39V36.5h25.69V55.77H173Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M211.45,23.65h32.11v6.42H217.87V49.34h25.69v6.43H211.45Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M249.92,23.65h6.43V55.77h-6.43Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M262.71,23.65h32.12v6.42h-25.7V36.5H282v6.42H269.13v6.42h25.7v6.43H262.71Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M301.19,23.65H333.3V55.77h-6.42V30.07H307.61v25.7h-6.42Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M339.67,23.65h32.11v6.42H358.93v25.7h-6.42V30.07H339.67Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M378.14,23.65h6.43V55.77h-6.43Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M390.93,49.34h25.69V42.92H390.93V23.65H423v6.42H397.35V36.5H423V55.77H390.93Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M429.41,49.34H455.1V42.92H429.41V23.65h32.11v6.42H435.83V36.5h25.69V55.77H429.41Z"
					/>
					<chakra.path
						fill={monochrome ? undefined : "scientisst.red.dark"}
						_dark={{
							fill: monochrome
								? undefined
								: "scientisst.red.light"
						}}
						d="M467.88,23.65H500v6.42H487.15v25.7h-6.42V30.07H467.88Z"
					/>
				</g>
			</AspectRatio>
		)
	}
)

SenseLogotype.displayName = "SenseLogotype"
