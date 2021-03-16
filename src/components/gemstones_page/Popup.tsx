import React from "react";
import styled from "styled-components";
import {Wrapper} from "../../common/styledComponents/wrappers";

const Container = styled.div<{isShow: number | string | null}>`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    display: ${({isShow}) => isShow !== null ? 'block' : 'none'};
`;

const Background = styled.div<{isShow: number | string | null}>`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#000000;
    opacity:0.5;
    display: ${({isShow}) => isShow !== null ? 'block' : 'none'};
`;

const PopupWrapper = styled(Wrapper)<{isShow: number | string | null}>`
    position: fixed;
    right: calc(50% - 235px);
    top: 40%;
    z-index: 1001;
    width: 471px;
    opacity:1;
    display: ${({isShow}) => isShow !== null ? 'block' : 'none'};
    border-radius: 14px;
    background: #F2F4F8;
    backdrop-filter: blur(54.3656px);
`;

const TextContainer = styled.div`
    padding-bottom:42px;    
    width:100%;
    text-align:center;
    display:flex;
    justify-content:center;
    align-content:center;
    border-bottom:1px solid #B9BCCA;
    padding-left:16px;
    padding-right:16px;
`;

const Text = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 22px;
    color: #000000;
`;

const ButtonsContainer = styled.div`
    width:100%;
    height:44px;
    display:flex;
`;

const Button = styled.div<{borderRight?: string}>`
    width:50%; 
    height:44px;
    display:flex;
    align-content:center;
    justify-content:center;
    border-right:${({borderRight}) => borderRight ? borderRight : ''};
    cursor:pointer;
`;

const TextButton = styled.p<{color:string}>`
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 44px;
    color: ${({color}) => color};
`;









const Popup = ({isShow, text, closePopup, action}: {isShow:number | string | null, text:string, closePopup:() => void, action:() => void}) => {
    return (
        <Container isShow={isShow}>
            <Background isShow={isShow} onClick={() => closePopup()}/>
            <PopupWrapper padding="43px 0px 0px 0px" isShow={isShow}>
                <TextContainer>
                    <Text>{text}</Text>
                </TextContainer>
                <ButtonsContainer>
                    <Button borderRight={"1px solid #B9BCCA"} onClick={() => closePopup()}>
                        <TextButton color={"#1B1D28"}>Cancel</TextButton>
                    </Button>
                    <Button onClick={() => {
                        action();
                        closePopup();
                    }}>
                        <TextButton color={"#D53F3F"}>Delete</TextButton>
                    </Button>
                </ButtonsContainer>
            </PopupWrapper>
        </Container>
    )
}

export default Popup;