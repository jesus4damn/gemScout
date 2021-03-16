import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { LoaderIcon } from "../../assets/svgIcons/loaderIcon";
import { API } from "../../constants/api/api";
import { IGemstone, IRequest, IShape, IUser } from "../../constants/types/interfaces/commonInterfaces";
import Request from "../user_profile_page/requests/Request";


const Container = styled.div`
    display:flex;
    justify-content:start;
    flex-direction:column;
    flex-grow:1;
    flex-shrink:1;
`;

const Text = styled.p`
    text-align:center;
`;


const Active: React.FC<any> = ({user,loadingRequest,setRequests, requests, is_active, loadingGems, gems, shapes, deleteRequest}:{user: IUser,loadingRequest:boolean,setRequests:(req:IRequest[]) => void, requests:IRequest[], is_active: boolean, loadingGems:boolean, gems: IGemstone[], shapes: IShape[], deleteRequest:(id:number) => void}) => {

    const changeRequest = (id:number, request: IRequest) => {
        const index = requests.findIndex((item) => item.id === id);
        if(index !== -1){
            requests[index] = request;
            setRequests([...requests]);
        }
    }

    return (
        <Container>
            {loadingGems ? 
            <LoaderIcon width={"50px"} height={"50px"} /> :
            <>
                {requests.length > 0 ?
                requests.map((item) => <Request changeRequest={changeRequest} deleteRequest={deleteRequest} gems={gems} shapes={shapes} key={item.id} request={item} />) :
                <Text>{!loadingRequest && "No requests..."}</Text>}
                {loadingRequest && <LoaderIcon width={"50px"} height={"50px"} />}
            </>}
        </Container>
    )
}

export default Active;