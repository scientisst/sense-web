import React from "react";
import { Field } from "formik";
interface TextInputProps {
    label?: string;
    placeholder?: string;
    id: string;
    center?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export type TextFieldProps = TextInputProps & {
    name: React.ComponentPropsWithoutRef<typeof Field>["name"];
};
declare const TextField: React.FC<TextFieldProps>;
export default TextField;
