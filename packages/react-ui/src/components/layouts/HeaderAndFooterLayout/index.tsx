import Footer, { FooterProps } from "./Footer"
import Header, { HeaderProps } from "./Header"

export interface HeaderAndFooterLayoutProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	title?: HeaderProps["title"]
	shortTitle?: HeaderProps["shortTitle"]
	returnHref?: HeaderProps["returnHref"]
	homeHref?: HeaderProps["homeHref"]
	headerLogo?: HeaderProps["logo"]
	footerLogo?: FooterProps["logo"]
	motto?: FooterProps["motto"]
	socialMediaLinks?: FooterProps["socialMediaLinks"]
	sectionA?: FooterProps["sectionA"]
	sectionB?: FooterProps["sectionB"]
	sectionC?: FooterProps["sectionC"]
	sponsorLinks?: FooterProps["sponsorLinks"]
}

const HeaderAndFooterLayout: React.FC<HeaderAndFooterLayoutProps> = ({
	children,
	className,
	style,
	title,
	shortTitle,
	returnHref,
	homeHref,
	headerLogo,
	footerLogo,
	motto,
	socialMediaLinks,
	sectionA,
	sectionB,
	sectionC,
	sponsorLinks
}) => {
	return (
		<div className="grid h-screen w-screen grid-cols-1 grid-rows-[min-content_auto] overflow-hidden">
			<Header
				title={title}
				shortTitle={shortTitle}
				returnHref={returnHref}
				homeHref={homeHref}
				logo={headerLogo}
			/>
			<div className="grid grid-cols-1 grid-rows-[min-content_auto_min-content] content-between overflow-y-auto overflow-x-hidden">
				<div />
				<div className="flex items-center justify-center overflow-visible">
					<main className={className} style={style}>
						{children}
					</main>
				</div>
				<Footer
					logo={footerLogo}
					motto={motto}
					socialMediaLinks={socialMediaLinks}
					sectionA={sectionA}
					sectionB={sectionB}
					sectionC={sectionC}
					sponsorLinks={sponsorLinks}
				/>
			</div>
		</div>
	)
}

export default HeaderAndFooterLayout
