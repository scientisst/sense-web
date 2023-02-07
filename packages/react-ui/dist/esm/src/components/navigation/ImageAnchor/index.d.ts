/// <reference types="react" />
import Link from "next/link";
export interface ImageAnchorProps {
    children?: React.ReactNode;
    href: React.ComponentPropsWithoutRef<typeof Link>["href"];
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
}
declare const ImageAnchor: React.FC<ImageAnchorProps>;
export default ImageAnchor;
