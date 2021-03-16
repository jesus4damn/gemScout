import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { LoaderIcon } from "../../../assets/svgIcons/loaderIcon";
import { API } from "../../../constants/api/api";
import { IUser, IRequest, IGemstone, IShape } from "../../../constants/types/interfaces/commonInterfaces";
import Request from "./Request";


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


const Requests: React.FC<any> = ({loadingGemsShapes,setDeleteRequest, requests, loadingRequests, gems, shapes, setRequests}:{loadingGemsShapes:boolean,setDeleteRequest:(id:number) => void, requests:IRequest[], loadingRequests:boolean,gems:IGemstone[], shapes:IShape[], setRequests: (req:IRequest[]) => void}) => {

    const changeRequest = (id:number, request: IRequest) => {
        const index = requests.findIndex((item) => item.id === id);
        if(index !== -1){
            requests[index] = request;
            setRequests([...requests]);
        }
    }

    return (
        <Container>
            {loadingGemsShapes ? <LoaderIcon width={"50px"} height={"50px"} /> : 
            <>
                {
                    requests.length > 0 ? 
                    requests.map((item) => <Request changeRequest={changeRequest} deleteRequest={(id: number) => {
                        setDeleteRequest(id);
                        setRequests(requests.filter((item) => item.id !== id));
                    }} gems={gems} shapes={shapes} request={item} key={item.id} />) :
                    <>
                        {!loadingRequests && <Text>No requests...</Text>}
                    </>
                }
                {loadingRequests && <LoaderIcon width={"50px"} height={"50px"} />}
            </>}
        </Container>
    )
}

export default Requests;