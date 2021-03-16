import React, {useRef} from "react";
import styled from "styled-components";
import {Wrapper} from "../../common/styledComponents/wrappers";
import {API} from "../../constants/api/api";
import {DropIcon} from "../../assets/svgIcons/dropIcon";
import {TrashIcon} from "../../assets/svgIcons/trashIcon";
import { useDrag, useDrop} from 'react-dnd';
import {IShape} from "../../constants/types/interfaces/commonInterfaces";

const ShapeWrapper = styled(Wrapper)<{opacity: number}>`
    display: flex;
    font-weight: 600;
    font-size: 16px;
    cursor: move;
    width: 100%;
    height:60px;
    opacity: ${({opacity}) => opacity};
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    img {
        width: 39px;
        height: 34px;
        margin-right: 13px;
    };
`;

interface IShapeProps {
    index: number,
    shape: IShape,
    moveShape: (dragIndex: number, hoverIndex: number) => void,
    deleteShape: (id: number) => void
}

const Shape = ({index, shape: {id, name, image}, moveShape, deleteShape}: IShapeProps) => {
    const ref = useRef<any>(null);

    const [, drop] = useDrop({
        accept: 'shape',
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveShape(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'shape', id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;
    drag(drop(ref));

    return (
        <ShapeWrapper opacity={opacity} ref={ref} padding="0px 9px 0px 12px">
            <div>
                <DropIcon />
                <img style={{marginLeft:"15px"}} src={API.baseUrl + image} alt="shape_img"/>
                <span>{name}</span>
            </div>
            <div style={{cursor:"pointer"}} onClick={() => deleteShape(id)}>
                <TrashIcon />
            </div>
        </ShapeWrapper>
    )
}

export default Shape;