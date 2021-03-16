import {FieldProps} from "formik";
import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import {SelectCaretIcon} from "../../assets/svgIcons/selectCaretIcon";
import {string} from "yup";
import { SelectCaretIconOpen } from "../../assets/svgIcons/SelectCaretIconOpen";

const Label = styled.span`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1B1D28;
`;

const CustomSelect = styled.div<{width: string, isShow: boolean, background: string, padding?: string}>`
  color: #1B1D28;
  border: none;
  border-bottom: ${({isShow}) => isShow ? '1px solid #F2F4F8' : 'none'};
  display: flex;
  background: ${({background}) => background};
  box-sizing: border-box;
  position: relative;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({isShow}) => isShow ? '22px 22px 0 0' : '22px'};
  font-size: 16px;
  padding: ${({padding}) => padding ? padding : '7px 12px'};
  box-shadow: ${({isShow}) => isShow ? '0px 8px 8px rgba(0, 0, 0, 0.24)' : ''};
  width: ${({width}) => width};
  cursor:pointer;
`;

const OptionsWrapper = styled.div<{isShow: boolean, width: string, background: string}>`
    display: ${({isShow}) => isShow ? 'block' : 'none'};
    position: absolute;
    z-index: 10;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    background: ${({background}) => background ? background : '#F2F4F8'};
    border-radius: 0 0 22px 22px;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.24);
    width: ${({width}) => width};
`;

const Option = styled.div<{width: string, background: string}>`
    display:flex;
    justify-content:space-between;
    background: ${({background}) => background ? background : '#F2F4F8'};
   cursor: pointer;
   width: ${({width}) => width};
   padding: 0px 13px 0px 19px;
   height:48px;
   align-items:center;
   margin-bottom:0px;
   &:last-of-type {
       border-radius: 0 0 22px 22px;
   }; 
`;

const OptionText = styled.label`
   margin-bottom:0px;
   font-size: 16px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.87);
    cursor:pointer;
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
    padding: 2px 2px;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: ${({checked}) => checked ? 'none' : '2px solid #DADADA'};
    background-color: ${({checked}) => checked ? '#3D404E' : '#FFFFFF'};
`;

interface ISelectProps {
    label?: string,
    width: string,
    background?: string,
    gems: {name:string, bool:boolean}[],
    change: (name:string) => void,
    padding?:string
}

const SelectWithCheckboxes = ({field, padding, form: {setFieldValue}, label, background='#FFFFFF', width, gems, change, ...props}: FieldProps & ISelectProps) => {
    const [isShow, toggleOptions] = useState(false);
    const wrapperRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (wrapperRef.current && !wrapperRef.current!.contains(target)) {
                toggleOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // const change = (name:string) => {
    //     const index = gems.findIndex((item) => name === item.name);
    //     if(index !== -1){
    //         gems[index] = {...gems[index], bool: !gems[index].bool};
    //         setFieldValue('gemstones', [...gems,{name:'',bool:false}]);
    //     }
    // }

    return (
        <div>
            {label && <Label>{label}</Label>}
            <CustomSelect
                ref={wrapperRef}
                id={`${field.name}_${label}_${width}`}
                width={width}
                background={background}
                {...field}
                {...props}
                isShow={isShow}
                padding={padding}
                onClick={() => !isShow && toggleOptions(true)}
            >
                <div style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}} onClick={() => isShow && toggleOptions(false)}>
                    <span style={{lineHeight:"24px"}}>{'Choose'}</span>{isShow ? <SelectCaretIconOpen /> : <SelectCaretIcon />}
                </div>
                <OptionsWrapper background={background} isShow={isShow} width={width}>
                    {
                        gems.map((item, index) => (
                                <Option
                                    onClick={(e) => {change(item.name); console.log(111);}}
                                    width={width}
                                    key={index}
                                    background={background}
                                >
                                        <OptionText onClick={() => change(item.name)} htmlFor={`${item.name}_${label}_${width}`}>{item.name}</OptionText>
                                        <CustomCheckbox onClick={() => change(item.name)} checked={item.bool} htmlFor={`${item.name}_${label}_${width}`}>
                                            {
                                                item.bool
                                                    ? (<Icon withLabel={!!label} viewBox="0 0 14 10"><polyline points="1 4.5, 5 8.5, 13 0.5" /></Icon>)
                                                    : ''
                                            }
                                        </CustomCheckbox>
                                        <input onClick={(e) => {}} type="checkbox" style={{position:"absolute", opacity:0, zIndex:-1}} id={`${item.name}_${label}_${width}`} name={item.name} value='yes' />
                                </Option>
                            )
                        )
                    }
                </OptionsWrapper>
            </CustomSelect>
        </div>
    )
}


export default SelectWithCheckboxes;