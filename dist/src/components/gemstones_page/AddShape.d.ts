/// <reference types="react" />
export interface IAddShapeForm {
    name: string;
    image: File | string;
    _image: string;
}
interface IAddShapeProps {
    isShow: boolean;
    closeAddShape: (isOpen: boolean) => void;
}
declare const _default: import("react-redux").ConnectedComponent<({ isShow, closeAddShape, addShape }: IAddShapeProps & {
    addShape(shape: FormData): void;
}) => JSX.Element, Pick<IAddShapeProps & {
    addShape(shape: FormData): void;
}, "isShow" | "closeAddShape">>;
export default _default;
