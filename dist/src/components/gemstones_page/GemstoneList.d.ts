import React from "react";
import { IGemstone } from "../../constants/types/interfaces/commonInterfaces";
declare const _default: import("react-redux").ConnectedComponent<React.MemoExoticComponent<({ getGemstonesList, gemstonesList, shapesListLength }: {
    gemstonesList: IGemstone[];
    shapesListLength: number;
} & {
    getGemstonesList(): void;
}) => JSX.Element>, Pick<{
    gemstonesList: IGemstone[];
    shapesListLength: number;
} & {
    getGemstonesList(): void;
}, never>>;
export default _default;
