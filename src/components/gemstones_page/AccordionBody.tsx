import React from "react";
import {Field,FieldArray, FormikTouched} from "formik";
import {Table} from "react-bootstrap";
import {Td, Thead} from "../../common/styledComponents/table";
import Checkbox from "../../common/form_elements/Checkbox";
import {BaseDarkButton, BaseGreyButton, BaseRedButton} from "../../common/styledComponents/baseElements";
import styled from "styled-components";
import Select from "../../common/form_elements/Select";
import Input from "../../common/form_elements/Input";
import FileInput from "../../common/form_elements/FileInput";
import {IAccordionForm} from "./Gemstone";

const Tbody = styled.tbody`
    font-size: 16px;
    line-height: 20px;
`;

const Row = styled.div<{marginBottom: string}>`
    margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : '11px'};
`;

const AccordionBody = ({values, dirty, setFieldValue, deleteGemstome}: {values: IAccordionForm, dirty: boolean,  deleteGemstome:(id:number) => void, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void}) => {
    const addParametr = () => {
        setFieldValue('features',[...values.features, !values.features.includes('Color') ? "Color" : !values.features.includes('Origin') ? 'Origin' : !values.features.includes('Clarity') ? 'Clarity' : 'Treatment']);
        setFieldValue('meanings',[...values.meanings,['Name']]);
        setFieldValue('types',[...values.types,"text"]);
    }
    const removeParametr = () => {
        setFieldValue('features',[...values.features.splice(0,values.features.length-1)]);
        setFieldValue('meanings',[...values.meanings.splice(0,values.meanings.length-1)]);
        setFieldValue('types',[...values.types.splice(0,values.types.length-1)]);
    }
    return (
        <>
            <Table>
                <Thead>
                    <tr>
                        <th>Important</th>
                        <th>Icon</th>
                        <th>Feature</th>
                        <th>Type</th>
                        <th>Meaning</th>
                    </tr>
                </Thead>
                <Tbody>
                    {values.features.map((item:string,index:number) => 
                    <tr key={index}>
                        <Td minWidth="105px" style={{paddingTop: '18.5px'}}>
                            {index === 0 && <Field name="is_important" id={`is_important_${values.id}`} component={Checkbox} />}
                        </Td>
                        <Td minWidth="85px" style={{paddingTop: values.image ? '12.5px' : '17.5px'}}>
                            {index === 0 &&
                            <Field
                                id={`gemstone_image_${values.id}`}
                                name="_image"
                                myName="image"
                                currentValue={values.image}
                                loadedImageStyle={{width: '30px', height: '30px'}}
                                label="Upload"
                                component={FileInput}
                                values={values}
                            />}
                        </Td>
                        <Td minWidth="155px">
                            <Field
                                name={`features[${index}]`}
                                component={Select}
                                options={['Color','Origin','Clarity','Treatment'].filter((item) => !values.features.includes(item))}
                                background="#F2F4F8"
                                width="120px"
                                marginBottom="10px"
                            />
                        </Td>
                        <Td minWidth="155px">
                        <Field
                                name={`types[${index}]`}
                                component={Select}
                                options={['text', 'list']}
                                background="#F2F4F8"
                                width="120px"
                                marginBottom="10px"
                            />
                        </Td>
                        <Td minWidth="265px">
                            {values.types[index] === 'list' &&
                            <FieldArray
                                name={name}
                                render={array => (
                                    <div>
                                        {
                                            values.meanings[index].map((item: any, index2: number) => (
                                                <Row key={`meanings[${index}][${index2}]`} marginBottom={''}>
                                                    <Field
                                                        name={`meanings[${index}][${index2}]`}
                                                        component={Input}
                                                        background="#F2F4F8"
                                                        width="194px"
                                                    />
                                                </Row>
                                            ))
                                        }
                                        {values.meanings[index].length > 1 ?
                                        <div className={"d-flex justify-content-between"} style={{width:"194px"}}>
                                            <BaseGreyButton type="button" bRadius="22px" padding="7px 20px 7px 14px" onClick={() => {
                                                values.meanings[index].push("Name");
                                                setFieldValue('meanings',values.meanings);
                                                setFieldValue('change', values.change + "1");
                                            }}>+ Add</BaseGreyButton>
                                            <BaseGreyButton type="button" bRadius="22px" padding="7px 20px 7px 14px" onClick={() => {
                                                let newValues = {...values};
                                                newValues.meanings[index] = [...newValues.meanings[index].slice(0,-1)];
                                                setFieldValue('meanings',[...newValues.meanings]);
                                                setFieldValue('change', values.change + "1");
                                                // setFieldValue('meanings',[...values.meanings.slice(0,-1)]);
                                            }}>- Remove</BaseGreyButton>
                                        </div> : 
                                        <BaseGreyButton type="button" bRadius="22px" padding="7px 138px 7px 14px" onClick={() => {
                                            values.meanings[index].push("Name");
                                            setFieldValue('meanings',values.meanings);
                                            setFieldValue('change', values.change + "1");
                                        }}>+ Add</BaseGreyButton> }
                                    </div>
                                )}
                            />}
                        </Td>
                    </tr>)}
                    {values.features.length === 0 ?
                    <tr>
                        <Td minWidth="105px" style={{paddingTop: '18.5px'}}>
                            <Field name="is_important" id={`is_important_${values.id}`} component={Checkbox} />
                        </Td>
                        <Td minWidth="85px" style={{paddingTop: values.image ? '12.5px' : '17.5px'}}>
                            <Field
                                id={`gemstone_image_${values.id}`}
                                name="_image"
                                myName="image"
                                currentValue={values.image}
                                loadedImageStyle={{width: '30px', height: '30px'}}
                                label="Upload"
                                component={FileInput}
                            />
                        </Td>
                        <Td minWidth="155px">
                            <BaseGreyButton type="button" bRadius="22px" padding="7px 64px 7px 14px" onClick={() => {
                                addParametr();
                            }}>+ Add</BaseGreyButton>
                        </Td>
                        <Td minWidth="155px" />
                        <Td minWidth="265px" />
                    </tr> : 
                    <tr>
                        <Td minWidth="105px" style={{paddingTop: '18.5px'}} />
                        <Td minWidth="85px" style={{paddingTop: values.image ? '12.5px' : '17.5px'}} />
                        {values.features.length < 4 ?
                        <Td minWidth="155px">
                            <BaseGreyButton type="button" bRadius="22px" padding="7px 64px 7px 14px" onClick={() => {
                                addParametr();
                            }}>+ Add</BaseGreyButton>
                        </Td> : <Td minWidth="155px" />}
                        {values.features.length > 1 ?
                        <Td minWidth="155px" >
                            <BaseGreyButton type="button" bRadius="22px" padding="7px 38px 7px 14px" onClick={() => {
                                removeParametr();
                            }}>- Remove</BaseGreyButton>
                        </Td> : <Td minWidth="155px" />}
                        <Td minWidth="265px" />
                    </tr>}
                </Tbody>
            </Table>
            <div className="d-flex justify-content-between w-100">
                <div className="text-left">
                    <BaseRedButton type="button" bRadius="21px" padding="8px 39px" onClick={() => deleteGemstome(values.id)}>Delete</BaseRedButton>
                </div>
                {dirty &&
                <div className="text-right">
                    <BaseDarkButton disabled={!dirty} type="submit" bRadius="21px" padding="8px 39px">Save</BaseDarkButton>
                </div>}
            </div>
       </>
    )
}

export default AccordionBody;