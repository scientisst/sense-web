import { ReactNode } from "react"

import { faLightbulb as faLightbulbRegular } from "@fortawesome/free-regular-svg-icons"
import {
	faChevronLeft,
	faLightbulb as faLightbulbSolid
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { toggleDarkTheme } from "../../../dark-theme"
import { ImageButton } from "../../inputs"
import { ImageAnchor } from "../../navigation"

export interface HeaderProps {
	title?: string
	shortTitle?: string
	returnHref?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"]
	homeHref?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"]
	logo?: ReactNode
}

const Header: React.FC<HeaderProps> = ({
	title,
	shortTitle,
	returnHref,
	homeHref,
	logo
}) => {
	return (
		<nav className="bg-primary text-over-primary-highest flex h-16 items-center justify-center drop-shadow-lg">
			<div className="container grid h-full select-none grid-cols-[4rem_auto_4rem] items-stretch justify-items-stretch sm:grid-cols-[8rem_auto_8rem] sm:px-4">
				<div className="flex items-center justify-start">
					{!!returnHref && (
						<ImageAnchor
							href={returnHref}
							ariaLabel="Return to previous page"
						>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className="h-8 w-8 p-4"
							/>
						</ImageAnchor>
					)}
				</div>
				<div className="flex items-center justify-center">
					{!!title && (
						<>
							<span className="mb-2 hidden font-secondary text-4xl uppercase leading-none sm:block">
								{title}
							</span>
							<span className="mb-2 font-secondary text-4xl uppercase leading-none sm:hidden">
								{shortTitle ?? title}
							</span>
						</>
					)}
				</div>
				<div className="flex items-center justify-end">
					<ImageButton
						onClick={toggleDarkTheme}
						className="mr-4 hidden sm:flex"
					>
						<FontAwesomeIcon
							icon={faLightbulbRegular}
							className="inline h-6 w-6 p-3 dark:hidden"
						/>
						<FontAwesomeIcon
							icon={faLightbulbSolid}
							className="hidden h-6 w-6 p-3 dark:inline"
						/>
					</ImageButton>
					<ImageAnchor
						href={homeHref ?? "/"}
						className="flex h-16 w-16 items-center justify-center"
					>
						{logo}
					</ImageAnchor>
				</div>
			</div>
		</nav>
	)
}

export default Header
