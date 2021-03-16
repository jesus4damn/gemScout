/// <reference types="react" />
import { IShape } from "../../constants/types/interfaces/commonInterfaces";
declare const _default: import("react-redux").ConnectedComponent<({ getShapesList, shapesList, changeShapesOrder, openAddingShape, deleteShape }: {
    shapesList: IShape[];
} & {
    getShapesList(): void;
    changeShapesOrder(list: IShape[]): void;
} & {
    openAddingShape: () => void;
    deleteShape: (id: number) => void;
}) => JSX.Element, Pick<{
    shapesList: IShape[];
} & {
    getShapesList(): void;
    changeShapesOrder(list: IShape[]): void;
} & {
    openAddingShape: () => void;
    deleteShape: (id: number) => void;
}, "deleteShape" | "openAddingShape">>;
export default _default;
