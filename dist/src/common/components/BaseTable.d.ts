import React from "react";
import { Component } from "../../constants/types/types";
interface IBaseTable {
    children: React.ReactNode;
    list: any[];
    listItem: Component;
    toUser?: () => void;
    setUser?: (value: any) => void;
    action: (loadingFalse: () => void, loadingTrue: () => void) => void;
    onMount: (loadingFalse: () => void) => void;
    currentPage: number | null;
    functionLoadingSet?: (func: (bool: boolean) => void) => void;
}
declare const BaseTable: ({ children, list, listItem: Component, toUser, setUser, action, onMount, currentPage, functionLoadingSet }: IBaseTable) => JSX.Element;
export default BaseTable;
