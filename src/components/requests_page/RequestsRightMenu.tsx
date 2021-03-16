import React, {useState} from "react";
import styled from "styled-components";
import {RequestsPages} from "../../constants/types/types"


const Container = styled.div`
    width:266px;
    height:86px;
    background: #FFFFFF;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    border-radius: 13px;
    flex-shrink:0;
    flex-grow:0;
    padding-top:8px;
    padding-bottom:8px;
    overflow:hidden;
`;

const Item = styled.div`
    width:100%;
    height:36px;
    padding-left:24px;
    cursor:pointer;
    &:hover {
        background:#F2F4F8;
    }
`;

const ItemActive = styled.div`
    width:100%;
    height:36px;
    padding-left:19px;
    cursor:pointer;
    background:#F2F4F8;
    border-left: 5px solid #3D404E;
`;


const Text = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 36px;
    color: #1B1D28;
`;

const RequestsRightMenu: React.FC<any> = ({page, setPage}: {page: number, setPage:(id:number) => void}) => {
    return (
        <Container>
            {page === RequestsPages['Active'] ? 
            <ItemActive>
                <Text>Active</Text>
            </ItemActive> :
            <Item onClick={() => setPage(RequestsPages['Active'])}>
                <Text>Active</Text>
            </Item>}
            {page === RequestsPages['Archived'] ? 
            <ItemActive>
                <Text>Archived</Text>
            </ItemActive> :
            <Item onClick={() => setPage(RequestsPages['Archived'])}>
                <Text>Archived</Text>
            </Item>}
        </Container>
    )
}

export default RequestsRightMenu;