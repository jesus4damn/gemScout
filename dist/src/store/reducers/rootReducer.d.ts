/// <reference types="react" />
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    userProfile: import("../../constants/types/interfaces/stateInterfaces").IUserProfile;
    systemInfo: import("../../constants/types/interfaces/stateInterfaces").ISystemInfo;
    modalWindow: import("../../constants/types/interfaces/stateInterfaces").IModalWindow;
    users: import("../../constants/types/interfaces/stateInterfaces").IUsers;
    gemstones: import("../../constants/types/interfaces/stateInterfaces").IGemstones;
}>, {
    type: "LOGOUT";
} | {
    type: "LOGIN_SUCCESS";
    token: string;
    avatar: string;
    name: string;
    id: number;
} | {
    type: "CHANGE_AUTH_STEP";
    data: any;
} | import("../../constants/types/types").SystemInfoAction | {
    type: "CLOSE_MODAL";
} | {
    type: "OPEN_MODAL";
    body: typeof import("react").Component | import("react").FC<{}> | null;
    parameters: {} | {
        [key: string]: any;
    };
    title: string | null;
    withBtn: boolean;
    bodyWidth: string;
} | {
    type: "GET_ALL_USERS_LIST" | "FILTER_ALL_USERS_LIST";
    allUsersList: import("../../constants/types/interfaces/commonInterfaces").IUser[];
    params?: import("../../constants/types/interfaces/commonInterfaces").IFilterForm | undefined;
} | {
    type: "GET_NEW_USERS_LIST";
    newUsersList: import("../../constants/types/interfaces/commonInterfaces").INewUser[];
} | {
    type: "UPDATE_USER_SETTINGS";
    updatedList: import("../../constants/types/interfaces/commonInterfaces").IUser[];
} | {
    type: "UPDATE_USER_DATA";
    userData: import("../../constants/types/interfaces/commonInterfaces").IUserForm;
} | {
    type: "BLOCK_USER";
    data: {
        id: number;
        bool: boolean;
        restrictions: number[];
    };
} | {
    type: "GET_ALL_USERS_LIST_ADD";
    page: number;
    allUsersList: import("../../constants/types/interfaces/commonInterfaces").IUser[];
} | {
    type: "GET_NEW_USERS_LIST_ADD";
    page: number;
    newUsersList: import("../../constants/types/interfaces/commonInterfaces").INewUser[];
} | {
    type: "SET_SUBSCRIBE";
    subscribe: boolean;
} | {
    type: "SET_SEND_MESSAGE";
    message: import("../../constants/types/interfaces/commonInterfaces").IMessage | null;
} | {
    type: "CHANGE_SHAPES_ORDER" | "GET_SHAPES_LIST";
    shapesList: import("../../constants/types/interfaces/commonInterfaces").IShape[];
} | {
    type: "GET_GEMSTONES_LIST" | "UPDATE_GEMSTONE";
    gemstonesList: import("../../constants/types/interfaces/commonInterfaces").IGemstone[];
} | {
    type: "ADD_GEMSTONE";
    newGemstone: import("../../constants/types/interfaces/commonInterfaces").IGemstone;
} | {
    type: "ADD_SHAPE";
    newShape: import("../../constants/types/interfaces/commonInterfaces").IShape;
} | {
    type: "DELETE_SHAPE";
    id: number;
} | {
    type: "DELETE_GEMSTONE";
    id: number;
}>;
export declare type RootState = ReturnType<typeof rootReducer>;
