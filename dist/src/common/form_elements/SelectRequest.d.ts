import { FieldProps } from "formik";
import React from "react";
import { IGemstone } from "../../constants/types/interfaces/commonInterfaces";
interface ISelectProps {
    label?: string;
    width: string;
    background?: string;
    options: IGemstone[];
}
declare const _default: React.MemoExoticComponent<({ field, form: { setFieldValue }, label, background, width, options, ...props }: FieldProps<any, any> & ISelectProps) => JSX.Element>;
export default _default;
