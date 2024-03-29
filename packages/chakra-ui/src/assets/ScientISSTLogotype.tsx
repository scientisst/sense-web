import { AspectRatio, chakra } from "@chakra-ui/react"

export interface ScientISSTLogotypeProps {
	className?: string
	style?: React.CSSProperties
}

export const ScientISSTLogotype = chakra(
	({ ...props }: ScientISSTLogotypeProps) => {
		return (
			<AspectRatio
				as={chakra.svg}
				viewBox="0 0 500 77.56"
				ratio={500 / 77.56}
				xmlns="http://www.w3.org/2000/svg"
				aria-label="ScientISST"
				fill="currentColor"
				{...props}
			>
				<chakra.g>
					<rect x="19.58" y="19.5" width="3.41" height="15.26" />
					<path d="M0,0H77.37V34.85H69.53v-27h-27v27H34.7v-27H7.84v27H0ZM69.53,69.72H7.84v-27H0V77.56H77.37V42.69H69.53Z" />
					<rect x="54.36" y="19.5" width="3.41" height="15.26" />
					<polygon points="19.58 45.69 19.58 62.32 29.99 62.32 29.99 49.01 33.45 49.01 33.45 62.32 33.52 62.32 33.52 62.32 40.38 62.32 43.85 62.32 43.92 62.32 43.92 49.01 47.31 49.01 47.31 62.32 47.39 62.32 50.86 62.32 57.72 62.32 57.72 62.32 57.77 62.32 57.77 45.69 57.72 45.69 54.35 45.69 54.35 58.99 50.86 58.99 50.86 45.69 50.78 45.69 40.45 45.69 40.38 45.69 40.38 58.99 36.99 58.99 36.99 45.69 36.92 45.69 33.52 45.69 26.52 45.69 26.52 58.99 23.01 58.99 23.01 45.69 19.58 45.69" />
					<path d="M93.34,18.81h39.94v8H101.33v8h32v24H93.34v-8h32v-8H93.34Zm47.85,39.94h39.93v-8H149.18v-24h31.94v-8H141.19Zm47.85,0h8V18.81h-8Zm15.89,0h39.94v-8h-32v-8h16v-8h-16v-8h32v-8H204.93Zm47.85,0h8V26.8h24v32h8V18.81H252.78Zm95.69,0h8V18.81h-8Zm15.9-16h31.95v8H364.37v8h39.94v-24H372.36v-8h31.95v-8H364.37Zm47.85,0h31.95v8H412.22v8h39.93v-24H420.2v-8h31.95v-8H412.22Zm47.84-24v8h16v32h8V26.8h16v-8Zm-159.43,8h16v32h8V26.8h16v-8H300.63Z" />
				</chakra.g>
			</AspectRatio>
		)
	}
)

ScientISSTLogotype.displayName = "ScientISSTLogotype"
