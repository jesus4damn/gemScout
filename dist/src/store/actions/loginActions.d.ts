import { IAuth } from "../../constants/types/interfaces/actionsInterfaces";
import { UserProfileAction } from "../../constants/types/types";
export declare const loginAction: (data: {
    mobile: string;
}) => IAuth;
export declare const verifyAction: (data: {
    mobile: string;
    code: string;
}) => IAuth;
export declare const logoutAction: () => UserProfileAction;
