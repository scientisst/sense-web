import {
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin
} from "@fortawesome/free-brands-svg-icons"

import ScientISSTLogo from "../../../assets/logos/ScientISST.svg"
import ItLogo from "../../../assets/logos/it.svg"
import TecnicoLogo from "../../../assets/logos/tecnico.svg"
import SocialMediaButton from "./SocialMediaButton"
import SponsorLogoButton from "./SponsorLogoButton"

const Footer = () => {
	return (
		<footer className="container flex flex-col justify-between gap-8 px-4 py-6 sm:flex-row sm:gap-4">
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<SocialMediaButton
						href="https://github.com/scientisst"
						icon={faGithub}
						arialLabel="ScientISST GitHub"
					/>
					<SocialMediaButton
						href="https://www.instagram.com/scientissthub/"
						icon={faInstagram}
						arialLabel="ScientISST Instagram"
					/>
					<SocialMediaButton
						href="https://www.facebook.com/ScientISST"
						icon={faFacebook}
						arialLabel="ScientISST Facebook"
					/>
					<SocialMediaButton
						href="https://www.linkedin.com/company/scientisst/"
						icon={faLinkedin}
						arialLabel="ScientISST LinkedIn"
					/>
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
			<div className="flex flex-col gap-4">
				<SponsorLogoButton href="https://scientisst.com">
					<ScientISSTLogo />
				</SponsorLogoButton>
				<SponsorLogoButton href="https://it.pt">
					<ItLogo />
				</SponsorLogoButton>
				<SponsorLogoButton href="https://tecnico.ulisboa.pt">
					<TecnicoLogo />
				</SponsorLogoButton>
			</div>
		</footer>
	)
}

export default Footer
