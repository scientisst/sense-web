/// <reference types="react" />
import { FooterProps } from "./Footer";
import { HeaderProps } from "./Header";
export interface HeaderAndFooterLayoutProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    title?: HeaderProps["title"];
    shortTitle?: HeaderProps["shortTitle"];
    returnHref?: HeaderProps["returnHref"];
    homeHref?: HeaderProps["homeHref"];
    headerLogo?: HeaderProps["logo"];
    footerLogo?: FooterProps["logo"];
    motto?: FooterProps["motto"];
    socialMediaLinks?: FooterProps["socialMediaLinks"];
    sectionA?: FooterProps["sectionA"];
    sectionB?: FooterProps["sectionB"];
    sectionC?: FooterProps["sectionC"];
    sponsorLinks?: FooterProps["sponsorLinks"];
}
declare const HeaderAndFooterLayout: React.FC<HeaderAndFooterLayoutProps>;
export default HeaderAndFooterLayout;
