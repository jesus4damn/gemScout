import React from "react";
import {BaseDarkButton} from "../../common/styledComponents/baseElements";
import styled from "styled-components";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {addGemstoneAction} from "../../store/actions/gemstonesActions";

const GemstoneBtn = styled(BaseDarkButton)<{isRow?: boolean}>`
    &:first-of-type {
        ${({isRow}) => isRow ? 'margin-right: 25px' : 'margin-bottom: 20px'}; 
    };
    letter-spacing: -0.41px;
`;

const connector = connect(
    null,
    (dispatch: Dispatch) => ({
        addGemstone() {
            dispatch(addGemstoneAction())
        }
    })
)

const GemstoneButtons = (
    {
        isRowDirection,
        openAddingShape,
        addGemstone
    }: {isRowDirection: boolean, openAddingShape: () => void} & ConnectedProps<typeof connector>) => (
    <>
        <GemstoneBtn
            isRow={isRowDirection}
            padding="14px 70px 16px"
            weight="bold"
            bRadius="31px"
            onClick={() => addGemstone()}
        >
            + Add a gemstone
        </GemstoneBtn>
        <GemstoneBtn
            padding="14px 84px 16px"
            weight="bold"
            bRadius="31px"
            onClick={() => openAddingShape()}
        >
            + Add a shape
        </GemstoneBtn>
    </>
)

export default connector(GemstoneButtons);