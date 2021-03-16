import { FieldProps } from "formik";
import React from "react";
interface ISelectProps {
    label?: string;
    width: string;
    background?: string;
    options: string[];
}
declare const _default: React.MemoExoticComponent<({ field, form: { setFieldValue }, label, background, width, options, ...props }: FieldProps<any, any> & ISelectProps) => JSX.Element>;
export default _default;
