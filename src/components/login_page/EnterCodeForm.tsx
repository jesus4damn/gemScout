import React from "react";
import InputWithMask from "../../common/form_elements/InputWithMask";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {connect, ConnectedProps} from "react-redux";
import {verifyAction} from "../../store/actions/loginActions";
import {AuthSubmitButton} from "../../common/styledComponents/baseElements";
import {Dispatch} from "redux";

const connector = connect(
    null,
    (dispatch: Dispatch) => ({
        verify(data: any) {
            dispatch(verifyAction(data))
        }
    })
)

interface ICodeForm {
    code: string
}


const EnterCodeForm: React.FC<any> = ({verify, mobile}: ConnectedProps<typeof connector> & {mobile: string}) => (
    <Formik
        initialValues={{code: ''}}
        onSubmit={(values: ICodeForm) => {
            verify({
                code: values.code.replace(/ /g, ''),
                mobile: mobile
            });
        }}
        validationSchema={
            Yup.object().shape({
                code: Yup.string()
                    .required('Required field!')
                    .test('validCode', 'Incorrect code',
                    value => {
                        const regexp = /^(\d\s){5}\d/;
                        return regexp.test(value as string);
                    }
                )
            })
        }
    >
        <Form className="d-flex flex-column align-items-center justify-content-center">
            <Field name="code" mask="9 9 9 9 9 9" label="Enter the code" component={InputWithMask}/>
            <AuthSubmitButton type="submit">Log in</AuthSubmitButton>
        </Form>
    </Formik>
)

export default connector(EnterCodeForm);