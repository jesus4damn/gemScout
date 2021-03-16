/// <reference types="react" />
import { IGemstone, IOffer, IShape } from "../../../constants/types/interfaces/commonInterfaces";
declare const Offer: ({ offer, shapes, gems, changeOffer, deleteOffer }: {
    offer: IOffer;
    shapes: IShape[];
    gems: IGemstone[];
    deleteOffer: (id: number) => void;
    changeOffer: (id: number, request: IOffer) => void;
}) => JSX.Element;
export default Offer;
