import {FieldProps} from "formik";
import React, {useState} from "react";
import styled from "styled-components";
import {SelectCaretIcon} from "../../assets/svgIcons/selectCaretIcon";
import {string} from "yup";

const Label = styled.label`
    font-size: 16px;
    display: block;
    line-height: 20px;
`;

const CustomSelect = styled.div<{width: string, isShow: boolean, background: string}>`
  color: #1B1D28;
  border: none;
  display: flex;
  background: ${({background}) => background};
  box-sizing: border-box;
  position: relative;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({isShow}) => isShow ? '22px 22px 0 0' : '22px'};
  font-size: 16px;
  padding: 7px 14px;
  width: ${({width}) => width};
`;

const OptionsWrapper = styled.div<{isShow: boolean, width:string}>`
    display: ${({isShow}) => isShow ? 'block' : 'none'};
    position: absolute;
    width: ${({width}) => width ? width : ''};
    z-index: 10;
    left: 0;
    bottom: 0;
    transform: translateY(101%);
    background: #FFFFFF;
    border-radius: 0 0 22px 22px;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.24);
`;

const Option = styled.div<{width: string}>`
   background: #FFFFFF;
   cursor: pointer;
   width: ${({width}) => width};
   padding: 15px 19px 13px;
   &:hover, &:active {
      background: #F2F4F8; 
   };
   &:last-of-type {
       border-radius: 0 0 22px 22px;
   }; 
`;

interface ISelectProps {
    label?: string,
    width: string,
    background?: string,
    options: string[]
}

const Select = ({field, form: {setFieldValue}, label, background='#FFFFFF', width, options, ...props}: FieldProps & ISelectProps) => {
    const [isShow, toggleOptions] = useState(false);

    return (
        <div>
            {label && <Label htmlFor={`${field.name}_${label}`}>{label}</Label>}
            <CustomSelect
                id={`${field.name}_${label}_${width}`}
                width={width}
                background={background}
                {...field}
                {...props}
                isShow={isShow}
                onClick={() => options.length > 0 && toggleOptions(!isShow)}
            >
                <span>{field.value || 'Choose'}</span><SelectCaretIcon/>

                <OptionsWrapper isShow={isShow} width={width}>
                    {
                        options.map(item => (
                                <Option
                                    onClick={() => setFieldValue(field.name, item)}
                                    width={width}
                                    key={item}
                                >
                                    {item}
                                </Option>
                            )
                        )
                    }
                </OptionsWrapper>
            </CustomSelect>
        </div>
    )
}


export default React.memo(Select, (prevProps, nextProps) => {
    return prevProps.field.value === nextProps.field.value;
});