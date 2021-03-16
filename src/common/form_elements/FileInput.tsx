import React, {ChangeEvent, useState, useEffect} from "react";
import {FieldProps} from "formik";
import styled from "styled-components";
import {Component} from "../../constants/types/types";
import {API} from "../../constants/api/api";

const Label = styled.label`
    font-size: 16px;
    display: block;
    line-height: 20px;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 0;
`;

const CustomFileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;


const LoadedImage = ({src, imageStyle}: {src: string, imageStyle: any}) => (
    <img alt="picture" src={src} style={imageStyle} />
);


interface ITextInputFileProps {
    label: string,
    myName: string,
    id?: string,
    loadedImageStyle: any,
    labelComponent?: Component,
    currentValue: any
}

const FileInput = ({
                       field: {onChange, ...field},
                       form: {setFieldValue},
                       myName,
                       id,
                       currentValue,
                       label,
                       labelComponent: LabelComponent,
                       loadedImageStyle,
                       ...props
}: FieldProps & ITextInputFileProps) => {

    const [src, setImageUrl] = useState(currentValue ? typeof currentValue === 'string' && !currentValue.startsWith('data:') ? API.baseUrl + currentValue : currentValue : '');

    useEffect(() => {
        if(typeof src === 'object'){
            let reader = new FileReader();
            reader.readAsDataURL(src);
            reader.onload = function (e) {
                setImageUrl(e.target!.result);
            }
        }
        return () => {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            URL.revokeObjectURL(src)
        }
    }, []);

    const labelContent = src && currentValue ? <LoadedImage src={src} imageStyle={loadedImageStyle} /> : label;

    return (
        <span>
            <CustomFileInput
                type="file"
                id={id ? id : `${myName}_${label}`}
                onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
                    // eslint-disable-next-line node/no-unsupported-features/node-builtins
                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                    setFieldValue(myName, e.target.files[0]);
                }}
                {...field}
                {...props}
            />
            {
                LabelComponent
                        ? <LabelComponent htmlFor={id ? id : `${myName}_${label}`} image={src && currentValue} isLoaded={!!currentValue}>{labelContent}</LabelComponent>
                        : <Label htmlFor={id ? id : `${myName}_${label}`}>{labelContent}</Label>
            }
        </span>
    )
}


export default FileInput;
