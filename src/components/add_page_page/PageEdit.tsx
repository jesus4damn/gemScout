import { Field, Form, Formik } from "formik";
import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import styled from "styled-components";
import {ShapeIcon} from "../../assets/svgIcons/shapeIcon";
import Input from "../../common/form_elements/Input";
import {AnimatedElement} from "../../common/styledComponents/animations";
import CustomToggle from "../user_profile_page/CustomToggle";

const CardBodyWrapper = styled.div`
    width: 100%;
    background: #FFFFFF;
    padding: 0 20px 19px 26px;
    border-radius: 0 0 10px 10px;
`;


const StoneName = styled(Input)`
    width: 200px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    background: inherit;
    padding: 0;
    margin:0;
`;

const Content = styled.div`
    width: 100%;
    border-top: 1px solid #A6ACBE;
    padding-top:24px;
`;

const Text = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
    margin-bottom:19px;
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







const PageEdit = ({setEditFalse, accordion, toggleAccordion}: {setEditFalse:() => void, accordion: any, toggleAccordion:(state: any) => void}) => {
    return (
            <Formik
               initialValues={{
                   header:"Ask and answers",
                   text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
               }}
               onSubmit={(values:{}) => {
                   
               }}
           >
               {
                   ({dirty, values, setFieldValue}) => (
                       <Form encType="multipart/form-data">
                            <CustomToggle accordion={accordion} toggleAccordion={toggleAccordion} eventKey="0">
                                <div style={{paddingTop:"7px", paddingBottom:"7px"}}>
                                    <Field name="header" component={StoneName} />
                                </div>
                                <AnimatedElement animation={accordion.shapeAnimation}>
                                    <ShapeIcon/>
                                </AnimatedElement>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="0">
                                <CardBodyWrapper>
                                    <Content>
                                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                                        <div className={"d-flex"}>
                                            <Button background={"#FE4F4F"}>Delete</Button>
                                            <Button background={"#B9BCCA"} onClick={() => setEditFalse()}>Edit</Button>
                                        </div>
                                    </Content>
                                </CardBodyWrapper>
                            </Accordion.Collapse>
                        </Form>
                    )
               }
           </Formik>
    )
}

export default PageEdit;