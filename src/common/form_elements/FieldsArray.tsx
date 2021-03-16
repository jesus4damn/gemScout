import {FormikValues, FieldArray, Field} from "formik";
import React, {MemoExoticComponent} from "react";
import styled from "styled-components";
import {Component} from "../../constants/types/types";


interface IFieldsArrayProps {
    name: string,
    asComponent: Component | MemoExoticComponent<any>,
    marginBottom?: string,
    defaultValue?: string,
    button: (func: (...rest: any) => void) => Component | React.ReactElement
}

const Row = styled.div<{marginBottom: string}>`
    margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : '11px'};
`;

const FieldsArray = ({
                         values,
                         name,
                         asComponent,
                         marginBottom = '',
                         defaultValue = '',
                         button: BtnComponent, ...props
}: FormikValues & IFieldsArrayProps) => {
    return (
        <FieldArray
            name={name}
            render={array => (
                <div>
                    {
                        values[name].map((item: any, index: number) => (
                            <Row key={`${item}.${index}`} marginBottom={marginBottom}>
                                <Field
                                    name={`${name}.${index}`}
                                    component={asComponent}
                                    {...props}
                                />
                            </Row>
                        ))
                    }
                    {BtnComponent(() => array.push(defaultValue))}
                </div>
            )}
        />
    )
}


export default React.memo(FieldsArray, (prevProps, nextProps) => {
    return prevProps.values[prevProps.name] === nextProps.values[nextProps.name];
});