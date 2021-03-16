/// <reference types="react" />
import { FieldProps } from "formik";
import { Component } from "../../constants/types/types";
interface ITextInputFileProps {
    label: string;
    myName: string;
    id?: string;
    loadedImageStyle: any;
    labelComponent?: Component;
    currentValue: any;
}
declare const FileInput: ({ field: { onChange, ...field }, form: { setFieldValue }, myName, id, currentValue, label, labelComponent: LabelComponent, loadedImageStyle, ...props }: FieldProps & ITextInputFileProps) => JSX.Element;
export default FileInput;
