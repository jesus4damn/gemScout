import { FormikValues } from "formik";
import React, { MemoExoticComponent } from "react";
import { Component } from "../../constants/types/types";
interface IFieldsArrayProps {
    name: string;
    asComponent: Component | MemoExoticComponent<any>;
    marginBottom?: string;
    defaultValue?: string;
    button: (func: (...rest: any) => void) => Component | React.ReactElement;
}
declare const _default: React.MemoExoticComponent<({ values, name, asComponent, marginBottom, defaultValue, button: BtnComponent, ...props }: FormikValues & IFieldsArrayProps) => JSX.Element>;
export default _default;
