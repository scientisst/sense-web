import { faLightbulb as faLightbulbRegular } from "@fortawesome/free-regular-svg-icons"
import {
	faChevronLeft,
	faLightbulb as faLightbulbSolid
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

import SenseLogo from "../../../assets/logos/SenseLogo"
import { themeTw } from "../../../styles/theme"
import ImageAnchor from "../../inputs/ImageAnchor"
import ImageButton from "../../inputs/ImageButton"
import toggleColorScheme from "../../utils/toggleColorScheme"

export interface HeaderProps {
	returnHref?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"]
	title?: React.ReactNode
	shortTitle?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ returnHref, title, shortTitle }) => {
	return (
		<nav
			className={clsx(
				"flex h-16 items-center justify-center drop-shadow-lg",
				themeTw.background.tint["red"],
				themeTw.text.textOver.tint["red"].primary
			)}
		>
			<div className="container grid h-full select-none grid-cols-[4rem_auto_4rem] items-stretch justify-items-stretch sm:grid-cols-[8rem_auto_8rem] sm:px-4">
				<div className="flex items-center justify-start">
					{returnHref ? (
						<ImageAnchor href={returnHref}>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className="h-8 w-8 p-4"
							/>
						</ImageAnchor>
					) : null}
				</div>
				<div className="flex items-center justify-center ">
					{title ? (
						<>
							<span className="imagine-font mb-2 hidden text-4xl uppercase leading-none sm:block">
								{title}
							</span>
							<span className="imagine-font mb-2 text-4xl uppercase leading-none sm:hidden">
								{shortTitle ?? title}
							</span>
						</>
					) : null}
				</div>
				<div className="flex items-center justify-end">
					<ImageButton
						onClick={toggleColorScheme}
						className="mr-4 hidden sm:flex"
					>
						<FontAwesomeIcon
							icon={faLightbulbSolid}
							className="hidden h-6 w-6 p-3 dark:inline"
						/>
						<FontAwesomeIcon
							icon={faLightbulbRegular}
							className="h-6 w-6 p-3 dark:hidden"
						/>
					</ImageButton>
					<ImageAnchor href="/">
						<SenseLogo className="h-16 w-16 p-2" />
					</ImageAnchor>
				</div>
			</div>
		</nav>
	)
}

export default Header
