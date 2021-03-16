/// <reference types="react" />
import { FieldProps } from 'formik';
declare const InputWithMask: ({ field, form: { touched, errors, setFieldValue }, mask, label, ...props }: FieldProps<any, any> & {
    mask: string;
    label: string;
}) => JSX.Element;
export default InputWithMask;
