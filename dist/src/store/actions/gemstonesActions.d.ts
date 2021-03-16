import { ADD_GEMSTONE, ADD_SHAPE, GET_GEMSTONES_LIST, GET_SHAPES_LIST, UPDATE_GEMSTONE, DELETE_SHAPE, DELETE_GEMSTONE } from "../../constants/actionTypes";
import { IBasePostRequest, IBaseGetRequestAction, IBasePutRequest, IBaseDeleteRequestAction } from "../../constants/types/interfaces/actionsInterfaces";
import { IShape } from "../../constants/types/interfaces/commonInterfaces";
export declare const getGemstonesListAction: () => IBaseGetRequestAction<typeof GET_GEMSTONES_LIST>;
export declare const getShapesListAction: () => IBaseGetRequestAction<typeof GET_SHAPES_LIST>;
export declare const changeShapeOrderAction: (shapesList: IShape[]) => {
    type: string;
    shapesList: IShape[];
};
export declare const addShapeAction: (shape: FormData) => IBasePostRequest<typeof ADD_SHAPE>;
export declare const deleteShapeAction: (id: number) => IBaseDeleteRequestAction<"DELETE_SHAPE", {
    id: number;
}>;
export declare const addGemstoneAction: () => IBasePostRequest<typeof ADD_GEMSTONE, {
    name: string;
}>;
export declare const deleteGemstoneAction: (id: number) => IBaseDeleteRequestAction<"DELETE_GEMSTONE", {
    id: number;
}>;
export declare const updateGemstoneAction: (gemstone: FormData) => IBasePutRequest<typeof UPDATE_GEMSTONE>;
