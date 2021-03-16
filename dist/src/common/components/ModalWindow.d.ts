import React from "react";
import { ConnectedProps } from "react-redux";
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    show: boolean;
    body: typeof React.Component | React.FC<{}> | null;
    title: string | null;
    parameters: {} | {
        [key: string]: any;
    };
    withBtn: boolean;
    bodyWidth: string;
} & {
    closeModal(): void;
}, {}>;
declare function ModalWindow({ body: Component, ...props }: ConnectedProps<typeof connector>): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<React.MemoExoticComponent<typeof ModalWindow>, Pick<{
    show: boolean;
    body: typeof React.Component | React.FC<{}> | null;
    title: string | null;
    parameters: {} | {
        [key: string]: any;
    };
    withBtn: boolean;
    bodyWidth: string;
} & {
    closeModal(): void;
}, never>>;
export default _default;
