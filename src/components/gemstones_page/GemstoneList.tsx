import React, {useState, useEffect} from "react";
import {PageWrapper, ColWrapper} from "../../common/styledComponents/wrappers";
import Gemstone from "./Gemstone";
import styled from "styled-components";
import ShapesDND from "./ShapesDND";
import AddShape from "./AddShape";
import GemstoneButtons from "./GemstoneButtons";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Dispatch} from "redux";
import {deleteGemstoneAction, deleteShapeAction, getGemstonesListAction} from "../../store/actions/gemstonesActions";
import {IGemstone} from "../../constants/types/interfaces/commonInterfaces";
import Popup from "./Popup";

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: calc(100% - 815px);
    max-width:300px;
`;


const Inner = styled.div`
    width:100%;
    min-width:1100px;
    margin-bottom:16px;
`;

const Div = styled.div`
    width:100%;
    height:100px;
    background:green;
`;

const connector = connect(
    (state: RootState) => ({
        gemstonesList: state.gemstones.gemstonesList,
        shapesListLength: state.gemstones.shapesList.length,
    }),
    (dispatch: Dispatch) => ({
        getGemstonesList() {
            dispatch(getGemstonesListAction())
        }
    })
)

const GemstonesList = ({getGemstonesList, gemstonesList, shapesListLength}: ConnectedProps<typeof connector>) => {
    const [isAddingShapeOpen, toggleAddingShape] = useState(false);
    const [deleteShape, toggleDeleteShape] = useState<number | null>(null);
    const [deleteGemstone, toggleDeleteGemstone] = useState<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => getGemstonesList(), []);

    return (
        <PageWrapper padding="40px 29px 0px">
            <Inner>
                <div className="d-flex" style={{marginBottom: '19px', justifyContent:"space-between"}}>
                    <ColWrapper width="815px" marginRight="25px">
                        {
                            gemstonesList.map((gem: IGemstone) => <Gemstone key={gem.id} gem={gem} deleteGemstome={(id:number) => toggleDeleteGemstone(id)} />)
                        }
                    </ColWrapper>
                    <ColumnContainer>
                        <ShapesDND openAddingShape={() => toggleAddingShape(true)} deleteShape={(id:number) => toggleDeleteShape(id)}  />
                    </ColumnContainer>
                </div>
                {
                    shapesListLength !== 0 && (<div className="d-flex justify-content-end p-0">
                                <GemstoneButtons openAddingShape={() => toggleAddingShape(true)} isRowDirection={true}/>
                            </div>)
                }
                <AddShape isShow={isAddingShapeOpen} closeAddShape={toggleAddingShape} />
                <Popup 
                    isShow={deleteShape} 
                    closePopup={() => toggleDeleteShape(null)}
                    text={"If you delete a shape, then all related applications will also be deleted. Do you want to continue?"}
                    action={() => dispatch(deleteShapeAction(deleteShape!))} />
                <Popup 
                    isShow={deleteGemstone} 
                    closePopup={() => toggleDeleteGemstone(null)}
                    text={"If you delete a stone, then all related applications will also be deleted. Do you want to continue?"}
                    action={() => dispatch(deleteGemstoneAction(deleteGemstone!))} />
            </Inner>
        </PageWrapper>
    )
}

export default connector(React.memo(GemstonesList, (prevProps, nextProps) => {
    return prevProps.shapesListLength === nextProps.shapesListLength &&
        prevProps.gemstonesList.length === nextProps.gemstonesList.length;
}));