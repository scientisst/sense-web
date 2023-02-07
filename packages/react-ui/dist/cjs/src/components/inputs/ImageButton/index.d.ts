/// <reference types="react" />
export interface ImageAnchorProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
    onClick?: React.ComponentPropsWithoutRef<"button">["onClick"];
    onBlur?: React.ComponentPropsWithoutRef<"button">["onBlur"];
    onFocus?: React.ComponentPropsWithoutRef<"button">["onFocus"];
}
declare const ImageAnchor: React.FC<ImageAnchorProps>;
export default ImageAnchor;
