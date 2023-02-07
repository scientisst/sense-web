import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageAnchor } from "../../navigation";
import { FooterLinkSectionProps } from "./FooterLinkSection";
export interface SocialMediaLink {
    href: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"];
    icon: React.ComponentPropsWithoutRef<typeof FontAwesomeIcon>["icon"];
    ariaLabel: React.ComponentPropsWithoutRef<typeof ImageAnchor>["ariaLabel"];
}
export interface SponsorLink {
    href: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"];
    img: React.ComponentPropsWithoutRef<typeof ImageAnchor>["children"];
    ariaLabel?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["ariaLabel"];
}
export interface FooterProps {
    socialMediaLinks?: SocialMediaLink[];
    logo?: ReactNode;
    motto?: string;
    sectionA?: FooterLinkSectionProps;
    sectionB?: FooterLinkSectionProps;
    sectionC?: FooterLinkSectionProps;
    sponsorLinks?: SponsorLink[];
}
declare const Footer: React.FC<FooterProps>;
export default Footer;
