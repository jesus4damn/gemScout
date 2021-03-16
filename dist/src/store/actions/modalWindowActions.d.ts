import { Component, ModalWindowAction } from "../../constants/types/types";
export declare const closeModalAction: () => ModalWindowAction;
export declare const openModalAction: (modalBody: Component, bodyWidth: string, parameters?: {}, title?: null, withBtn?: boolean) => ModalWindowAction;
