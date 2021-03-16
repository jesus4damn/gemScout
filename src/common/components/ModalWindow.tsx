import React from "react";
import {Modal} from "react-bootstrap";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Dispatch} from "redux";
import {closeModalAction} from "../../store/actions/modalWindowActions";
import styled from "styled-components";

const connector = connect(
    (state: RootState) => ({
        show: state.modalWindow.isShow,
        body: state.modalWindow.modalBody,
        title: state.modalWindow.title,
        parameters: state.modalWindow.parameters,
        withBtn: state.modalWindow.haveCloseBtn,
        bodyWidth: state.modalWindow.bodyWidth
    }),
    (dispatch: Dispatch) => ({
        closeModal() {
            dispatch(closeModalAction())
        }
    })
);

const CustomModal = styled(Modal)<{width: string}>`
    & > .modal-dialog {
        justify-content: center;
        & > .modal-content {
            border-radius: 10px;
            width: ${({width}) => width};
            & > .modal-body {
                border-radius: 10px;
                width: ${({width}) => width};
            }
        };
    }; 
`;

function ModalWindow({body: Component, ...props}: ConnectedProps<typeof connector>) {
    if (!Component) return <></>
    return (
        <CustomModal
            show={props.show}
            onHide={props.closeModal}
            centered
            width={props.bodyWidth}
        >
            {
                props.withBtn && (<Modal.Header closeButton>
                    {props.title && <Modal.Title>{props.title}</Modal.Title>}
                </Modal.Header>)
            }
            <Modal.Body className="p-0">
                <Component {...props.parameters}/>
            </Modal.Body>
        </CustomModal>
    )
}


export default connector(React.memo(ModalWindow));