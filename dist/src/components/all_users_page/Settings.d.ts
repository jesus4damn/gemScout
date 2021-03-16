import React from "react";
export interface ISettingsForm {
    id: number;
    status: string;
    restrictions: number[];
}
export interface ISettingsFormik {
    id: number;
    status: string;
    pm_block: boolean;
    applications_block: boolean;
    suggestions_block: boolean;
    messages_max_1: boolean;
    messages_max_3: boolean;
    user_block: boolean;
}
declare const _default: import("react-redux").ConnectedComponent<React.FC<any>, Pick<any, string | number | symbol>>;
export default _default;
