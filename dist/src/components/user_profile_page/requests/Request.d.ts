/// <reference types="react" />
import { IGemstone, IRequest, IShape } from "../../../constants/types/interfaces/commonInterfaces";
declare const Request: ({ request, gems, shapes, deleteRequest, changeRequest }: {
    request: IRequest;
    gems: IGemstone[];
    shapes: IShape[];
    deleteRequest: (id: number) => void;
    changeRequest: (id: number, request: IRequest) => void;
}) => JSX.Element;
export default Request;
