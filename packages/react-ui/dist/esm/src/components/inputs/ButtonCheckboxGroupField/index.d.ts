/// <reference types="react" />
import { Field } from "formik";
interface ButtonCheckboxGroupProps {
    label?: string;
    id: string;
    className?: string;
    style?: React.CSSProperties;
    center?: boolean;
    options: Array<{
        name: string;
        value: string | number;
        ariaLabel?: string;
    }>;
    image?: (hovered: string | number) => React.ReactNode;
}
export type ButtonCheckboxGroupFieldProps = ButtonCheckboxGroupProps & {
    name: React.ComponentPropsWithoutRef<typeof Field>["name"];
};
declare const ButtonCheckboxGroupField: React.FC<ButtonCheckboxGroupFieldProps>;
export default ButtonCheckboxGroupField;
