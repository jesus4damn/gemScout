import React, {useEffect, useCallback} from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Shape from "./Shape";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Dispatch} from "redux";
import {changeShapeOrderAction, getShapesListAction} from "../../store/actions/gemstonesActions";
import GemstoneButtons from "./GemstoneButtons";
import {IShape} from "../../constants/types/interfaces/commonInterfaces";

const connector = connect(
    (state: RootState) => ({
        shapesList: state.gemstones.shapesList
    }),
    (dispatch: Dispatch) => ({
        getShapesList() {
            dispatch(getShapesListAction())
        },
        changeShapesOrder(list: IShape[]) {
            dispatch(changeShapeOrderAction(list))
        }
    })
)

const ShapesDND = ({
                       getShapesList,
                       shapesList,
                       changeShapesOrder,
                       openAddingShape,
                       deleteShape
}: ConnectedProps<typeof connector> & {openAddingShape: () => void, deleteShape: (id:number) => void}) => {

    useEffect(() => getShapesList(), []);

    const moveShape = useCallback((dragIndex: number, hoverIndex: number) => {
        const array = [...shapesList];
        const [dragShape] = array.splice(dragIndex, 1);
        array.splice(hoverIndex, 0, dragShape);

        changeShapesOrder([...array]);
    }, [shapesList]);

    if (!shapesList.length) {
        return (
            <GemstoneButtons openAddingShape={openAddingShape} isRowDirection={false} />
        )
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {
                shapesList.map((shape: IShape, index: number) => (
                    <Shape key={shape.id} index={index} shape={shape} moveShape={moveShape} deleteShape={deleteShape} />
                ))
            }
        </DndProvider>
    )
}

export default connector(ShapesDND);