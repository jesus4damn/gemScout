import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { LoaderIcon } from "../../../assets/svgIcons/loaderIcon";
import { API } from "../../../constants/api/api";
import { IChats, IMessage, IUser } from "../../../constants/types/interfaces/commonInterfaces";
import { Months } from "../../../constants/types/types";
import Chat from "./Chat";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";


const Container = styled.div`
    display:flex;
    justify-content:start;
    flex-direction:column;
    flex-grow:1;
    flex-shrink:1;
`;

const ChatConatiner = styled.div`
    width:815px;
    height:550px;
    background: #FFFFFF;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 10px;

    display:grid;
    grid-template-columns:2fr 5fr;
    grid-template-rows: 1fr 10fr;
    grid-gap:0;
`;

const ChatsContainer = styled.div`
    overflow:scroll;
`;

const HeaderContainer = styled.div`
    border-left:1px solid #F1F0F0;
    border-bottom:1px solid #F1F0F0;
    padding-left:20px;
    padding-right:20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;

const MessagesContainer = styled.div`
    width:100%;
    border-left:1px solid #F1F0F0;
    padding-bottom:33px;
    overflow:scroll;
    display:flex;
    flex-direction:column-reverse;
`;

const HeaderText = styled.p`
    font-style: bold;
    font-weight: bold;
    font-size: 18px;
    color: #1B1D28;
    margin:0;
`;

const DeleteChat = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #CC261B;
    cursor:pointer;
    margin:0;
`; 

const Text = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 13px;
    line-height: 100%;
    letter-spacing: 0.1px;
    color: #1B1D28;
    margin:0;
    text-align:center;
    margin-top:10px;
`;




const Chats: React.FC<any> = ({user, setDeleteChat, setDeleteMessage, setDeleteChatAction, setDeleteMessageAction}:{setDeleteChatAction:(action:() => void) => void,setDeleteMessageAction:(action:() => void) => void,user:IUser, setDeleteChat:(uri:string) => void, setDeleteMessage:(id:number) => void}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
    const [loadingChats, setLoadingChats] = useState<boolean>(false);
    const [chats, setChats] = useState<IChats[]>([]);
    const [currentChat, setCurrentChat] = useState<IChats | null>(null);
    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);
    const [currentPage, setCurrentPage] = useState<number | null>(2);
    const [currentPageChats, setCurrentPageChats] = useState<number | null>(2);
    const [stopUseEffect, setStopUseEffect] = useState<boolean>(false);
    const [stopUseEffect2, setStopUseEffect2] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLTableElement>(null);
    const wrapperRefChats = useRef<HTMLTableElement>(null);

    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                const response = await API.get(`/admin/user/${user.mobile}/chats/`);
                console.log("Chats",response.data);
                setCurrentChat(response.data[0]);
                setChats(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        loadData();
    },[]);

    useEffect(() => {
        async function loadData() {
            try{
                setLoadingMessages(true);
                setCurrentMessages([]);
                const response = await API.get(`/admin/chats/${currentChat?.uri}/messages/`);
                console.log("Messages",response.data);
                wrapperRef.current!.scrollTop = wrapperRef.current!.scrollHeight;
                setCurrentPage(2);
                setCurrentMessages(response.data);
                setLoadingMessages(false);
            } catch (err) {
                setLoadingMessages(false);
                console.log(err);
            }
        }
        currentChat && !stopUseEffect2 && loadData();
        if(stopUseEffect2){
            setStopUseEffect2(false);
        }
    },[currentChat]);

    const addMessages = async () => {
        setLoadingMessages(true);
        const response = await API.get(`/admin/chats/${currentChat?.uri}/messages/?page=${currentPage}`);
        if(response.data.length === 0) {
            setCurrentPage(null);
        } else {
            setCurrentPage(currentPage! + 1);
        }
        setCurrentMessages([...currentMessages,...response.data]);
        setLoadingMessages(false);
    }

    const addChats = async () => {
        setLoadingChats(true);
        console.log(currentPageChats);
        const response = await API.get(`/admin/user/${user.mobile}/chats/?page=${currentPageChats}`);
        console.log(response);
        if(response.data.length === 0) {
            setCurrentPageChats(null);
        } else {
            setCurrentPageChats(currentPageChats! + 1);
        }
        setChats([...chats,...response.data]);
        setLoadingChats(false);
    }
    //Messages
    useEffect(() => {
        if(!stopUseEffect && currentPage !== null && currentMessages.length > 0 && wrapperRef.current!.scrollHeight - wrapperRef.current!.offsetHeight < 40){
            console.log("Load data messages");
            addMessages();
        }
        if(stopUseEffect){
            setStopUseEffect(false);
        }
    },[currentMessages]);
    
    const onScroll = () => {
        if(currentPage !== null && !loadingMessages && wrapperRef.current!.scrollHeight - (wrapperRef.current!.getBoundingClientRect().height - wrapperRef.current!.scrollTop) <= 20){
            addMessages();
        }
    }

    //Chats
    useEffect(() => {
        if(!loading && currentPageChats !== null && chats.length > 0 && wrapperRefChats.current!.scrollHeight - wrapperRefChats.current!.offsetHeight < 40){
            console.log("Load data chats");
            addChats();
        }
    },[chats, loading]);
    
    const onScrollChats = () => {
        if(currentPageChats !== null && !loadingChats &&  wrapperRefChats.current!.scrollHeight - wrapperRefChats.current!.scrollTop - wrapperRefChats.current!.offsetHeight < 20){
            console.log("On scroll chats!");
            addChats();
        }
    }

    const deleteMessage = (id: number) => {
        const index = currentMessages.findIndex((item) => item.id === id);
        if(index !== -1){
            setDeleteMessage(id);
            setDeleteMessageAction(() => () => {
                setStopUseEffect(true);
                setStopUseEffect2(true);
                currentMessages.splice(index,1);
                setCurrentMessages([...currentMessages]);
                if(currentChat && currentChat.last_message && currentChat.last_message.id === id && currentMessages){
                    let newCurrentChat = {...currentChat};
                    newCurrentChat.last_message = {...currentMessages[0]};
                    newCurrentChat.members = [...currentChat.members];
                    const chatsIndex = chats.findIndex((item) => item.id === currentChat.id);
                    if(chatsIndex !== -1){
                        setCurrentChat(newCurrentChat);
                        chats[chatsIndex] = newCurrentChat;
                        setChats([...chats]);
                    }
                }
            });
        }
    }

    const deleteChat = (uri: string) => {
        const index = chats.findIndex((item) => item.uri === uri);
        if(index !== -1){
            setDeleteChat(uri);
            setDeleteChatAction(() => () => {
                chats.splice(index,1)
                setChats([...chats]);
                setCurrentMessages([]);
            });
        }
    }

    return (
        <Container>
            {loading ? 
            <LoaderIcon width={"50px"} height={"50px"} /> : 
            <ChatConatiner>
                    <div style={{borderBottom:"1px solid #F1F0F0"}} />
                    <HeaderContainer>
                        {currentChat &&
                        <>
                            <HeaderText>{currentChat.members.find((i) => i.user !== user.mobile)?.profile?.first_name || user.first_name} {currentChat.members.find((i) => i.user !== user.mobile)?.profile?.last_name || user.last_name}</HeaderText>
                            <DeleteChat onClick={() => deleteChat(currentChat.uri)}>Delete chat</DeleteChat>
                        </>}
                    </HeaderContainer>
                    <ChatsContainer  onScroll={onScrollChats} ref={wrapperRefChats}>
                        {chats && chats.length === 0 && <Text>No chats...</Text>}
                        {chats.map((item) => <Chat 
                            key={item.id}
                            active={currentChat && item.id === currentChat.id}
                            setCurrentChat={setCurrentChat}
                            currentChat={item}
                            name={(item.members.find((i) => i.user !== user.mobile)?.profile?.first_name || user.first_name)  + " " + (item.members.find((i) => i.user !== user.mobile)?.profile?.last_name || user.last_name)} 
                            avatar={item.members.find((i) => i.user !== user.mobile)?.profile?.avatar_image  || user.avatar_image}
                            text={item.last_message && item.last_message.message ? item.last_message.message.length > 15 ? item.last_message.message.substr(0,15) + "..." : item.last_message.message : "..."} 
                            data={item.last_message ? item.last_message.create_date : null} />)}
                            {loadingChats && 
                            <div style={{width:"100%", height:"50px", maxHeight:"100px"}}>
                                <LoaderIcon width={"50px"} height={"50px"} />
                            </div>}
                    </ChatsContainer>
                    <MessagesContainer onScroll={onScroll} ref={wrapperRef}>
                            {!loadingMessages && currentMessages.length === 0 && <Text>No messages...</Text>}
                            {currentMessages?.map((item, index) => item.user === user.mobile ? 
                            <RightMessage suggestion={item.suggestion} key={index} file={item.file} id={item.id} setDeleteMessage={deleteMessage} avatar={user.avatar_image} text={item.message} date={item.create_date} /> : 
                            <LeftMessage suggestion={item.suggestion} key={index} file={item.file} id={item.id} setDeleteMessage={deleteMessage} avatar={currentChat?.members.find((i) => i.user !== user.mobile)?.profile?.avatar_image} text={item.message} date={item.create_date} />)}
                            {loadingMessages &&
                            <div style={{width:"100%", height:"50px", maxHeight:"100px"}}>
                                <LoaderIcon width={"50px"} height={"50px"} />
                            </div>}
                    </MessagesContainer>
            </ChatConatiner>}
        </Container>
    )
}

export default Chats;