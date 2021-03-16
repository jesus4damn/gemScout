import React, {useState, useEffect} from "react";
import {PageWrapper} from "../../common/styledComponents/wrappers";
import styled from "styled-components";
import { BaseDarkButton } from "../../common/styledComponents/baseElements";
import Page from "./Page";
import { API } from "../../constants/api/api";
import Popup from "../gemstones_page/Popup";



const Inner = styled.div`
    width:100%;
    min-width:1100px;
    margin-bottom:16px;
`;
const AddPageBtn = styled(BaseDarkButton)`
    letter-spacing: -0.41px;
`;


interface IPage {
    id:number,
    name:string,
    text:string
}

const AddPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<IPage[]>([]);
    const [deletePage, setDeletePage] = useState<number | null>(null);
    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                const response = await API.get(`/faq/`);
                console.log("Pages",response.data);
                setPages(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        loadData();
    },[]);

    return (
        <PageWrapper padding="40px 29px 0px">
            <Inner>
                <div className={"d-flex justify-content-between"}>
                    <div style={{flexShrink:1, flexGrow:1, marginRight:"20px"}}>
                        {pages.map((item) => <Page setDeletePage={setDeletePage} key={item.id} name={item.name} text={item.text} id={item.id} />)}
                    </div>
                    <div style={{flexShrink:0, flexGrow:0}}>
                        <AddPageBtn
                            padding="14px 71px 16px"
                            weight="bold"
                            bRadius="31px"
                            onClick={async () => {
                                let response = await API.post(`/admin/faq/add/`,{name:"Новая страница", text:"Новыя страница"});
                                setPages([...pages,response.data]);
                            }}
                        >
                            + Add a new page
                        </AddPageBtn>
                    </div>
                </div>
                <Popup 
                    isShow={deletePage} 
                    closePopup={() => setDeletePage(null)}
                    text={"Are you sure you want to delete this page?"}
                    action={async () => {
                        let response = await API.delete(`/admin/faq/${deletePage}/delete/`);
                        setPages(pages.filter((item) => item.id !== deletePage));
                    }} />
            </Inner>
        </PageWrapper>
    )
}

export default AddPage;