import { IBaseGetRequestAction, IFilterList, IUpdateUserData, IBaseBlockUserRequest, IBaseGetRequestUsersAction } from "../../constants/types/interfaces/actionsInterfaces";
import { GET_ALL_USERS_LIST, GET_NEW_USERS_LIST, BLOCK_USER, GET_NEW_USERS_LIST_ADD, GET_ALL_USERS_LIST_ADD } from "../../constants/actionTypes";
import { IFilterForm, IUserForm } from "../../constants/types/interfaces/commonInterfaces";
import { ISettingsForm } from "../../components/all_users_page/Settings";
export declare const getNewUsersListAction: (loadingFalse: () => void) => IBaseGetRequestAction<typeof GET_NEW_USERS_LIST>;
export declare const getAllUsersListAction: (loadingFalse: (() => void) | null, params?: IFilterForm | undefined) => IBaseGetRequestAction<typeof GET_ALL_USERS_LIST>;
export declare const addNewUsersListAction: (page: number, setLoading: () => void) => IBaseGetRequestUsersAction<"GET_NEW_USERS_LIST_ADD", {
    page: number;
    setLoading: () => void;
}>;
export declare const addAllUsersListAction: (page: number, setLoading: () => void, params: IFilterForm | undefined) => IBaseGetRequestUsersAction<"GET_ALL_USERS_LIST_ADD", {
    page: number;
    setLoading: () => void;
    params: IFilterForm | undefined;
}>;
export declare const updateUserSettingsAction: (data: ISettingsForm) => {
    type: string;
    data: ISettingsForm;
};
export declare const updateUserDataAction: (data: FormData, userData: IUserForm) => IUpdateUserData<FormData>;
export declare const blockUserAction: (id: number, status: number, restrictions: (number | false)[], bool: boolean) => IBaseBlockUserRequest<"BLOCK_USER", {
    id: number;
    status: number;
    restrictions: (number | false)[];
    bool: boolean;
}>;
export declare const filterAllUsersListAction: (loadingFalse: (() => void) | null, params?: IFilterForm | undefined) => IFilterList<typeof GET_ALL_USERS_LIST>;
