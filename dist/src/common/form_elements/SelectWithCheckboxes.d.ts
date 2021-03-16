/// <reference types="react" />
import { FieldProps } from "formik";
interface ISelectProps {
    label?: string;
    width: string;
    background?: string;
    gems: {
        name: string;
        bool: boolean;
    }[];
    change: (name: string) => void;
    padding?: string;
}
declare const SelectWithCheckboxes: ({ field, padding, form: { setFieldValue }, label, background, width, gems, change, ...props }: FieldProps & ISelectProps) => JSX.Element;
export default SelectWithCheckboxes;
