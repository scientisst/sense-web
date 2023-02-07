import { ReactNode } from "react";
import { ImageAnchor } from "../../navigation";
export interface HeaderProps {
    title?: string;
    shortTitle?: string;
    returnHref?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"];
    homeHref?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"];
    logo?: ReactNode;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
