/// <reference types="react" />
import Link from "next/link";
export interface FooterLinkSectionProps {
    title: React.ReactNode;
    links: Array<{
        href: React.ComponentPropsWithoutRef<typeof Link>["href"];
        label: React.ReactNode;
    }>;
    className?: string;
    style?: React.CSSProperties;
}
declare const FooterLinkSection: React.FC<FooterLinkSectionProps>;
export default FooterLinkSection;
