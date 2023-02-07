/// <reference types="react" />
import { Field } from "formik";
interface ButtonRadioGroupProps {
    label?: string;
    id: string;
    center?: boolean;
    className?: string;
    style?: React.CSSProperties;
    options: Array<{
        name: string;
        value: string | number;
        ariaLabel?: string;
    }>;
}
export type ButtonRadioGroupFieldProps = ButtonRadioGroupProps & {
    name: React.ComponentPropsWithoutRef<typeof Field>["name"];
};
declare const ButtonRadioGroupField: React.FC<ButtonRadioGroupFieldProps>;
export default ButtonRadioGroupField;
