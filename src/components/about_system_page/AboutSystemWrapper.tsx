import React, {useEffect, useState} from "react";
import {PageWrapper} from "../../common/styledComponents/wrappers";
import styled from "styled-components";
import {Title} from "../../common/styledComponents/baseElements";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {getSystemInfoAction} from "../../store/actions/systemInfoActions";
import {RootState} from "../../store/reducers/rootReducer";
import ChartSystem from "./ChartSystem";
import { API } from "../../constants/api/api";
import { ISystemInfo } from "../../constants/types/interfaces/stateInterfaces";
import { LoaderIcon } from "../../assets/svgIcons/loaderIcon";

const Row = styled.div<{marginTop?:string}>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: ${({marginTop}) => marginTop ? marginTop : "0px"};
`;

const BaseColumn = styled.div`
    background: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    height: 110px;
    flex-direction: column;
    color: #000000;
    .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
    };
    .data {
        font-weight: bold;
        font-size: 34px;
        line-height: 100%;
    }
`;

const BigColumn = styled(BaseColumn)`
    justify-content: space-between;
    width: 260px;
    padding: 14px 23px 20px 19px;
    margin-bottom: 37px;
    margin-right: 20px;
`;

const SmallColumn = styled(BaseColumn)`
    justify-content: center;
    align-items: center;
    width: 190px;
    padding: 22px 0 23px;
    margin-bottom: 33px;
    margin-right: 37px;
    .title {
        margin-bottom: 15px;
    };
`;

// export const PageWrapper = styled.div<{padding: string}>`
//     width: 100%;
//     display: flex;
//     position: relative;
//     flex-grow: 1;
//     box-sizing: border-box;
//     max-height: 100vh;
//     flex-direction: column;
//     overflow-y: auto;
//     padding: ${({padding}) => padding}
// `;

const ChartButtons = styled.div`
    width:100%;
    margin-bottom:17px;
    display:flex;
    justify-content:flex-end;
`;

const ActiveChartButton = styled.div`
    width:auto;
    height:38px;
    background: #1B1D28;
    border-radius: 6px;
    padding-left:10px;
    padding-right:10px;

    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    display:flex;
    justify-content:center;
    align-items:center;
    &:first-of-type {
        margin-right: 20px; 
    };
    cursor:pointer;
`;

const ChartButton = styled.div`
    width:auto;
    height:38px;
    background: #FFFFFF;
    border-radius: 6px;
    padding-left:10px;
    padding-right:10px;

    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #1B1D28;
    display:flex;
    justify-content:center;
    align-items:center;
    &:first-of-type {
        margin-right: 20px; 
    };
    cursor:pointer;
`;





const AboutSystemWrapper = ({}: {}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [infoPerDate, setInfoPerDate] = useState<any>(null);
    const [bigColumns, setBigColumns] = useState<{title:string,data:number}[] | null>(null);
    const [smallColumns, setSmallColumns] = useState<any[] | null>(null);
    const [chartButton, setChartButton] = useState<number>(0);

    
    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                const response = await API.get(`/admin/amount/`);
                console.log("Info", response);
                setInfoPerDate(response.data.new_applications_per_date);
                setBigColumns([
                    {title: 'System users', data: response.data.users},
                    {title: 'Number of users today', data: response.data.new_users},
                    {title: 'Users were online', data: response.data.users_were_online},
                    {title: 'Number of messages', data: response.data.complaints},
                    {title: 'Total number of new applications', data: response.data.applications},
                    {title: 'Seller applicetions', data: response.data.seller_applications}
                ]);
                setSmallColumns(response.data.gemstones);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        loadData();
    },[]);



    return (
        <PageWrapper padding="33px 36px 43px 27px">
            {loading ? <LoaderIcon width={"50px"} height={"50px"} /> :
            infoPerDate === null ?
            <>Что-то не так с сервером...(</>:
            <div className={"w-100"} style={{minWidth:"850px"}}>
                <ChartButtons>
                    {chartButton === 1 ? <ActiveChartButton>Month</ActiveChartButton> :  <ChartButton onClick={() => setChartButton(1)}>Month</ChartButton>}
                    {chartButton === 0 ? <ActiveChartButton>Year</ActiveChartButton> : <ChartButton onClick={() => setChartButton(0)}>Year</ChartButton>}
                </ChartButtons>
                {infoPerDate && <ChartSystem info={infoPerDate} chartButton={chartButton}/>}
                <Row>
                    {
                        bigColumns && bigColumns.map(column => (
                            <BigColumn key={column.title}>
                                <div className="title">{column.title}</div>
                                <div className="data">{column.data}</div>
                            </BigColumn>
                        ))
                    }
                </Row>
                <Title size="24px" fontWeight="500" marginBottom="20px">Number of new applications</Title>
                <Row marginTop={"20px"}>
                    {
                        smallColumns && smallColumns.map(column => (
                            <SmallColumn key={column.name}>
                                <div className="title">{column.name}</div>
                                <div className="data">{column.count}</div>
                            </SmallColumn>
                        ))
                    }
                </Row>
            </div>}
        </PageWrapper>
    )
}

export default AboutSystemWrapper;