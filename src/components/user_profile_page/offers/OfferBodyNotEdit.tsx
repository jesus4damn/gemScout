import React, {useEffect, useState} from "react";
import styled from "styled-components";
import logoPng from "../../../assets/images/logo.png";
import { API } from "../../../constants/api/api";
import { IOffer } from "../../../constants/types/interfaces/commonInterfaces";
import { Months } from "../../../constants/types/types";


const Container = styled.div`
    width:100%;
    border-top: 1px solid #ECEEEF;
    padding-top:17px;
    padding-right:25px;
`;

const Inner = styled.div`
    display:flex;
    justify-content:space-between;
`;

const CardContainer = styled.div`
    width:328px;
    background: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    float:right;
    padding:14px;
`;

const TextItem = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:8px;
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

const Button = styled.button<{background?:string}>`
    width:114px;
    height:38px;
    background: ${({background}) => background ? background : "#B9BCCA"};
    border-radius: 21px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 16px;
    color: #FFFFFF;
    margin-top:20px;
    cursor:pointer;
    padding:0;
    border:none;
`;

const BottomBlock = styled.div`
    width:100%;
    background: #F2F4F8;
    border-radius: 12px;
    padding:10px;
    margin-top:36px;
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

const OfferBodyNotEdit: React.FC<any> = ({setEdit, offer}:{offer:IOffer, setEdit: () => void}) => {
    let date = new Date(offer.active_until);
    const [buyer, setBuyer] = useState<{name:string, surname:string} | null>(null);
    useEffect(() => {
        async function loadData() {
            const profile = await API.get(`/profile/${offer.application.user}/`);
            setBuyer({name:profile.data.first_name, surname:profile.data.last_name});
        }
        loadData();
    },[]);
    return (
        <>
            <Container>
                <Inner>
                    <div className={"flex-grow-1 w-50"}>
                        {offer.dimension &&
                        <TextItem>
                            <Text weight={"400"}><b>Dimention:</b> {offer.dimension} mm</Text>
                        </TextItem>}
                        {offer.color &&
                        <TextItem>
                            <Text weight={"400"}><b>Color:</b> {offer.color}</Text>
                        </TextItem>}
                        {offer.clarity &&
                        <TextItem>
                            <Text weight={"400"}><b>Clarity:</b> {offer.clarity}</Text>
                        </TextItem>}
                        {offer.origin &&
                        <TextItem>
                            <Text weight={"400"}><b>Origin:</b> {offer.origin}</Text>
                        </TextItem>}
                        {offer.quantity &&
                        <TextItem>
                            <Text weight={"400"}><b>Quantity:</b> {offer.quantity}</Text>
                        </TextItem>}
                        {offer.treatment && 
                        <TextItem>
                            <Text weight={"400"}><b>Processing:</b> {offer.treatment}</Text>
                        </TextItem>}
                        {offer.weigth && 
                        <TextItem>
                            <Text weight={"400"}><b>Weigth:</b> {offer.weigth}</Text>
                        </TextItem>}
                        {offer.shapes &&
                        <>
                            <TextItem>
                                <Text weight={"400"}><b>Shapes:</b></Text>
                            </TextItem>
                            {offer.shapes.map((item, index) => (
                                <div key={index} className={"d-flex flex-row mb-1 align-items-center"}>
                                    <img style={{width:"16px",height:"17px"}} src={API.baseUrl + item.image} alt="shape_img"/>
                                    <Text weight={"400"} marginLeft={"9px"}>{item.name}</Text>
                                </div>
                            ))}
                        </>}
                    </div>
                    <div className={"flex-grow-1 w-50"}>
                        {offer.price &&
                        <TextItem>
                            <Text weight={"400"}><b>Price:</b> {offer.price}</Text>
                        </TextItem>}
                        {offer.price_in_carats &&
                        <TextItem>
                            <Text weight={"400"}><b>Price in carats:</b> {offer.price_in_carats}</Text>
                        </TextItem>}
                        {buyer &&
                        <TextItem>
                            <Text weight={"400"}><b>Buyer:</b>&nbsp;</Text>
                            <Text weight={"400"} textDecoration={"underline"}>{buyer.name} {buyer.surname}</Text>
                        </TextItem>}
                        {offer.city &&
                        <TextItem>
                            <Text weight={"400"}><b>Gem location:</b> {offer.city}</Text>
                        </TextItem>}
                    </div>
                </Inner>
                {offer.buyer_description &&
                <TextItem>
                    <Text weight={"400"} textAlign={"justify"}><b>Description:</b> {offer.buyer_description}</Text>
                </TextItem>}
                {offer.message &&
                <TextItem>
                    <Text weight={"400"} textAlign={"justify"}><b>Message:</b> {offer.message}</Text>
                </TextItem>}
                {offer.certificate &&
                <>
                    <TextItem>
                        <Text weight={"400"} textAlign={"justify"}><b>Certificate:</b></Text>
                    </TextItem>
                    <ImageConatiner>
                        <Image src={offer.certificate.startsWith('data:') ? offer.certificate : API.baseUrl + offer.certificate}/>
                    </ImageConatiner>
                </>}
                {offer.photos.length > 0 &&
                <>
                    <TextItem>
                        <Text weight={"400"} textAlign={"justify"}><b>Photos:</b></Text>
                    </TextItem>
                    <ImageConatiner>
                        {offer.photos.map((item, index) => <Image key={index} src={item.photo.startsWith('data:') ? item.photo : API.baseUrl + item.photo}/>)}
                    </ImageConatiner>
                </>}
                <Button onClick={() => setEdit()}>Edit</Button>
            </Container>
            <BottomBlock>
                <RequestHeader>{offer.application.gemstone.name}, {offer.application.color}{offer.application.price_in_carats_from ? `, ${offer.application.price_in_carats_from} - ${offer.application.price_in_carats_from} ct` : ''}</RequestHeader>
                <RequestSubHeader>Close: {date.getDate()} {Months[date.getMonth()].slice(0, 3)} {date.getFullYear()} {date.getHours()}:{date.getMinutes().toString().length === 2 ? date.getMinutes() : '0' + date.getMinutes().toString()}</RequestSubHeader>
            </BottomBlock>
        </>
    )   
}

export default OfferBodyNotEdit;