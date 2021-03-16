import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { LoaderIcon } from "../../../assets/svgIcons/loaderIcon";
import { API } from "../../../constants/api/api";
import { IUser, IOffer, IGemstone, IShape } from "../../../constants/types/interfaces/commonInterfaces";
import Offer from "./Offer";


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


const Offers: React.FC<any> = ({loadingGemsShapes,setDeleteOffer, shapes, gems, loadingOffers, offers, setOffers}:{loadingGemsShapes:boolean,shapes:IShape[],gems:IGemstone[],loadingOffers:boolean,offers:IOffer[], setOffers:(offers:IOffer[]) => void,setDeleteOffer:(id:number) => void}) => {

    const changeOffer = (id:number, request: IOffer) => {
        const index = offers.findIndex((item) => item.id === id);
        if(index !== -1){
            offers[index] = request;
            setOffers([...offers]);
        }
    }

    return (
        <Container>
            {loadingGemsShapes ? <LoaderIcon width={"50px"} height={"50px"} /> :
            <>
                {
                    offers.length > 0 ? 
                    offers.map((item) => <Offer changeOffer={changeOffer} deleteOffer={(id: number) => {
                        setDeleteOffer(id);
                        setOffers(offers.filter((item) => item.id !== id));
                    }} shapes={shapes} gems={gems} offer={item} key={item.id} />) :
                    <>
                        {!loadingOffers && <Text>No offers...</Text>}
                    </>
                }
                {loadingOffers && <LoaderIcon width={"50px"} height={"50px"} />}
            </>}
        </Container>
    )
}

export default Offers;