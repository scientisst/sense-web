import React from "react";
import { Field } from "formik";
interface NumberInputProps {
    label?: string;
    placeholder?: string;
    id: string;
    center?: boolean;
    name: React.ComponentPropsWithoutRef<typeof Field>["name"];
    className?: string;
    style?: React.CSSProperties;
    min?: number;
    max?: number;
    step?: number;
}
export type NumberFieldProps = NumberInputProps & {
    name: React.ComponentPropsWithoutRef<typeof Field>["name"];
};
declare const NumberField: React.FC<NumberFieldProps>;
export default NumberField;
