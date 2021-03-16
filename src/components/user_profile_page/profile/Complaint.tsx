import React from "react";
import styled from "styled-components";
import { API } from "../../../constants/api/api";
import { Months } from "../../../constants/types/types";


const Container = styled.div`
    position:relative;
    width:561px;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    padding:15px 22px 21px 15px;
    margin-top:9px;
    display:flex;
`;

const Contant = styled.div`
    flex-grow:1;
`;

const Buttons = styled.div`
    flex-basis:86px;
    flex-grow:0;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;

const Button = styled.div<{background:string}>`
    width:86px;
    height:30px;
    background: ${({background}) => background};
    border-radius: 21px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;

    font-style: regular;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;
`;

const Name = styled.p`
    font-style: Semibold;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    color: #000000;
    margin-bottom:2px;
`;

const Data = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 12px;
    line-height: 100%;
    color: rgba(0, 0, 0, 0.38);
    margin:0;
`;

const Text = styled.p`
    font-style: regular;
    font-weight: normal;
    font-size: 12px;
    line-height: 100%;
    color: #000000;
    margin:0;
    margin-top:14px;
    max-width:385px;
    padding-bottom:16px;
`;




const Complaint: React.FC<any> = ({id,changeComplaint, message, date, first_name, last_name, confirmed}:{id:number,changeComplaint:(bool:boolean, id:number) => void,message:string,date:Date,first_name:string,last_name:string, confirmed:boolean}) => {
    const accept = async () => {
        const response = await API.put(`/admin/user/complaints/${id}/apply/`,{});
        changeComplaint(true, id);
    }
    const decline = async () => {
        const response = await API.put(`/admin/user/complaints/${id}/discard/`,{});
        changeComplaint(false, id);
    }
    return (
        <Container>
            <Contant>
                <Name>{first_name} {last_name}</Name>
                <Data>{date.getDate()} {Months[date.getMonth()].slice(0, 3)} {date.getFullYear()} {date.getHours()}:{date.getMinutes()}</Data>
                <Text>{message}</Text>
            </Contant>
            <Buttons>
                {(confirmed === null || confirmed === true) && <Button onClick={() => decline()} background={"#B9BCCA"}>Decline</Button>}
                {(confirmed === null || confirmed === false) && <Button onClick={() => accept()} background={"#1B1D28"}>Accept</Button>}
            </Buttons>
        </Container>
    )
}

export default Complaint;