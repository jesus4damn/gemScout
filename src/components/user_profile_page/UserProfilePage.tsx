import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { ArrowLeft } from "../../assets/svgIcons/arrovLeft";
import Profile from "./profile/Profile";
import UserRightMenu from "./UserRightMenu";
import {UserPages} from "../../constants/types/types";
import { IGemstone, IOffer, IRequest, IShape, IUser } from "../../constants/types/interfaces/commonInterfaces";
import Requests from "./requests/Requests";
import Offers from "./offers/Offers";
import Chats from "./chats/Chats";
import Popup from "../gemstones_page/Popup";
import { API } from "../../constants/api/api";
import { PageWrapper } from "../../common/styledComponents/wrappers";


const Inner = styled.div`
    width:100%;
    min-width:1100px;
    padding-top:7px;
`;

const Header = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:37px;
`;

const Content = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
`;


const Text = styled.span<{color?: string, cursor?: string}>`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: ${({color}) => color ? color : "#FFF"};
    cursor: ${({cursor}) => cursor ? cursor : "default"};
`;

const UserProfilePage: React.FC<any> = ({toUsers, user}:{toUsers:() => void, user: IUser}) => {
    const [page, setPage] = useState(UserPages['Profile']);
    const [deleteRequest, setDeleteRequest] = useState<number | null>(null);
    const [deleteOffer, setDeleteOffer] = useState<number | null>(null);
    const [deleteChat, setDeleteChat] = useState<string | null>(null);
    const [deleteMessage, setDeleteMessage] = useState<number | null>(null);
    const [deleteMessageAction, setDeleteMessageAction] = useState<(() => void) | null>(null);
    const [deleteChatAction, setDeleteChatAction] = useState<(() => void) | null>(null);

    const wrapperRef = useRef<HTMLTableElement>(null);
    const scrollRef = useRef<HTMLTableElement>(null);

    const [gems, setGems] = useState<IGemstone[]>([]);
    const [shapes, setShapes] = useState<IShape[]>([]);

    const [loadingRequests, setLoadingRequests] = useState<boolean>(false);
    const [requests, setRequests] = useState<IRequest[]>([]);
    const [requestsPage, setRequestsPage] = useState<number | null>(1);

    const [loadingOffers, setLoadingOffers] = useState<boolean>(false);
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [offersPage, setOffersPage] = useState<number | null>(1);

    const [loadingGemsShapes, setLoadingGemsShapes] = useState<boolean>(false);

    const loadGemsShapes = async () => {
        setLoadingGemsShapes(true);
        const gemsResponse = await API.get(`/gems/list/`);
        console.log("Gems",gemsResponse.data);
        setGems(gemsResponse.data);

        const shapesResponse = await API.get(`/shapes/list/`);
        console.log("Shapes",shapesResponse.data);
        setShapes(shapesResponse.data);
        setLoadingGemsShapes(false);
    }

    useEffect(() => {
        async function loadData() {
            try{
                setRequests([]);
                setRequestsPage(2);
                setLoadingRequests(true);
                const requestsResponse = await API.get(`/admin/applications/user/${user.mobile}/`);
                console.log("Requests",requestsResponse.data);
                setRequests(requestsResponse.data);
                if(gems.length === 0 || shapes.length === 0) await loadGemsShapes();
                setLoadingRequests(false);
            } catch (err) {
                setLoadingRequests(false);
                console.log(err);
            }
        }
        if(page === UserPages['Request']){
            loadData();
        }
    },[page]);

    useEffect(() => {
        async function loadData() {
            try{
                setOffers([]);
                setOffersPage(2);
                setLoadingOffers(true);
                const response = await API.get(`/suggestions/user/${user.mobile}/`);
                console.log("Offers", response.data);
                setOffers(response.data);
                if(gems.length === 0 || shapes.length === 0) await loadGemsShapes();
                setLoadingOffers(false);
            } catch (err) {
                setLoadingOffers(false);
                console.log(err);
            }
        }
        if(page === UserPages['Offers']){
            loadData();
        }
    },[page]);

    const addRequests = async () => {
        setLoadingRequests(true);
        const requestsResponse = await API.get(`/admin/applications/user/${user.mobile}/?page=${requestsPage}`);
        if(requestsResponse.data.length === 0) {
            setRequestsPage(null);
        } else {
            setRequestsPage(requestsPage! + 1);
        }
        setRequests([...requests,...requestsResponse.data]);
        setLoadingRequests(false);
    }

    const addOffers = async () => {
        setLoadingOffers(true);
        const offersResponse = await API.get(`/admin/applications/user/${user.mobile}/?page=${offersPage}`);
        if(offersResponse.data.length === 0) {
            setOffersPage(null);
        } else {
            setOffersPage(offersPage! + 1);
        }
        setOffers([...offers,...offersResponse.data]);
        setLoadingOffers(false);
    }

    useEffect(() => {
        if(page === UserPages['Request']){
            if(requestsPage !== null && requests.length > 0 && scrollRef.current!.scrollHeight - scrollRef.current!.offsetHeight < 40){
                addRequests();
            }
        }
        if(page === UserPages['Offers']){
            if(offersPage !== null && offers.length > 0 && scrollRef.current!.scrollHeight - scrollRef.current!.offsetHeight < 40){
                addOffers();
            }
        }
    },[offers, requests]);
    
    const onScroll = () => {
        if(page === UserPages['Request']){
            if(requestsPage !== null && !loadingRequests && wrapperRef.current!.getBoundingClientRect().bottom <= window.innerHeight){
                addRequests();
            }
        }
        if(page === UserPages['Offers']){
            if(offersPage !== null && !loadingOffers && wrapperRef.current!.getBoundingClientRect().bottom <= window.innerHeight){
                addOffers();
            }
        }
    }

    return (
        <PageWrapper padding="29px 36px 57px 29px" ref={scrollRef} onScroll={onScroll}>
            <Inner ref={wrapperRef}>
                <Header>
                    <Text color={"#414141"} cursor={"pointer"} onClick={() => toUsers()}>All Users</Text>
                    <div className={"ml-4 mr-4"}>
                        <ArrowLeft />
                    </div>
                    <Text color={"#697479"}>{user.first_name} {user.last_name}</Text>
                </Header>
                <Content>
                    {page === UserPages['Profile'] && <Profile user={user} />}
                    {page === UserPages['Request'] && <Requests loadingGemsShapes={loadingGemsShapes} setRequests={setRequests} requests={requests} loadingRequests={loadingRequests} gems={gems} shapes={shapes} setDeleteRequest={setDeleteRequest} />}
                    {page === UserPages['Offers'] && <Offers loadingGemsShapes={loadingGemsShapes} setOffers={setOffers} offers={offers} loadingOffers={loadingOffers} gems={gems} shapes={shapes} setDeleteOffer={setDeleteOffer} />}
                    {page === UserPages['Chats'] && <Chats setDeleteChat={setDeleteChat} setDeleteChatAction={setDeleteChatAction} setDeleteMessageAction={setDeleteMessageAction} setDeleteMessage={setDeleteMessage} user={user} />}
                    <UserRightMenu page={page} setPage={setPage} />
                </Content>
                <Popup 
                        isShow={deleteRequest} 
                        closePopup={() => setDeleteRequest(null)}
                        text={"Are you sure you want to delete this request?"}
                        action={async () => {
                            await API.delete(`/admin/application/${deleteRequest}/delete/`);
                        }} />  
                <Popup 
                        isShow={deleteOffer} 
                        closePopup={() => setDeleteOffer(null)}
                        text={"Are you sure you want to delete this offer?"}
                        action={async () => {
                            await API.delete(`/admin/suggestion/${deleteOffer}/delete/`);
                        }} />
                <Popup 
                    isShow={deleteChat} 
                    closePopup={() => setDeleteChat(null)}
                    text={"Are you sure you want to delete this chat?"}
                    action={async () => {
                        await API.delete(`/admin/chats/${deleteChat}/delete/`);
                        deleteChatAction && deleteChatAction();
                    }} />
                <Popup 
                    isShow={deleteMessage} 
                    closePopup={() => setDeleteMessage(null)}
                    text={"Are you sure you want to delete this message?"}
                    action={async () => {
                        await API.delete(`/admin/messages/${deleteMessage}/delete/`);
                        deleteMessageAction && deleteMessageAction();
                    }} />
            </Inner>
        </PageWrapper>
    )
}

export default UserProfilePage;