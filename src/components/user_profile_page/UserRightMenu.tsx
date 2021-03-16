import React, {useState} from "react";
import styled from "styled-components";
import {UserPages} from "../../constants/types/types"


const Container = styled.div`
    width:266px;
    height:158px;
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

const UserRightMenu: React.FC<any> = ({page, setPage}: {page: number, setPage:(id:number) => void}) => {
    return (
        <Container>
            {page === UserPages['Profile'] ? 
            <ItemActive>
                <Text>Profile</Text>
            </ItemActive> :
            <Item onClick={() => setPage(UserPages['Profile'])}>
                <Text>Profile</Text>
            </Item>}
            {page === UserPages['Request'] ? 
            <ItemActive>
                <Text>Request</Text>
            </ItemActive> :
            <Item onClick={() => setPage(UserPages['Request'])}>
                <Text>Request</Text>
            </Item>}
            {page === UserPages['Offers'] ? 
            <ItemActive>
                <Text>Offers</Text>
            </ItemActive> :
            <Item onClick={() => setPage(UserPages['Offers'])}>
                <Text>Offers</Text>
            </Item>}
            {page === UserPages['Chats'] ? 
            <ItemActive>
                <Text>Chats</Text>
            </ItemActive> :
            <Item onClick={() => setPage(UserPages['Chats'])}>
                <Text>Chats</Text>
            </Item>}
        </Container>
    )
}

export default UserRightMenu;