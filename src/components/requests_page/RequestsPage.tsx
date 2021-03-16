import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { ArrowLeft } from "../../assets/svgIcons/arrovLeft";
import RequestsRightMenu from "./RequestsRightMenu";
import {RequestsPages} from "../../constants/types/types";
import { IGemstone, IRequest, IShape, IUser } from "../../constants/types/interfaces/commonInterfaces";
import Active from "./Active";
import { PageWrapper } from "../../common/styledComponents/wrappers";
import ListFilter from "./ListFilter";
import { API } from "../../constants/api/api";
import Popup from "../gemstones_page/Popup";
import { useDispatch } from "react-redux";


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

const RequestsPage: React.FC<any> = ({user}:{user: IUser}) => {
    const [page, setPage] = useState(RequestsPages['Active']);
    const [loading, setLoading] = useState<boolean>(false);
    const [gems, setGems] = useState<IGemstone[]>([]);
    const [shapes, setShapes] = useState<IShape[]>([]);
    const [deleteRequest, setDeleteRequest] = useState<number | null>(null);

    const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
    const [requests, setRequests] = useState<IRequest[]>([]);

    const wrapperRef = useRef<HTMLTableElement>(null);
    const scrollRef = useRef<HTMLTableElement>(null);

    const [currentPage, setCurrentPage] = useState<number | null>(1);

    const [searchData, setSearchData] = useState<{weigthFrom:string,weigthTo:string,priceFrom:string,priceTo:string,caratFrom:string,caratTo:string,origin:string,shapes:string,gemstones:string,ordering:string}>({weigthFrom:"",weigthTo:"",priceFrom:"",priceTo:"",caratFrom:"",caratTo:"",origin:"",shapes:"",gemstones:"",ordering:""})


    async function loadDataRequest(weigthFrom: string = '', weigthTo: string = '', priceFrom: string = '', priceTo: string = '', caratFrom: string = '', caratTo: string = '', origin: string = '', shapes: string = '', gemstones: string = '', ordering: string = '', fromStart:boolean = true) {
        try{
            setSearchData({weigthFrom,weigthTo,priceFrom,priceTo,caratFrom,caratTo,origin,shapes,gemstones,ordering});
            setLoadingRequest(true);
            const response = await API.get(`/applications/?page=${currentPage}&is_active=${page === RequestsPages['Active']}&weigth_from=${weigthFrom}&weigth_to=${weigthTo}&price_from=${priceFrom}&price_to=${priceTo}&carat_from=${caratFrom}&carat_to=${caratTo}&gemstones=${gemstones}&shapes=${shapes}&origin=${origin}&ordering=${ordering}`);
            console.log("Requests", response.data);
            if(response.data.length === 0) {
                setCurrentPage(null);
            } else {
                if(currentPage === null){
                    setCurrentPage(2);
                } else {
                    setCurrentPage(currentPage + 1);
                }
            }
            setLoadingRequest(false);
            if(fromStart){
                setRequests(response.data);
            } else {
                setRequests([...requests,...response.data]);
            }
        } catch (err) {
            setLoadingRequest(false);
            console.log(err);
        }
    }

    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                const gemsResponse = await API.get(`/gems/list/`);
                console.log("Gemstone", gemsResponse.data);
                setGems(gemsResponse.data);

                const shapesResponse = await API.get(`/shapes/list/`);
                console.log("Shapes", shapesResponse.data);
                setShapes(shapesResponse.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        loadData();
    },[]);

    useEffect(() => {
        setCurrentPage(1);
        setRequests([]);
        loadDataRequest();
    },[page]);

    useEffect(() => {
        if(currentPage !== null && !loadingRequest && requests.length > 0 && scrollRef.current!.scrollHeight - scrollRef.current!.offsetHeight < 40){
            loadDataRequest(searchData.weigthFrom,searchData.weigthTo,searchData.priceFrom,searchData.priceTo,searchData.caratFrom,searchData.caratTo,searchData.origin,searchData.shapes,searchData.gemstones,searchData.ordering, false);
        }
    },[requests]);
    
    const onScroll = () => {
        if(currentPage !== null && !loadingRequest && wrapperRef.current!.getBoundingClientRect().bottom <= window.innerHeight){
            loadDataRequest(searchData.weigthFrom,searchData.weigthTo,searchData.priceFrom,searchData.priceTo,searchData.caratFrom,searchData.caratTo,searchData.origin,searchData.shapes,searchData.gemstones,searchData.ordering, false);
        }
    }

    return (
        <PageWrapper padding="29px 36px 57px 29px" ref={scrollRef} onScroll={onScroll}>
            <Inner ref={wrapperRef}>
                {!loading && <ListFilter setRequests={setRequests} setCurrentPage={setCurrentPage} loadDataRequest={loadDataRequest} gems={gems} active={page === RequestsPages['Active']} shapes={shapes}/>}
                <Content>
                    <Active loadingRequest={loadingRequest} requests={requests} setRequests={setRequests} deleteRequest={setDeleteRequest} gems={gems} shapes={shapes} loadingGems={loading} is_active={true} user={user} />
                    <RequestsRightMenu page={page} setPage={setPage} />
                </Content>
                <Popup 
                    isShow={deleteRequest} 
                    closePopup={() => setDeleteRequest(null)}
                    text={"Are you sure you want to delete this request?"}
                    action={async () => {
                        let response = await API.delete(`/admin/application/${deleteRequest}/delete/`);
                        setRequests(requests.filter((item) => item.id !== deleteRequest));
                    }} />
            </Inner>
        </PageWrapper>
    )
}

export default RequestsPage;