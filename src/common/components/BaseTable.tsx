import React, { Ref, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {Table} from "react-bootstrap";
import {Thead} from "../styledComponents/table";
import {Component} from "../../constants/types/types";
import {LoaderIcon} from "../../assets/svgIcons/loaderIcon";

const TableWrapper = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 100%;
    overflow: auto;
    max-height: 745px;
    padding: 6px;
    flex-grow: 1;
    text-align:center;
    table {
        border-color: #ECEEEF;
        border-width: 1px;
        td {
            vertical-align: middle;
            border-top: 1px solid #ECEEEF;
        }
        th {
            border-top: none;
            border-bottom: 1px solid #ECEEEF;
        }
    };
`;

const Tbody = styled.tbody`
    font-size: 13px;
    line-height: 16px;
    td {
       align-items: center;
    };
`;

interface IBaseTable {
   children: React.ReactNode,
   list: any[],
   listItem: Component,
   toUser?: () => void,
   setUser?: (value:any) => void,
   action: (loadingFalse:() => void, loadingTrue:() => void) => void
   onMount: (loadingFalse:() => void) => void,
   currentPage: number | null,
   functionLoadingSet?: (func:(bool:boolean) => void) => void
}

const BaseTable = ({children, list, listItem: Component, toUser, setUser, action, onMount, currentPage, functionLoadingSet}: IBaseTable) => {
    const wrapperRef = useRef<HTMLTableElement>(null);
    const scrollRef = useRef<HTMLTableElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingFilter, setLoadingFilter] = useState<boolean>(false);

    useEffect(() => {
        currentPage !== null && setLoading(true);
        currentPage !== null && onMount(() => setLoading(false));
        functionLoadingSet && functionLoadingSet((bool:boolean) => setLoadingFilter(bool));
    },[]);

    useEffect(() => {
        if(list.length > 0 && scrollRef.current!.scrollHeight - scrollRef.current!.offsetHeight < 40){
            action(() => setLoading(false), () => setLoading(true));
        }
    },[list]);
    
    const onScroll = () => {
        if(!loading && wrapperRef.current!.getBoundingClientRect().bottom <= window.innerHeight){
            action(() => setLoading(false), () => setLoading(true));
        }
    }

    return (<TableWrapper ref={scrollRef} onScroll={onScroll}>
                <Table ref={wrapperRef}>
                    <Thead>
                        <tr>
                            {children}
                        </tr>
                    </Thead>
                    <Tbody>
                        {
                            !loadingFilter &&
                            list.map(item => <Component setUser={setUser} toUser={toUser} key={item.mobile || item.mobile_id} listItem={item} />)
                        }
                    </Tbody>
                </Table>
                {(loading || loadingFilter) &&
                <LoaderIcon width={"50px"} height={"50px"} />}
            </TableWrapper>);
};

export default BaseTable;