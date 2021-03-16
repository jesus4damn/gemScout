import React from "react";
import {CLOSE_MODAL, OPEN_MODAL} from "../../constants/actionTypes";
import {Component, ModalWindowAction} from "../../constants/types/types";

export const closeModalAction = (): ModalWindowAction => {
    return {
        type: CLOSE_MODAL
    }
}

export const openModalAction = (
    modalBody: Component,
    bodyWidth: string,
    parameters={},
    title=null,
    withBtn=false,
): ModalWindowAction => {
    return {
        type: OPEN_MODAL,
        body: modalBody,
        title: title,
        parameters: parameters,
        withBtn: withBtn,
        bodyWidth: bodyWidth
    }
}