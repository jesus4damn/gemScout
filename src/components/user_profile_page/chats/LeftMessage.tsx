import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { IOffer, IUser } from "../../../constants/types/interfaces/commonInterfaces";
import logoPng from "../../../assets/images/logo.png";
import { API } from "../../../constants/api/api";


const Container = styled.div`
    position:relative;
    width:100%;
    max-height:200px;
    padding-left:18px;
    display:flex;
    justify-content: flex-start;
    align-items:flex-start;
    margin-top:10px;
`;

const Avatar = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`
}))`
    width: 40px;
    height: 40px;
    border-radius: 75px;
`;

const Message = styled.div`
    background: #1B1D28;
    border-radius: 22px;
    padding:8px 10px;
    margin-left:15px;

    font-style: regular;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;

    max-width:250px;

    cursor:pointer;
`;

const Time = styled.p`
    font-style: regular;
    font-weight: 400;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #A9AAC2;
    margin-left:15px;
    margin-top:9px;
`;

const DeleteMessage = styled.div`
    width:160px;
    height:38px;
    background: #FFFFFF;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    border-radius: 13px;
    position:absolute;
    bottom:-5px;
    left:73px;
    display:flex;
    justify-content:center;
    align-items:center;

    font-style: regular;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.408px;

    color: #1B1D28;
    cursor:pointer;
`;

const DeleteMessageTransparent = styled.div`
    width:160px;
    height:38px;
    background: transparent;
`;

const File = styled.div`
    margin-top:10px;
    border-left:1px solid #FFFFFF;
    padding-left:7.5px;
`;

const Suggestion = styled.div`
    margin-top:10px;
    border-left:2px dashed #FFFFFF;
    padding-left:7.5px;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color:#FFF;
`;

const Link = styled.a`
    display:inline;
    color:#FFF;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
`;


const Delete = ({del, setDel,setDeleteMessage}:{del:boolean, setDel:() => void,setDeleteMessage:() => void}) => {
    const wrapperRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (wrapperRef.current && !wrapperRef.current!.contains(target)) {
                setDel();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return del ? <DeleteMessage ref={wrapperRef} onClick={() => {setDel();setDeleteMessage();}}>Delete message</DeleteMessage> : <DeleteMessageTransparent></DeleteMessageTransparent>
}


const LeftMessage: React.FC<any> = ({avatar,text,date,setDeleteMessage, id, file, suggestion}:{avatar: string,text:string,date:string,setDeleteMessage:(id:number) => void, id:number, file:string, suggestion?: IOffer}) => {
    const [del, setDel] = useState(false);
    let hours = new Date(date).getHours().toString().length === 1 ? "0" + new Date(date).getHours() : new Date(date).getHours();
    let minutes = new Date(date).getMinutes().toString().length === 1 ? "0" + new Date(date).getMinutes() : new Date(date).getMinutes();

    return (
        <div style={{maxHeight:"1000px"}}>
            <Container>
                <Avatar src={API.baseUrl + avatar} />
                <div className={"flex-grow-1 d-flex flex-column align-items-start"}>
                    <Message onClick={() => setDel(true)}>
                        {text}
                        {file && <File><Link onClick={(e) => e.stopPropagation()} href={API.baseUrl + file}>{file.split('/').pop()}</Link></File>}
                        {suggestion && suggestion.gemstone && <Suggestion>{suggestion.gemstone.name ? suggestion.gemstone.name : ""}{suggestion.color ? ", " + suggestion.color + "," : ""} {suggestion.weigth ? suggestion.weigth + " ct" : ""} {suggestion.price_in_carats ? suggestion.price_in_carats + " $/ct" : ""}</Suggestion>}
                    </Message>
                    <Time>{hours + ":" + minutes}</Time>
                </div>
                <Delete del={del} setDel={() => setDel(false)} setDeleteMessage={() => setDeleteMessage(id)}/>
            </Container>
        </div>
    )
}

export default LeftMessage;