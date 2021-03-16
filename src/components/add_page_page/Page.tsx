import React, {useEffect, useRef, useState} from "react";
import { Accordion } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import styled from "styled-components";
import CustomToggle from "../user_profile_page/CustomToggle";
import { AnimatedElement } from "../../common/styledComponents/animations";
import { ShapeIcon } from "../../assets/svgIcons/shapeIcon";
import Input from "../../common/form_elements/Input";
import { API } from "../../constants/api/api";
import { LoaderIcon } from "../../assets/svgIcons/loaderIcon";



const CardBodyWrapper = styled.div`
    width: 100%;
    background: #FFFFFF;
    padding: 0 20px 19px 26px;
    border-radius: 0 0 10px 10px;
`;

const RequestHeader = styled.h1`
    font-style: Semibold;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding: 0;
    margin:0;
    color: #1B1D28;
`;

const StoneName = styled(Input)`
    width: 200px;
    border: none;
    font-style: Semibold;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    background: inherit;
    padding: 0;
    margin:0;
    &:disapled{
        opacity:1;
    }
`;

const Content = styled.div`
    width: 100%;
    border-top: 1px solid #A6ACBE;
    padding-top:24px;
`;

const Text = styled.span`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
    margin-bottom:19px;

    overflow:hidden;
    display:block;
    width:100%;
    border:none;
    resize:none;
    &: focus{
        outline:none;
    }
`;

const Button = styled.div<{background:string}>`
    width:114px;
    height:38px;
    background:${({background}) => background};
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 21px;
    cursor:pointer;

    font-style: regular;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;

    &:first-of-type {
        margin-right: 18px; 
    };
`;




const Page = ({name, text, setDeletePage, id}:{name:string, text:string,setDeletePage:(id:number) => void, id:number}) => {
    const [accordion, toggleAccordion] = useState<any>({
        isOpen: false,
        shapeAnimation: ''
    });
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    return (<Accordion style={{marginBottom: '10px', width: "100%", maxWidth: "815px", marginRight:"25px"}} defaultActiveKey={accordion.isOpen ? "0" : ""}>
                <Formik
                    initialValues={{
                        header:name,
                        text:text
                    }}
                    onSubmit={async (values:{header:string, text: string}) => {
                        setLoading(true);
                        let response = await API.put(`/admin/faq/${id}/change/`,{name:values.header, text:values.text});
                        setEdit(false);
                        setLoading(false);
                    }}
                >
                    {
                        ({dirty, values, setFieldValue, submitForm}) => (
                            <Form encType="multipart/form-data">
                                    <CustomToggle accordion={accordion} toggleAccordion={toggleAccordion} eventKey="0">
                                            <div style={{paddingTop:"7px", paddingBottom:"7px"}}>
                                                <Field disabled={!edit} name="header" component={StoneName} />
                                            </div>
                                        <AnimatedElement animation={accordion.shapeAnimation}>
                                            <ShapeIcon/>
                                        </AnimatedElement>
                                    </CustomToggle>
                                    <Accordion.Collapse eventKey="0">
                                        <CardBodyWrapper>
                                            <Content>
                                                <Text 
                                                    id={'editable'}
                                                    contentEditable={edit}
                                                    onInput={(event : any) => {
                                                        setFieldValue('text', event.target.innerHTML);
                                                    }}
                                                    suppressContentEditableWarning={true}
                                                     >{text}</Text>
                                                {edit ?
                                                <div className={"w-100 d-flex justify-content-end"}>
                                                    {loading ? <LoaderIcon width={"50px"} height={"50px"} /> :
                                                    <Button background={"#1B1D28"} onClick={() => submitForm()}>Save</Button>}
                                                </div> :
                                                <div className={"d-flex"}>
                                                    <Button background={"#FE4F4F"} onClick={() => setDeletePage(id)}>Delete</Button>
                                                    <Button background={"#B9BCCA"} onClick={() => setEdit(true)}>Edit</Button>
                                                </div>}
                                            </Content>
                                        </CardBodyWrapper>
                                    </Accordion.Collapse>
                                </Form>
                            )
                    }
                </Formik>
            </Accordion>)
}

export default Page;