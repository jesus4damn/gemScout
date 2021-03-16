import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import styled from "styled-components";
import {ShapeIcon} from "../../../assets/svgIcons/shapeIcon";
import {AnimatedElement} from "../../../common/styledComponents/animations";
import CustomToggle from "../CustomToggle";
import OfferBodyNotEdit from "./OfferBodyNotEdit";
import OfferBodyEdit from "./OfferBodyEdit";
import { IGemstone, IOffer, IShape } from "../../../constants/types/interfaces/commonInterfaces";

const CardBodyWrapper = styled.div`
    width: 100%;
    background: #FFFFFF;
    padding: 0 20px 19px 26px;
    border-radius: 0 0 10px 10px;
`;

const RequestHeader = styled.h1`
    font-style: Semibold;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin:0;
    color: #1B1D28;
`;









const Offer = ({offer, shapes, gems, changeOffer, deleteOffer}: {offer: IOffer, shapes: IShape[], gems: IGemstone[], deleteOffer:(id:number) => void, changeOffer:(id:number, request:IOffer) => void}) => {
    const [accordion, toggleAccordion] = useState<any>({
        isOpen: false,
        shapeAnimation: ''
    });

    const [edit, setEdit] = useState<boolean>(false);

    return (
        <>
        {edit ?
        <OfferBodyEdit changeOffer={changeOffer} deleteOffer={deleteOffer} offer={offer} shapes={shapes} gems={gems} setEdit={() => setEdit(false)} /> :
        <Accordion style={{marginBottom: '10px', width: "815px", marginRight:"25px"}} defaultActiveKey={accordion.isOpen ? "0" : ""}>
            <CustomToggle accordion={accordion} toggleAccordion={toggleAccordion} eventKey="0">
                    <div style={{paddingTop:"7px", paddingBottom:"7px"}}>
                        <RequestHeader>{offer.application.gemstone.name}{offer.color ? ", " + offer.color + "," : ""} {offer.price_in_carats ? offer.price_in_carats + " ct" : ""}</RequestHeader>
                    </div>
                    <AnimatedElement animation={accordion.shapeAnimation}>
                        <ShapeIcon/>
                    </AnimatedElement>
                </CustomToggle>
                <Accordion.Collapse eventKey="0">
                    <CardBodyWrapper>
                        <OfferBodyNotEdit offer={offer} setEdit={() => setEdit(true)} />
                    </CardBodyWrapper>
                </Accordion.Collapse>
        </Accordion>}
       </>
    )
}

export default Offer;