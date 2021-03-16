/// <reference types="react" />
import { IGemstone, IShape } from "../../constants/types/interfaces/commonInterfaces";
declare const ListFilter: ({ setRequests, gems, shapes, active, loadDataRequest, setCurrentPage }: {
    setRequests: any;
    gems: IGemstone[];
    shapes: IShape[];
    active: boolean;
    loadDataRequest: any;
    setCurrentPage: (number: number) => void;
}) => JSX.Element;
export default ListFilter;
