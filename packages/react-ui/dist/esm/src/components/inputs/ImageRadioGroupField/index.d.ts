import React from "react";
import { Field } from "formik";
interface ImageRadioGroupProps {
    label?: string;
    id: string;
    center?: boolean;
    className?: string;
    style?: React.CSSProperties;
    options: Array<{
        img: React.ReactNode;
        name: string;
        value: string;
        ariaLabel?: string;
    }>;
}
export type ImageRadioGroupFieldProps = ImageRadioGroupProps & {
    name: React.ComponentPropsWithoutRef<typeof Field>["name"];
};
declare const ImageRadioGroupField: React.FC<ImageRadioGroupFieldProps>;
export default ImageRadioGroupField;
