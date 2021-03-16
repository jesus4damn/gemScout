import React, {ChangeEvent} from 'react';
import {ErrorMessage, FieldProps} from 'formik';
import InputMask from "react-input-mask";
import styled from "styled-components";

interface IMaskProps {
    mask: string,
    onChange: (value: string) => void,
    id: string
}

const CustomInputMask = ({mask, onChange, ...props}: IMaskProps) => (
    <InputMask
        mask={mask}
        alwaysShowMask={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        {...props}
    />
);

const Label = styled.label`
    font-weight: bold;
    font-size: 19px;
    display: block;
`;

const InputWithMaskStyled = styled(CustomInputMask)`
  color: #1B1D28;
  width: 378px;
  border: none;
  border-radius: 22px;
  font-size: 20px;
  padding: 14px 14px 16px;  
`;

const InputWithMask = ({field, form:{ touched, errors, setFieldValue}, mask, label, ...props}: FieldProps & {mask: string, label: string}) => {
    //const error = errors[field.name] && touched[field.name] ? errors[field.name] : '';
    const onChange = (value: string) => setFieldValue(field.name, value);

    return (
        <div>
            <Label htmlFor={`login_${field.name}`}>{label}</Label>
            <InputWithMaskStyled mask={mask} id={`login_${field.name}`} onChange={onChange}/>
            {/*{<ErrorMessage name={field.name} component="small" className="invalid-feedback mb-3"/>}*/}
        </div>
    )
}


export default InputWithMask;
