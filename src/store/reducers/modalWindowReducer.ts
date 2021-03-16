import {OPEN_MODAL, CLOSE_MODAL} from "../../constants/actionTypes";
import {IModalWindow} from "../../constants/types/interfaces/stateInterfaces";
import {ModalWindowAction} from "../../constants/types/types";

const initialState: IModalWindow = {
    isShow: false,
    modalBody: null,
    title: null,
    parameters: {},
    haveCloseBtn: false,
    bodyWidth: ''
};

export default function modalWindowReducer(
    state=initialState,
    action: ModalWindowAction
): IModalWindow {

    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isShow: true,
                modalBody: action.body,
                title: action.title,
                haveCloseBtn: action.withBtn,
                parameters: action.parameters,
                bodyWidth: action.bodyWidth
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isShow: false,
                modalBody: null,
                title: null,
                parameters: {},
                haveCloseBtn: false,
                bodyWidth: ''
            }
        default:
            return state;
    }
}
