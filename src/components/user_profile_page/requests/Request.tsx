import React, {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import styled from "styled-components";
import {ShapeIcon} from "../../../assets/svgIcons/shapeIcon";
import {AnimatedElement} from "../../../common/styledComponents/animations";
import CustomToggle from "../CustomToggle";
import {IGemstone, IOffer, IRequest, IShape} from "../../../constants/types/interfaces/commonInterfaces";
import RequestBodyNotEdit from "./RequestBodyNotEdit";
import RequestBodyEdit from "./RequestBodyEdit";
import { Months } from "../../../constants/types/types";
import { API } from "../../../constants/api/api";

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

const RequestSubHeader = styled.p`
    font-style: Regular;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: rgba(27, 29, 40, 0.5);
    margin:0;
`;








const Request = ({request, gems, shapes, deleteRequest, changeRequest}: {request: IRequest, gems: IGemstone[], shapes: IShape[], deleteRequest:(id:number) => void, changeRequest:(id:number, request:IRequest) => void}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [accordion, toggleAccordion] = useState<any>({
        isOpen: false,
        shapeAnimation: ''
    });

    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                let offersData = [];
                for(let i = 0; i < request.suggestions.length; i++){
                    const response = await API.get(`/suggestions/${request.suggestions[i]}/`);
                    offersData.push(response.data);
                    setOffers(offersData);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        if(accordion.isOpen && offers.length === 0){
            loadData();
        }
    },[accordion.isOpen]);

    const [edit, setEdit] = useState<boolean>(false);
    let date = new Date(request.active_until);
    return (
        <>
        {edit ?
        <RequestBodyEdit changeRequest={changeRequest} deleteRequest={deleteRequest} request={request} gems={gems} shapes={shapes} setEdit={() => setEdit(false)} /> :
        <Accordion style={{marginBottom: '10px', width: "815px", marginRight:"25px"}} defaultActiveKey={accordion.isOpen ? "0" : ""}>
            <CustomToggle accordion={accordion} toggleAccordion={toggleAccordion} eventKey="0">
                    <div>
                        <RequestHeader>{request.gemstone ? request.gemstone.name : ""}{request.color ? ", " + request.color : ""}{request.price_in_carats_from && request.price_in_carats_to ? `, ${request.price_in_carats_from} - ${request.price_in_carats_to} ct` : request.price_in_carats_from ? `, from  ${request.price_in_carats_from} ct` : request.price_in_carats_to ? `, to  ${request.price_in_carats_to} ct` : ""}</RequestHeader>
                        <RequestSubHeader>Close: {date.getDate()} {Months[date.getMonth()].slice(0, 3)} {date.getFullYear()} {date.getHours()}:{date.getMinutes().toString().length === 2 ? date.getMinutes() : '0' + date.getMinutes().toString()}</RequestSubHeader>
                    </div>
                    <AnimatedElement animation={accordion.shapeAnimation}>
                        <ShapeIcon/>
                    </AnimatedElement>
                </CustomToggle>
                <Accordion.Collapse eventKey="0">
                    <CardBodyWrapper>
                        <RequestBodyNotEdit loading={loading} offers={offers} request={request} setEdit={() => setEdit(true)} />
                    </CardBodyWrapper>
                </Accordion.Collapse>
        </Accordion>}
       </>
    )
}

export default Request;