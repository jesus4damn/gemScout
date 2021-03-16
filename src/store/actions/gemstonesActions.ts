import {BASE_POST_REQUEST, BASE_GET_REQUEST, BASE_PUT_REQUEST, BASE_DELETE_REQUEST} from "../../constants/sagasTypes";
import {
    ADD_GEMSTONE,
    ADD_SHAPE,
    CHANGE_SHAPES_ORDER,
    GET_GEMSTONES_LIST,
    GET_SHAPES_LIST, UPDATE_GEMSTONE, DELETE_SHAPE, DELETE_GEMSTONE
} from "../../constants/actionTypes";
import {IBasePostRequest, IBaseGetRequestAction, IBasePutRequest, IBaseDeleteRequestAction} from "../../constants/types/interfaces/actionsInterfaces";
import {IGemstone, IShape} from "../../constants/types/interfaces/commonInterfaces";

export const getGemstonesListAction = (): IBaseGetRequestAction<typeof GET_GEMSTONES_LIST> => {
    return {
        type: BASE_GET_REQUEST,
        path: '/gems/list/',
        actionType: GET_GEMSTONES_LIST,
        actionDataName: 'gemstonesList'
    }
}

export const getShapesListAction = (): IBaseGetRequestAction<typeof GET_SHAPES_LIST> => {
    return {
        type: BASE_GET_REQUEST,
        path: '/shapes/list/',
        actionType: GET_SHAPES_LIST,
        actionDataName: 'shapesList'
    }
}

export const changeShapeOrderAction = (shapesList: IShape[]) => {
    return {
        type: CHANGE_SHAPES_ORDER,
        shapesList: shapesList
    }
}

export const addShapeAction = (shape: FormData): IBasePostRequest<typeof ADD_SHAPE> => {
    return {
        type: BASE_POST_REQUEST,
        actionType: ADD_SHAPE,
        actionDataName: 'newShape',
        path: '/admin/shapes/add/',
        data: shape
    }
}

export const deleteShapeAction = (id: number): IBaseDeleteRequestAction<typeof DELETE_SHAPE, {id: number}> => {
    return {
        type: BASE_DELETE_REQUEST,
        actionType: DELETE_SHAPE,
        actionDataName: 'id',
        path: `/admin/shapes/delete/${id}/`,
        data: {id}
    }
}

export const addGemstoneAction = (): IBasePostRequest<typeof ADD_GEMSTONE, {name: string}> => {
    return {
        type: BASE_POST_REQUEST,
        actionType: ADD_GEMSTONE,
        actionDataName: 'newGemstone',
        path: '/admin/gems/add/',
        data: {name: 'Stone'}
    }
}

export const deleteGemstoneAction = (id: number): IBaseDeleteRequestAction<typeof DELETE_GEMSTONE, {id: number}> => {
    return {
        type: BASE_DELETE_REQUEST,
        actionType: DELETE_GEMSTONE,
        actionDataName: 'id',
        path: `/admin/gems/delete/${id}/`,
        data: {id}
    }
}

export const updateGemstoneAction = (gemstone: FormData): IBasePutRequest<typeof UPDATE_GEMSTONE> => {
    return {
        type: BASE_PUT_REQUEST,
        actionType: UPDATE_GEMSTONE,
        actionDataName: 'gemstonesList',
        path: '/admin/gems/change/',
        data: gemstone,
        reducerName: 'gemstones',
        listName: 'gemstonesList'
    }
}