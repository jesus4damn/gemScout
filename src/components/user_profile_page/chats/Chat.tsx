import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { IChats, IUser } from "../../../constants/types/interfaces/commonInterfaces";
import logoPng from "../../../assets/images/logo.png";
import { API } from "../../../constants/api/api";
import { NotReadIcon } from "../../../assets/svgIcons/notReadIcon";
import { ReadIcon } from "../../../assets/svgIcons/readIcon";
import { Months } from "../../../constants/types/types";


const Container = styled.div<{active:boolean}>`
    width:100%;
    height:64px;
    padding:10px 15px;
    cursor:pointer;
    display:flex;
    background:${({active}) => active ? "#F2F4F8" : "#FFF"};
    &:hover {
        background:#F2F4F8;
    }
`;

const Avatar = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`
}))`
    width: 44px;
    height: 44px;
    border-radius: 75px;
`;

const Name = styled.p`
    font-style: bold;
    font-weight: bold;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0.2px;
    color: #1B1D28;
    margin-bottom:5px;
`;

const Text = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 13px;
    line-height: 100%;
    letter-spacing: 0.1px;
    color: #1B1D28;
    margin:0;
`;

const Data = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    letter-spacing: 0.1px;
    color: #C5C7CD;
    margin:0;
    margin-left:8px;
`;

const SmallAvatar = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`
}))`
    width: 20px;
    height: 20px;
    margin-right:10px;
    border-radius: 75px;
`;

const CountMessages = styled.div`
    width:20px;
    height:20px;
    border-radius:100px;
    background: #B9BCCA;
    display:flex;
    justify-content:center;
    align-items:center;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height:20px;
    color: #FFFFFF;
    margin:0;
    padding:0;
`;




const Chat: React.FC<any> = ({name,text,data, avatar, active, setCurrentChat, currentChat, smallImage, countMessages, read}:{name: string,avatar:string, countMessages:number, text:string,data:string, active: boolean, setCurrentChat:(chats:IChats) => void, currentChat: IChats, smallImage:string, read?: boolean}) => {
    let hours = new Date(data).getHours().toString().length === 1 ? "0" + new Date(data).getHours() : new Date(data).getHours();
    let minutes = new Date(data).getMinutes().toString().length === 1 ? "0" + new Date(data).getMinutes() : new Date(data).getMinutes();
    let date = data ? (data && new Date(data).getDate() === new Date().getDate() && new Date(data).getMonth() === new Date().getMonth() && new Date(data).getFullYear() === new Date().getFullYear()) ? hours + ":" + minutes : new Date(data).getDay() + " " + Months[new Date(data).getMonth()].slice(0,3) : null;
    return (
        <Container active={active} onClick={() => setCurrentChat(currentChat)}>
            <Avatar src={API.baseUrl + avatar} />
            <div style={{position:"relative",paddingLeft:"10px"}} className={"d-flex flex-grow-1 flex-column justify-content-center"}>
                <Name>{name}</Name>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <div className={"d-flex align-items-center"}>
                        {smallImage && <SmallAvatar src={API.baseUrl + smallImage} />}
                        <Text>{text ? text : "..."}</Text>
                    </div>
                    {(countMessages > 0) && <CountMessages>{countMessages}</CountMessages>}
                </div>
                <div style={{position:"absolute", top:0, right:0, display:"flex", alignItems:"center"}}>
                    {read === true && <ReadIcon />}
                    {read === false && <NotReadIcon />}
                    <Data>{date}</Data>
                </div>
            </div>
        </Container>
    )
}

export default Chat;