import React from "react";
import styled from "styled-components";
import {Wrapper} from "../../common/styledComponents/wrappers";
import {Formik, Form, Field} from "formik";
import * as Yup from 'yup';
import {BaseDarkButton} from "../../common/styledComponents/baseElements";
import Input from "../../common/form_elements/Input";
import FileInput from "../../common/form_elements/FileInput";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {addShapeAction} from "../../store/actions/gemstonesActions";
import {createFormData} from "../../common/functions/createFormData";
import { CrossIcon } from "../../assets/svgIcons/crossIcon";

const Container = styled.div<{isShow: boolean}>`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    display: ${({isShow}) => isShow ? 'block' : 'none'};
`;

const Background = styled.div<{isShow: boolean}>`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#000000;
    opacity:0.5;
    display: ${({isShow}) => isShow ? 'block' : 'none'};
`;

const AddShapeWrapper = styled(Wrapper)<{isShow: boolean}>`
    position: fixed;
    right: calc(50% - 200px);
    top: 40%;
    z-index: 1001;
    width: 403px;
    opacity:1;
    display: ${({isShow}) => isShow ? 'block' : 'none'};
`;

const NameFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 28px 0 16px;
    align-items: center;
    font-size: 18px;
    background: #FFFFFF; 
`;

const CrossContainer = styled.div`
    position:absolute;
    right:16px;
    top:14px;
    cursor:pointer;
`;

const Label = styled.label<{isLoaded: boolean}>`
    display: inline-block;
    position: relative;
    cursor: pointer;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 20px;
    ${({isLoaded}) => isLoaded ? '' : 'line-height: 100px'};
    border: none;
    width: 100px;
    height: 100px;
    background: #1B1D28;
    border-radius: 75px;
`;

export interface IAddShapeForm {
    name: string,
    image: File | string,
    _image: string,
}

interface IAddShapeProps {
    isShow: boolean,
    closeAddShape: (isOpen: boolean) => void
}

const connector = connect(
    null,
    (dispatch: Dispatch) => ({
        addShape(shape: FormData) {
            dispatch(addShapeAction(shape))
        }
    })
)

const AddShape = ({isShow, closeAddShape, addShape}: IAddShapeProps & ConnectedProps<typeof connector>) => (
    <Container isShow={isShow}>
        <Background isShow={isShow} onClick={() => closeAddShape(false)}/>
        <AddShapeWrapper padding="24px 26px 26px 27px" isShow={isShow}>
            <CrossContainer onClick={() => closeAddShape(false)}>
                <CrossIcon />
            </CrossContainer>
            <Formik
                initialValues={{
                    name: '',
                    image: '',
                    _image: ''
                }}
                onSubmit={(values: IAddShapeForm, {resetForm}) => {
                    addShape(createFormData(values));
                    closeAddShape(false);
                    resetForm();
                }}
                validationSchema={
                    Yup.object().shape({
                        name: Yup.string()
                            .required('Required field!'),
                        image: Yup.mixed()
                            .required('Required field!')
                    })
                }
            >
                {({values}) => (
                    <Form encType="multipart/form-data">
                        <div className="text-left">
                            <Field
                                name="_image"
                                myName="image"
                                currentValue={values.image}
                                loadedImageStyle={{width: '100px', height: '100px', borderRadius: '75px'}}
                                label="Icon"
                                labelComponent={Label}
                                component={FileInput}
                            />
                        </div>
                        <NameFieldWrapper>
                            <span>Name</span>
                            <Field name="name" width="260px" background="#F2F4F8" component={Input}/>
                        </NameFieldWrapper>
                        <div className="text-right">
                            <BaseDarkButton type="submit" bRadius="21px" padding="8px 39px">Save</BaseDarkButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </AddShapeWrapper>
    </Container>
)

export default connector(AddShape);