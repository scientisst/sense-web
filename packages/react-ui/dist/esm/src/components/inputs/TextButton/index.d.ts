/// <reference types="react" />
export type TextButtonSize = "base" | "lg";
export interface TextButtonProps {
    children?: React.ReactNode;
    size: TextButtonSize;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.ComponentPropsWithoutRef<"button">["onClick"];
    onBlur?: React.ComponentPropsWithoutRef<"button">["onBlur"];
    onFocus?: React.ComponentPropsWithoutRef<"button">["onFocus"];
    disabled?: boolean;
}
declare const TextButton: import("react").ForwardRefExoticComponent<TextButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default TextButton;
