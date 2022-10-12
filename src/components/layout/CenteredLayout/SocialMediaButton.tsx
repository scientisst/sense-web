import Link from "next/link"

import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface SocialMediaButtonProps {
	href: React.ComponentPropsWithoutRef<typeof Link>["href"]
	icon: IconDefinition
	arialLabel: string
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
	href,
	icon,
	arialLabel
}) => {
	return (
		<Link href={href}>
			<a className="leading-none" aria-label={arialLabel}>
				<FontAwesomeIcon
					icon={icon}
					className="h-8 w-8 hover:text-secondary-white"
				/>
			</a>
		</Link>
	)
}

export default SocialMediaButton
