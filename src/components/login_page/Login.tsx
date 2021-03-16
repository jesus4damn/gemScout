import React from "react";
import styled from "styled-components";
import loginBackground from "../../assets/images/loginBackground.png";
import {FullScreenWrapper} from "../../common/styledComponents/wrappers";
import {Title} from "../../common/styledComponents/baseElements";
import EnterCodeForm from "./EnterCodeForm";
import EnterPhoneForm from "./EnterPhoneForm";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";


const LoginContainer = styled(FullScreenWrapper)`
    color: white;
    background: url(${loginBackground}), #1B1D28;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom 0% left 0%;
    justify-content: center;
    padding-top: 207px;
`;

const Subtitle = styled(Title)`
    margin-bottom: 18px;
`;

const connector = connect(
    (state: RootState) => ({
        authStep: state.userProfile.authStep
    })
)

const Login: React.FC<any> = ({authStep}: ConnectedProps<typeof connector>) => {
    return (
        <LoginContainer>
            <div className="d-flex flex-column align-items-center">
                <Title size="72px">GemScout</Title>
                <Subtitle size="40px">Log in</Subtitle>
                {
                    authStep.step === 1 && !authStep.mobile
                    ? <EnterPhoneForm />
                    : <EnterCodeForm mobile={authStep.mobile} />
                }
            </div>
        </LoginContainer>
    )
}

export default connector(Login);