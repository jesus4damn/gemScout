/// <reference types="react" />
import { IShape } from "../../constants/types/interfaces/commonInterfaces";
interface IShapeProps {
    index: number;
    shape: IShape;
    moveShape: (dragIndex: number, hoverIndex: number) => void;
    deleteShape: (id: number) => void;
}
declare const Shape: ({ index, shape: { id, name, image }, moveShape, deleteShape }: IShapeProps) => JSX.Element;
export default Shape;
