import { FieldProps } from "formik";
import React from "react";
interface IInputProps {
    label: string;
    width: string;
    background: string;
}
declare const _default: React.MemoExoticComponent<({ field, form, label, width, background, ...props }: FieldProps<any, any> & IInputProps) => JSX.Element>;
export default _default;
