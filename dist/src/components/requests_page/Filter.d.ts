/// <reference types="react" />
import { IGemstone, IShape } from "../../constants/types/interfaces/commonInterfaces";
declare const Filter: ({ setRequests, setFieldValue, resetForm, shapesState, gemsState, gems, shapes, isOpen, loadDataRequest, toggleFilter, setCurrentPage }: {
    setRequests: any;
    toggleFilter: any;
    setCurrentPage: any;
    resetForm: any;
    setFieldValue: (str: string, val: any) => void;
    shapesState: {
        id: number;
        name: string;
        bool: boolean;
    }[];
    loadDataRequest: any;
    gemsState: {
        id: number;
        name: string;
        bool: boolean;
    }[];
    gems: IGemstone[];
    shapes: IShape[];
    isOpen: boolean;
}) => JSX.Element;
export default Filter;
