import React from "react";
import {Dispatch} from "redux";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import InputWithMask from "../../common/form_elements/InputWithMask";
import {connect, ConnectedProps} from "react-redux";
import {loginAction} from "../../store/actions/loginActions";
import {AuthSubmitButton} from "../../common/styledComponents/baseElements";


const connector = connect(
    null,
    (dispatch: Dispatch) => ({
        login(data: IPhoneForm) {
            dispatch(loginAction(data))
        }
    })
)

interface IPhoneForm {
    mobile: string
}

const EnterPhoneForm: React.FC<any> = ({login}: ConnectedProps<typeof connector>) => (
    <Formik
        initialValues={{mobile: ''}}
        onSubmit={(values: IPhoneForm) => {
            login({mobile: values.mobile.replace(/[ \-()]/g, '')})
        }}
        validationSchema={
            Yup.object().shape({
                mobile: Yup.string()
                    .required('Required field!')
                    .test('validPhone', 'Incorrect phone',
                        value => {
                            const regexp = /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
                            return regexp.test(value as string);
                        })
            })
        }
    >
        <Form className="d-flex flex-column align-items-center justify-content-center">
             <Field name="mobile" mask="+7 (999) 999-99-99" label="Phone" component={InputWithMask}/>
             <AuthSubmitButton type="submit">Log in</AuthSubmitButton>
        </Form>
    </Formik>
)

export default connector(EnterPhoneForm);