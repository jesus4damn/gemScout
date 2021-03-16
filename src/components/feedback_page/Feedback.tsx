import { Field, Form, Formik } from "formik";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {connect, ConnectedProps, useDispatch, useSelector} from "react-redux";

import styled from "styled-components";
import { LoaderIcon } from "../../assets/svgIcons/loaderIcon";
import { ScrepkaIcon } from "../../assets/svgIcons/screpkaIcon";
import { SendMessageIcon } from "../../assets/svgIcons/sendMessageIcon";
import { PageWrapper } from "../../common/styledComponents/wrappers";
import { API } from "../../constants/api/api";
import { IChats, IMessage } from "../../constants/types/interfaces/commonInterfaces";
import { messaging } from "../../init-fcm";
import { RootState } from "../../store/reducers/rootReducer";
import Chat from "../user_profile_page/chats/Chat";
import LeftMessage from "../user_profile_page/chats/LeftMessage";
import RightMessage from "../user_profile_page/chats/RightMessage";
import firebase from 'firebase/app';
import Popup from "../gemstones_page/Popup";
import { SET_SEND_MESSAGE, SET_SUBSCRIBE } from "../../constants/actionTypes";
import { debounce } from "../../common/functions/debounce";

const Inner = styled.div`
    width:100%;
    min-width:1100px;
    padding-top:7px;
`;

const ChatContainer = styled.div`
    width:100%;
    min-width:1100px;
    max-height:763px;
    background: #FFFFFF;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    flex-grow:1;
    display:flex;
    overflow:hidden;
`;


const ChatsContainer = styled.div`
    height:90%;
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
    height:10%;
    min-height:60px;
`;

const MessagesContainer = styled.div`
    border-left:1px solid #F1F0F0;
    height:90%;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
`;

const MessagesInner = styled.div`
    width:100%;
    padding-bottom:33px;
    overflow:scroll;
    display:flex;
    flex-direction:column-reverse;
    flex-grow:1;
    flex-shrink:1;
`;



const MessageForm = styled.div`
    flex-basis:74px;
    width:100%;
    flex-grow:0;
    flex-shrink:0;
    background: #FAFAFA;
    padding:0px 23px;
    padding-top:5px;
`;

const HeaderText = styled.p`
    font-style: bold;
    font-weight: bold;
    font-size: 18px;
    color: #1B1D28;
    margin:0;
`;

const InputContainer = styled.div`
    border-bottom: 1px solid #F1F0F0;
    height:10%;
    min-height:60px;
    display:flex;
    align-items:center;
    padding-left:20px;
    padding-right:20px;
`;

const SearchChat = styled.input`
    width: 100%;
    border: none;
    font-style: regular;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    background: transparent;
    padding: 0;
    margin:0;
    color: #000;
    &:placeholder{
        color: #A6ACBE;
    }
`;

const CustomTextarea = styled.textarea`
    width:calc(100% - 100px);
    height:70px;
    background: #FAFAFA;
    border:none;
    resize:none;
    &: focus{
        outline:none;
    }
    padding: 9px 16px 11px 14px;
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

const Button = styled.div`
    width:44px;
    height:44px;
    background: #1B1D28;
    border-radius: 17px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:10px;
`;
const ButtonScrepka  = styled.label`
    width:44px;
    height:44px;
    margin-left:10px;
    margin-right:10px;
    margin-bottom:0;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
`;

const ImageScrepka = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`
}))`
    width:100%;
    height:100%;
    margin-bottom:0;
`;

const CustomFileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

const connector = connect(
    (state: RootState) => ({
        avatar: state.userProfile.avatar,
        name: state.userProfile.name,
        userId: state.userProfile.id
    })
)

const Feedback: React.FC<any> = ({name, avatar, userId}: ConnectedProps<typeof connector>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
    const [loadingSendMessage, setLoadingSendMessage] = useState<boolean>(false);
    const [loadingChats, setLoadingChats] = useState<boolean>(false);
    const [chats, setChats] = useState<IChats[]>([]);
    // const [sortChats, setSortChats] = useState<IChats[]>([]);
    const [currentChat, setCurrentChat] = useState<IChats | null>(null);
    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);
    const [file, setFile] = useState('');
    const [currentPage, setCurrentPage] = useState<number | null>(2);
    const [currentPageChats, setCurrentPageChats] = useState<number | null>(2);
    const wrapperRef = useRef<HTMLTableElement>(null);
    const wrapperRefChats = useRef<HTMLTableElement>(null);
    const [deleteMessage, setDeleteMessage] = useState<number | null>(null);
    const [stopUseEffect, setStopUseEffect] = useState<boolean>(false);
    const [stopUseEffect2, setStopUseEffect2] = useState<boolean>(false);
    const [stopUseEffect3, setStopUseEffect3] = useState<boolean>(false);

    const dispatch = useDispatch();
    const subscribe = useSelector((state: RootState) => state.users.subscribe);
    const sendMessage = useSelector((state: RootState) => state.users.sendMessage);

    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if(firebase.messaging.isSupported() && !subscribe){
            console.log("Subscribe!");
            dispatch({type:SET_SUBSCRIBE, subscribe: true});
            messaging.requestPermission()
            .then(async function() {
                    const token = await messaging.getToken();
                    await API.post('/devices/users/add/',{token});
            })
            .catch(function(err : any) {
                console.log("Unable to get permission to notify.", err);
            });
            navigator.serviceWorker.addEventListener("message", (message) => {
                const newMessage : IMessage = {
                    chat_session:message.data["firebase-messaging-msg-data"].data.uri,
                    create_date: new Date().toISOString(),
                    id:Number(message.data["firebase-messaging-msg-data"].data.id),
                    message:message.data["firebase-messaging-msg-data"].notification.body,
                    update_date: new Date().toISOString(),
                    user:message.data["firebase-messaging-msg-data"].data.user,
                    file:message.data["firebase-messaging-msg-data"].data.file ? message.data["firebase-messaging-msg-data"].data.file : null,
                    is_read:false,
                    is_mine:false,
                    suggestion:null
                };
                dispatch({type:SET_SEND_MESSAGE,message:newMessage});
            });
        }
    },[]);

    const getChat = async (uri: string) => {
        setStopUseEffect3(true);
        const chatM = await API.get(`/admin/chats/${uri}/`);
        setChats([chatM.data,...chats]);
    }

    useEffect(() => {
        if(sendMessage !== null){
            const index = chats.findIndex((item) => item.uri === sendMessage.chat_session);
            if(index !== -1){
                chats[index].last_message = sendMessage;
                if(currentChat && chats[index].uri !== currentChat.uri){
                    chats[index].is_not_read += 1;
                }
                chats[index] = {...chats[index]};
                let chatIndex = chats[index];
                chats.splice(index,1);
                setStopUseEffect3(true);
                setChats([chatIndex,...chats]);
            } else {
                getChat(sendMessage.chat_session);
            }
            if(currentChat && currentChat.uri === sendMessage.chat_session){
                currentMessages.unshift(sendMessage);
                setCurrentMessages([...currentMessages]);
            }
            dispatch({type:SET_SEND_MESSAGE,message:null});
        }
    }, [sendMessage]);
    
    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                const response = await API.get(`/admin/support_chats/?name=${searchValue}`);
                console.log("Chats",response.data);
                if(response.data.length > 0) {
                    response.data[0].is_not_read = 0;
                    setChats(response.data);
                    setCurrentChat(response.data[0]);
                    // setSortChats(response.data);
                }
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
                const response = await API.get(`/admin/support_chats/${currentChat?.uri}/`);
                console.log("Messages",response.data);
                if(currentChat) currentChat.is_not_read = 0;
                wrapperRef.current!.scrollTop = wrapperRef.current!.scrollHeight;
                setCurrentPage(2);
                setCurrentChat(currentChat);
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
        const response = await API.get(`/admin/support_chats/${currentChat?.uri}/?page=${currentPage}`);
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
        const response = await API.get(`/admin/support_chats/?page=${currentPageChats}&name=${searchValue}`);
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
        if(!stopUseEffect && currentPage !== null && !loadingMessages && currentMessages && currentMessages.length > 0 && wrapperRef.current!.scrollHeight - wrapperRef.current!.offsetHeight < 40){
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
        if(!loading && !stopUseEffect3 && currentPageChats !== null && chats.length > 0 && wrapperRefChats.current!.scrollHeight - wrapperRefChats.current!.offsetHeight < 40){
            console.log("Load data chats");
            addChats();
        }
        if(stopUseEffect3){
            setStopUseEffect3(false);
        }
    },[chats, loading]);
    
    const onScrollChats = () => {
        if(currentPageChats !== null && !loadingChats &&  wrapperRefChats.current!.scrollHeight - wrapperRefChats.current!.scrollTop - wrapperRefChats.current!.offsetHeight < 20){
            console.log("On scroll chats!");
            addChats();
        }
    }

    const searchChat = async (value: string) => {
        setSearchValue(value);
        setStopUseEffect3(true);
        setChats([]);
        setLoadingChats(true);
        const response = await API.get(`/admin/support_chats/?name=${value}`);
        setCurrentPageChats(2);
        if(response.data.length > 0) {
            response.data[0].is_not_read = 0;
            setChats(response.data);
            setCurrentChat(response.data[0]);
        }
        setLoadingChats(false);
    };


    return (
        <PageWrapper padding="35px 21px 37px 24px">
                {loading ? 
                <LoaderIcon width={"50px"} height={"50px"} /> : 
                <ChatContainer>
                    <div className={"d-flex flex-grow-1 w-25 flex-column"}>
                        <InputContainer>
                            <SearchChat
                                placeholder={"Find user"}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    console.log(event.target.value);
                                    // setSortChats(chats.filter((item) => {
                                    //     for(let i = 0; i < item.members.length; i++){
                                    //         if((item.members[i].profile?.first_name + " " + item.members[i].profile?.last_name).toLowerCase().includes(event.target.value.toLowerCase())) return true;
                                    //     }
                                    //     return false;
                                    // }));
                                    searchChat(event.target.value);
                                }}
                            />
                        </InputContainer>
                        <ChatsContainer onScroll={onScrollChats} ref={wrapperRefChats}>
                            {chats && chats.length === 0 && <Text>No chats...</Text>}
                            {chats.map((item) => <Chat 
                                key={item.id} 
                                countMessages={item.is_not_read}
                                read={item.last_message && item.last_message.user === userId ? item.last_message.is_read : undefined}
                                smallImage={item.last_message && item.last_message.user === userId ? avatar : ''}
                                active={currentChat && item.id === currentChat.id}
                                setCurrentChat={setCurrentChat}
                                currentChat={item}
                                name={(item.members.find((i) => i.user !== Number(userId))?.profile?.first_name || name.split(" ")[0])  + " " + (item.members.find((i) => i.user !== Number(userId))?.profile?.last_name || name.split(" ")[1])} 
                                avatar={item.members.find((i) => i.user !== Number(userId))?.profile?.avatar_image  || avatar}
                                text={item.last_message ? item.last_message.message ? item.last_message.message.length > 15 ? item.last_message.message.substr(0,15) + "..." : item.last_message.message : "..." : "..."} 
                                data={item.last_message ? item.last_message.create_date : null} />)}
                            {loadingChats && 
                            <div style={{width:"100%", height:"50px", maxHeight:"100px"}}>
                                <LoaderIcon width={"50px"} height={"50px"} />
                            </div>}
                        </ChatsContainer>
                    </div>
                    <div className={"d-flex flex-grow-1 w-75 flex-column"}>
                        <HeaderContainer>
                            {currentChat &&<HeaderText>{currentChat.members.find((i) => i.user !== Number(userId))?.profile?.first_name || name.split(" ")[0]} {currentChat.members.find((i) => i.user !== Number(userId))?.profile?.last_name || name.split(" ")[1]}</HeaderText>}
                        </HeaderContainer>
                        <MessagesContainer>
                            <MessagesInner ref={wrapperRef} onScroll={onScroll}>
                                {!loadingMessages && currentMessages && currentMessages.length === 0 && <Text>No messages...</Text>}
                                {currentMessages?.map((item, index) => item.is_mine ? 
                                <RightMessage key={index} read={item.is_read} file={item.file} id={item.id} setDeleteMessage={setDeleteMessage} avatar={avatar} text={item.message} date={item.create_date} />: 
                                <LeftMessage key={index} file={item.file} id={item.id} setDeleteMessage={setDeleteMessage} avatar={currentChat?.members.find((i) => i.user !== Number(userId))?.profile?.avatar_image} text={item.message} date={item.create_date} />)}
                                {loadingMessages &&
                                <div style={{width:"100%", height:"50px", maxHeight:"100px"}}>
                                    <LoaderIcon width={"50px"} height={"50px"} />
                                </div>}
                            </MessagesInner>
                            <MessageForm>
                                {currentChat &&
                                <Formik
                                    initialValues={{
                                        text:"",
                                        file:null
                                    }}
                                    onSubmit={async (values:{text:string, file: any},{resetForm, setFieldValue}) => {
                                        setLoadingSendMessage(true);
                                        let form = new FormData();
                                        values.text && form.append('message', values.text);
                                        values.file && form.append('file',values.file);
                                        try{
                                            if(values.file || values.text) {
                                                let response = await API.post(`/admin/support_chats/${currentChat?.uri}/`, form, true);
                                                currentMessages ? setCurrentMessages([response.data, ...currentMessages]) : setCurrentMessages([response.data]);
                                                let myChat = chats.find((item) => item.uri === response.data.chat_session);
                                                myChat!.last_message = response.data;
                                                setChats([myChat!,...chats.filter((item) => item.uri !== response.data.chat_session)]);
                                            }
                                            setLoadingSendMessage(false);
                                        } catch(e){
                                            setLoadingSendMessage(false);
                                        }
                                        setFieldValue('text','');
                                        setFieldValue('file', null);
                                        setFile('');
                                        resetForm();
                                    }}
                                >
                                    {
                                        ({dirty, values, setFieldValue, submitForm}) => (
                                            <Form>
                                                <div className={"d-flex align-items-center justify-content-between"}>
                                                    {/* <Field
                                                        name={"text"}
                                                        component={CustomTextarea}
                                                        placeholder={"Write your message here"}
                                                        onChange={(e) => console.log(e)}
                                                    /> */}
                                                    <CustomTextarea
                                                        onChange={(value) => setFieldValue('text',value.target.value)}
                                                        value={values.text}
                                                        placeholder={"Write your message here"}
                                                    />
                                                    {loadingSendMessage ? <LoaderIcon width={"50px"} height={"50px"} /> :
                                                    <div className={"d-flex align-items-center h-100"} style={{cursor:"pointer"}}>
                                                        <ButtonScrepka htmlFor={`file_for_message`}>
                                                            {file ? <ImageScrepka src={file} /> : <ScrepkaIcon />}
                                                        </ButtonScrepka>
                                                        <CustomFileInput 
                                                            id={`file_for_message`}
                                                            type="file"
                                                            onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
                                                                setFieldValue('file', e.target.files[0]);
                                                                setFile(URL.createObjectURL(e.target.files[0]));
                                                                // let reader = new FileReader();
                                                                // reader.readAsDataURL(e.target.files[0]);
                                                                // reader.onload = function (e) {
                                                                //     setFieldValue('file', e.target.files[0]);
                                                                // }
                                                        }}/> 
                                                        <Button onClick={() => submitForm()}>
                                                            <SendMessageIcon/>
                                                        </Button>
                                                    </div>}
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>}
                            </MessageForm>
                        </MessagesContainer>
                    </div>
                </ChatContainer>}
                <Popup 
                    isShow={deleteMessage} 
                    closePopup={() => setDeleteMessage(null)}
                    text={"Are you sure you want to delete this message?"}
                    action={async () => {
                        const index = currentMessages.findIndex((item) => item.id === deleteMessage);
                        if(index !== -1){
                            await API.delete(`/admin/messages/${deleteMessage}/delete/`);
                            setStopUseEffect(true);
                            setStopUseEffect2(true);
                            currentMessages.splice(index,1);
                            setCurrentMessages([...currentMessages]);
                            if(currentChat && currentChat.last_message && currentChat.last_message.id === deleteMessage && currentMessages){
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
                        }
                    }} />
        </PageWrapper>
    )
}

export default connector(Feedback);