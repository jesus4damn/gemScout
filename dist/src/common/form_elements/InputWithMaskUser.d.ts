/// <reference types="react" />
import { FieldProps } from 'formik';
declare const InputWithMaskUser: ({ field, width, background, form: { setFieldValue }, mask, label, ...props }: FieldProps<any, any> & {
    mask: string;
    label: string;
    width: string;
    background: string;
}) => JSX.Element;
export default InputWithMaskUser;
