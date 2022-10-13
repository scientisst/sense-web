import {
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ItLogo from "../../../assets/logos/ItLogo"
import ScientISSTLogo from "../../../assets/logos/ScientISSTLogo"
import TecnicoLogo from "../../../assets/logos/TecnicoLogo"
import ImageAnchor from "../../inputs/ImageAnchor"

const Footer = () => {
	return (
		<footer className="container flex flex-col justify-between gap-6 px-4 py-6 sm:flex-row sm:gap-4">
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<ImageAnchor
						href="https://github.com/scientisst"
						ariaLabel="ScientISST GitHub"
					>
						<FontAwesomeIcon icon={faGithub} className="h-8 w-8" />
					</ImageAnchor>
					<ImageAnchor
						href="https://www.instagram.com/scientissthub/"
						ariaLabel="ScientISST GitHub"
					>
						<FontAwesomeIcon
							icon={faInstagram}
							className="h-8 w-8"
						/>
					</ImageAnchor>
					<ImageAnchor
						href="https://www.facebook.com/ScientISST"
						ariaLabel="ScientISST GitHub"
					>
						<FontAwesomeIcon
							icon={faFacebook}
							className="h-8 w-8"
						/>
					</ImageAnchor>
					<ImageAnchor
						href="https://www.linkedin.com/company/scientisst/"
						ariaLabel="ScientISST GitHub"
					>
						<FontAwesomeIcon
							icon={faLinkedin}
							className="h-8 w-8"
						/>
					</ImageAnchor>
				</div>
				<p className="imagine-font text-2xl leading-5">
					SENSE Web v0.6.0
				</p>
				<div>
					<p>
						ScientISST is hosted at Instituto de Telecomunicações
						(IT), Lisboa, Portugal.
					</p>
					<p className="">
						{"© 2022 ScientISST. All rights reserved."}
					</p>
				</div>
			</div>
			<div className="flex flex-col items-start gap-4">
				<ImageAnchor href="https://scientisst.com">
					<ScientISSTLogo />
				</ImageAnchor>
				<ImageAnchor href="https://it.pt">
					<ItLogo />
				</ImageAnchor>
				<ImageAnchor href="https://tecnico.ulisboa.pt">
					<TecnicoLogo />
				</ImageAnchor>
			</div>
		</footer>
	)
}

export default Footer
