import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "react-google-charts";
import { LoaderIcon } from "../../assets/svgIcons/loaderIcon";
 

const Container = styled.div`
    position:relative;
    width:100%;
    height: 450px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(169, 170, 194, 0.5);
    border-radius: 7px;
    margin-bottom:64px;
    padding-top:24px;
    padding-left:24px;
    padding-right:29px;
    padding-bottom:15px;
`;

const Header = styled.p`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
`;

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


const ChartSystem = ({info, chartButton}: {info:any, chartButton:number}) => {
    const [chartData, setChartData] = useState<(string | number)[][]>([]);

    const setYearChart = () => {
        let date = new Date().getMonth();
        let year = new Date().getFullYear();
        let sortMonths: (string | number)[][] = [];
        for(let i = 0; i < 12; i++){
            let statistic = 0;
            Object.entries(info).forEach(([key, value]) => {
                let currentMonth = new Date(key).getMonth();
                let currentYear = new Date(key).getFullYear();
                if(currentMonth === date && currentYear === year) statistic += value as any;
            })
            sortMonths.unshift([months[date],statistic]);
            date--;
            if(date === -1) date = 11;
        }
        sortMonths.unshift(['Year', 'Count']);
        setChartData(sortMonths);
    }

    const setMonthChart = () => {
        let date = new Date();
        let sortDays: (string | number)[][] = [];
        for(let i = 0; i < 30; i++){
            let statistic = 0;
            Object.entries(info).forEach(([key, value]) => {
                let currentDay = new Date(key).getDate();
                let currentMonth = new Date(key).getMonth();
                let currentYear = new Date(key).getFullYear();
                if(currentDay === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) statistic += value as any;
            })
            sortDays.unshift([(date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString()) + "." + (date.getMonth() > 8 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString()),statistic]);
            date.setDate(date.getDate()-1);
        }
        sortDays.unshift(['Month', 'Count']);
        setChartData(sortDays);
    }
    useEffect(() => {
        chartButton === 0 && setYearChart();
        chartButton === 1 && setMonthChart();
    },[chartButton]);
    return (
        <Container>
            <Header>New requests</Header>
            <Chart
                width={"100%"}
                height={'350px'}
                chartType="LineChart"
                loader={<LoaderIcon width={"50px"} height={"50px"} />}
                data={chartData}
                options={{
                    vAxis: { minValue: 0, format: '0'},
                    chartArea: { width: '90%', height: '80%' },
                    colors:["#FFA800"],
                    legend: {position: 'none'}
                }}
            />
        </Container>
    )
}

export default ChartSystem;