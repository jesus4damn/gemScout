import {IGemstones} from "../../constants/types/interfaces/stateInterfaces";
import {
    ADD_GEMSTONE,
    ADD_SHAPE,
    CHANGE_SHAPES_ORDER,
    DELETE_GEMSTONE,
    DELETE_SHAPE,
    GET_GEMSTONES_LIST,
    GET_SHAPES_LIST, UPDATE_GEMSTONE
} from "../../constants/actionTypes";
import {GemstonesActions} from "../../constants/types/types";

const initialState: IGemstones = {
    gemstonesList: [],
    shapesList: [],
};


export default function gemstonesReducer(
    state=initialState,
    action: GemstonesActions
): IGemstones {
    switch (action.type) {
        case GET_GEMSTONES_LIST:
        case UPDATE_GEMSTONE:
            return {
                ...state,
                gemstonesList: [...action.gemstonesList.sort((a,b) => {
                    let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                })]
            }
        case GET_SHAPES_LIST:
        case CHANGE_SHAPES_ORDER:
            return {
                ...state,
                shapesList: [...action.shapesList.sort((a,b) => {
                    let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                })]
            }
        case ADD_SHAPE:
            return {
                ...state,
                shapesList: [...state.shapesList, action.newShape]
            }
        case DELETE_SHAPE:
            return {
                ...state,
                shapesList: [...state.shapesList.filter((item: any) => action.id !== item.id)]
            }
        case ADD_GEMSTONE:
            return {
                ...state,
                gemstonesList: [...state.gemstonesList, action.newGemstone]
            }
        case DELETE_GEMSTONE:
                return {
                    ...state,
                    gemstonesList: [...state.gemstonesList.filter((item: any) => action.id !== item.id)]
                }
        default:
            return state;
    }
}