import {FieldProps} from "formik";
import React from "react";
import styled from "styled-components";

const Label = styled.label`
    font-size: 16px;
    display: block;
    line-height: 20px;
`;

const CustomInput = styled.input<{width: string, background: string}>`
  color: #1B1D28;
  border: none;
  background: ${({background}) => background};  
  font-size: 16px;
  padding: 7px 14px;
  border-radius: 22px;
  width: ${({width}) => width}     
`;

interface IInputProps {
    label: string,
    width: string,
    background: string
}

const Input = ({field, form, label, width, background='#FFFFFF', ...props}: FieldProps & IInputProps) => (
        <div>
            {label && <Label htmlFor={`${field.name}_${label}`}>{label}</Label>}
            <CustomInput
                id={`${field.name}_${label}_${width}`}
                background={background}
                width={width} {...field}
                {...props}
            />
        </div>
)


export default React.memo(Input);