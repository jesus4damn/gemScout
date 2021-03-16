import React from "react";
import {Wrapper} from "../../common/styledComponents/wrappers";
import {Formik, Form, Field} from "formik";
import {BaseDarkButton} from "../../common/styledComponents/baseElements";
import styled from "styled-components";
import Select from "../../common/form_elements/Select";
import Checkbox from "../../common/form_elements/Checkbox";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {updateUserSettingsAction} from "../../store/actions/usersActions";
import {UserRole} from "../../constants/types/types";

const Row = styled.div<{marginBottom?: string}>`
    margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : '29px'};
    font-size: 16px;
`;

const connector = connect(
    null,
    (dispatch: Dispatch) => ({
       updateUserSettings(data: ISettingsForm) {
            dispatch(updateUserSettingsAction(data))
        }
    })
);
export interface ISettingsForm {
    id: number,
    status: string,
    restrictions: number[]
}

export interface ISettingsFormik {
    id: number,
    status: string,
    pm_block: boolean,
    applications_block: boolean,
    suggestions_block: boolean,
    messages_max_1: boolean,
    messages_max_3: boolean,
    user_block: boolean
}

const Settings: React.FC<any> = ({updateUserSettings, restrictions, id, status}: {id:number,status:string, restrictions:number[]} & ConnectedProps<typeof connector>) => {

    return (
        <Wrapper background="#F2F4F8" padding="32px 26px 27px 27px">
            <Formik
                initialValues={{
                    id: id,
                    status: UserRole[status] || 'Choose',
                    pm_block: restrictions.includes(1),
                    applications_block: restrictions.includes(2),
                    suggestions_block: restrictions.includes(3),
                    messages_max_3: restrictions.includes(4),
                    messages_max_1: restrictions.includes(5),
                    user_block: restrictions.includes(6)
                }}
                onSubmit={(values: ISettingsFormik) => {
                    let restrictions = [];
                    if(values.pm_block) restrictions.push(1);
                    if(values.applications_block) restrictions.push(2);
                    if(values.suggestions_block) restrictions.push(3);
                    if(values.messages_max_3) restrictions.push(4);
                    if(values.messages_max_1) restrictions.push(5);
                    if(values.user_block) restrictions.push(6);
                    let data = {id:values.id, status: values.status, restrictions};
                    return updateUserSettings(data)
                }}
            >
                {({dirty}) => (
                    <Form>
                        <Row marginBottom="21px">
                            <Field
                                name="status"
                                label="Make confirmed"
                                width="350px"
                                options={['Verified user', 'Rejected user', 'Admin', 'Moderator', 'User']}
                                component={Select}
                            />
                        </Row>
                        <Row marginBottom="20px">
                            <span>Restrictions</span>
                        </Row>
                        <Row>
                            <Field name="pm_block" component={Checkbox} label="Restrict writing in DM"/>
                        </Row>
                        <Row>
                            <Field name="applications_block" component={Checkbox} label="Prohibition to respond to requests"/>
                        </Row>
                        <Row>
                            <Field name="suggestions_block" component={Checkbox} label="Prohibition to create orders"/>
                        </Row>
                        <Row>
                            <Field name="messages_max_3" component={Checkbox} label="Prohibition to write more than 3 new messages per day"/>
                        </Row>
                        <Row>
                            <Field name="messages_max_1" component={Checkbox} label="Prohibition to write more than 1 message per day"/>
                        </Row>
                        <Row>
                            <Field name="user_block" component={Checkbox} label="Block user"/>
                        </Row>
                        <div className="text-right">
                            <BaseDarkButton disabled={!dirty} type="submit" bRadius="21px" padding="8px 39px">Save</BaseDarkButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default connector(Settings);