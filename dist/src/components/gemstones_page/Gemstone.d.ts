/// <reference types="react" />
import { IGemstone } from "../../constants/types/interfaces/commonInterfaces";
export interface IFeature {
    readonly id: number;
    meanings: string[];
    field: number;
    type: number;
}
export interface IAccordionForm {
    readonly id: number;
    name: string;
    is_important: boolean;
    image: File | string;
    _image: string;
    features: string[];
    types: string[];
    meanings: string[][];
    change: string;
}
declare const _default: import("react-redux").ConnectedComponent<({ gem, updateGemstone, deleteGemstome }: {
    gem: IGemstone;
    deleteGemstome: (id: number) => void;
} & {
    updateGemstone(gemstone: FormData): void;
}) => JSX.Element, Pick<{
    gem: IGemstone;
    deleteGemstome: (id: number) => void;
} & {
    updateGemstone(gemstone: FormData): void;
}, "gem" | "deleteGemstome">>;
export default _default;
