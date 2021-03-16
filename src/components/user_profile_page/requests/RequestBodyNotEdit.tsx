import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { BoxIcon } from "../../../assets/svgIcons/boxIcon";
import { CtIcon } from "../../../assets/svgIcons/ctIcon";
import { DollarIcon } from "../../../assets/svgIcons/dollarIcon";
import logoPng from "../../../assets/images/logo.png";
import { IOffer, IRequest } from "../../../constants/types/interfaces/commonInterfaces";
import { API } from "../../../constants/api/api";
import { LoaderIcon } from "../../../assets/svgIcons/loaderIcon";


const Container = styled.div`
    width:100%;
    border-top: 1px solid #ECEEEF;
    display:flex;
    justify-content:space-between;
    padding-top:17px;
    padding-right:25px;
`;

const CardContainer = styled.div`
    width:328px;
    background: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    float:right;
    padding:14px;
    margin-bottom:15px;
`;

const TextItem = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:8px;
    width:340px;
`;

const Text = styled.p<{weight?:string, marginLeft?:string, textDecoration?:string, textAlign?:string, fontSize?:string}>`
    font-style: normal;
    font-weight:${({weight}) => weight ? weight : 400};
    font-size: ${({fontSize}) => fontSize ? fontSize : "16px"};
    line-height: 20px;
    color: #1B1D28;
    margin:0;
    margin-left:${({marginLeft}) => marginLeft ? marginLeft : ""};
    text-decoration:${({textDecoration}) => textDecoration ? textDecoration : ""};
    text-align:${({textAlign}) => textAlign ? textAlign : ""};
`;

const ImageConatiner = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:16px;
    margin-bottom:25px;
    margin-left:-10px;
`;

export const Image = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`,
}))`
    width: 80px;
    height: 80px;
    margin-left:10px;
    margin-right:10px;
    border-radius: 12px;
    object-fit: cover;
`;

const Button = styled.button<{background?:string, float?: string}>`
    width:114px;
    height:38px;
    background: ${({background}) => background ? background : "#B9BCCA"};
    border-radius: 21px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 16px;
    color: #FFFFFF;
    float:${({float}) => float ? float : "left"};
    margin-top:20px;
    cursor:pointer;
    padding:0;
    border:none;
`;

const RightCard = ({offer}:{offer:IOffer}) => {
    useEffect(() => {
        console.log(offer);
    },[]);
    return (
        <CardContainer>
            <div style={{borderBottom:"1px solid #B9BCCA", paddingBottom:"14px"}}>
                {offer.shapes.map((item, index) => (
                    <div key={index} className={"d-flex flex-row mb-1 align-items-center"}>
                        <img style={{width:"16px",height:"17px"}} src={API.baseUrl + item.image} alt="shape_img"/>
                        <Text weight={"600"} marginLeft={"9px"}>{item.name}</Text>
                    </div>
                ))}
                <div className={"d-flex flex-row mb-1"}>
                    <CtIcon />
                    <Text weight={"600"} marginLeft={"9px"}>{offer.weight ? offer.weight : "-"}</Text>
                </div>
                <div className={"d-flex flex-row mb-1"}>
                    <DollarIcon />
                    <Text weight={"600"} marginLeft={"9px"}>{offer.price_in_carats ? offer.price_in_carats : "-"}</Text>
                </div>
            </div>
            <div className={"d-flex w-100"} style={{paddingTop:"11px"}}>
                <div className={"flex-grow-1 w-50"}>
                    <Text fontSize={"14px"}>Color: {offer.color ? offer.color : "-"}</Text>
                    <Text fontSize={"14px"}>Inclusions: {offer.inclusions ? offer.inclusions : "-"}</Text>
                    <Text fontSize={"14px"}>Origin: {offer.origin ? offer.origin : "-"}</Text>
                    <Text fontSize={"14px"}>Certificate: {offer.certificate ? 'Yes' : 'No'}</Text>
                </div>
                <div className={"flex-grow-1 w-50"}>
                    <Text fontSize={"14px"}>Dimension: {offer.dimension ? offer.dimension : "-"}</Text>
                    <Text fontSize={"14px"}>Treatment: {offer.treatment ? offer.treatment : "-"}</Text>
                    <Text fontSize={"14px"}>Seller: </Text>
                </div>
            </div>
        </CardContainer>
    )
}
const RequestBodyNotEdit: React.FC<any> = ({setEdit, request, loading, offers}:{setEdit: () => void, request: IRequest, loading:boolean, offers: IOffer[]}) => {

    return (
        <Container>
            <div className={"flex-grow-1 w-50"}>
                <TextItem>
                    <Text weight={"400"}><b>Dimention:</b> {request.dimension_from} x {request.dimension_to} mm</Text>
                </TextItem>
                {request.origin &&
                <TextItem>
                    <Text weight={"400"}><b>Origin:</b> {request.origin}</Text>
                </TextItem>}
                <TextItem>
                    <Text weight={"400"}><b>Quantity:</b> {request.quantity}</Text>
                </TextItem>
                {request.treatment &&
                <TextItem>
                    <Text weight={"400"}><b>Treatment:</b> {request.treatment}</Text>
                </TextItem>}
                {request.clarity &&
                <TextItem>
                    <Text weight={"400"}><b>Clarity:</b> {request.clarity}</Text>
                </TextItem>}
                {request.inclusions &&
                <TextItem>
                    <Text weight={"400"}><b>Inclusions:</b> {request.inclusions}</Text>
                </TextItem>}
                <TextItem>
                    <Text weight={"400"}><b>Price:</b> {request.price_from} - {request.price_to}</Text>
                </TextItem>
                {request.price_in_carats_from &&
                <TextItem>
                    <Text weight={"400"}><b>Price in carats:</b> {request.price_in_carats_from} - {request.price_in_carats_to}</Text>
                </TextItem>}
                {/* <TextItem>
                    <Text weight={"400"}><b>Buyer:</b>&nbsp;</Text>
                    <Text weight={"400"} textDecoration={"underline"}>???</Text>
                </TextItem> */}
                <TextItem>
                    <Text weight={"400"}><b>Gem location:</b> {request.city}</Text>
                </TextItem>
                <TextItem>
                    <Text weight={"400"} textAlign={"justify"}><b>Description:</b> {request.buyer_description}</Text>
                </TextItem>
                {request.photos.length > 0 &&
                <ImageConatiner>
                    {request.photos.map((item, index) => <Image key={index} src={item.photo.startsWith('data:') ? item.photo : API.baseUrl + item.photo}/>)}
                </ImageConatiner>}
                <Button onClick={() => setEdit()}>Edit</Button>
            </div>
            <div className={"flex-grow-1 w-50"}>
                {offers.map((item, index) => <RightCard offer={item} key={index}/>)}
                {loading && <LoaderIcon width={"50px"} height={"50px"} />}
            </div>
        </Container>
    )   
}

export default RequestBodyNotEdit;