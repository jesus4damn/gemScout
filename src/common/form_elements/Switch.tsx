import React from "react";
import styled, {keyframes} from "styled-components";

const Container = styled.div<{width:string}>`
    width:${({width}) => width};
    display:flex;
    justify-content:space-between;
    margin-top:29px;
    cursor:pointer;
`;

const Text = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #1B1D28;
`;

const toggle = keyframes`
  from {
    margin-left: 0px;
  }

  to {
    margin-left: 35px;
  }
`;

const toggleBack = keyframes`
  from {
    margin-left: 35px;
  }

  to {
    margin-left: 0px;
  }
`;

const ContainerSwitch = styled.div<{jusCon:boolean}>`
    width:63px;
    height:28px;
    background: ${({jusCon}) => jusCon ? "#D8E6D9" : "#B9BCCA"};
    border-radius: 18px;
    padding-left:2px;
    padding-right:2px;
    display:flex;
    align-items:center;
`;

const ButtonSwitch = styled.div`
    width: 24px;
    height: 24px;
    background: #F2F4F8;
    border-radius: 18px;
    animation: ${toggleBack} .2s linear;
    margin-left: 0px;
`;

const ButtonSwitch2 = styled.div`
    width: 24px;
    height: 24px;
    background: #F2F4F8;
    border-radius: 18px;
    animation: ${toggle} .2s linear;
    margin-left: 35px;
`;


interface Switch {
    width:string,
    text:string,
    value:boolean,
    onChange:() => void
}

const Switch = ({width, text, value, onChange}:Switch) => (
    <Container width={width} onClick={() => onChange()}>
        <Text>{text}</Text>
        <ContainerSwitch jusCon={value}>
            {value ?
            <ButtonSwitch2/> : 
            <ButtonSwitch/>}
        </ContainerSwitch>
    </Container>
)


export default Switch;