import {FieldProps} from "formik";
import React from "react";
import styled from "styled-components";

const HiddenCheckbox = styled.input.attrs({
    type: 'checkbox'
})`
    display: none;  
`;

const Icon = styled.svg<{withLabel: boolean}>`
  transform: translateY(${({withLabel}) => withLabel ? '-7' : '-5'}px);
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const CustomCheckbox = styled.label<{checked: boolean}>`
    display: inline-block;
    position: relative;
    transition: all 150ms;
    box-sizing: border-box;
    cursor: pointer;
    flex: none;
    margin-bottom: 0;
    padding: 4px 2px;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: ${({checked}) => checked ? 'none' : '2px solid #DADADA'};
    background-color: ${({checked}) => checked ? '#3D404E' : '#FFFFFF'};
`;

const Label = styled.span`
    font-size: 14px;
    margin-left: 22px;
`;

const Checkbox = ({field, form, label, id, ...props}: FieldProps & {label?: string, id?: string}) => (
    <div className="position-relative d-flex align-items-center">
        <CustomCheckbox checked={field.value} htmlFor={id ? id : `${field.name}_${label}`}>
            {
                field.value
                    ? (<Icon withLabel={!!label} viewBox="0 0 14 10"><polyline points="1 4.5, 5 8.5, 13 0.5" /></Icon>)
                    : ''
            }
        </CustomCheckbox>
        <HiddenCheckbox id={id ? id : `${field.name}_${label}`} checked={field.value} {...field} {...props} />
        {label && <Label>{label}</Label>}
    </div>
)


export default React.memo(Checkbox, (prevProps, nextProps) => {
    return prevProps.field.value === nextProps.field.value
});