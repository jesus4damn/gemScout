import React, {ChangeEvent} from 'react';
import {ErrorMessage, FieldProps} from 'formik';
import InputMask from "react-input-mask";
import styled from "styled-components";

interface IMaskProps {
    mask: string,
    onChange: (value: string) => void,
    id: string,
    value: string
}

const CustomInputMask = ({mask, value, onChange, ...props}: IMaskProps) => {
    return (
    <InputMask
        mask={mask}
        alwaysShowMask={true}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        {...props}
    />)
};

const Label = styled.span`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1B1D28;
`;

const InputWithMaskStyled = styled(CustomInputMask)<{width: string, background: string}>`
    color: #1B1D28;
    border: none;
    background: ${({background}) => background} ;  
    font-size: 16px;
    padding: 7px 14px;
    border-radius: 22px;
    margin-bottom:15px;
    width: ${({width}) => width} 
`;

const InputWithMaskUser = ({field, width, background="#FFF", form:{setFieldValue}, mask, label, ...props}: FieldProps & {mask: string, label: string, width: string, background: string}) => {
    const onChange = (value: string) => setFieldValue(field.name, value);

    return (
        <div>
            <Label>{label}</Label>
            <InputWithMaskStyled width={width} background={background} value={field.value} mask={mask} id={`login_${field.name}`} onChange={onChange}/>
        </div>
    )
}


export default InputWithMaskUser;
