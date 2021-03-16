import { AxiosResponse } from "axios";
export declare const API: {
    baseUrl: string;
    baseUrl2: string;
    config: {
        headers: {
            'Content-Type': string;
        };
    };
    readonly formDataConfig: {
        headers: {
            'Content-Type': string;
        };
    };
    setAuthHeader(token: string): void;
    get(path: string): Promise<AxiosResponse>;
    getWithParams(path: string, params: any): Promise<AxiosResponse>;
    post(path: string, data: any, isFormData?: boolean): Promise<AxiosResponse>;
    put(path: string, data: any, isFormData?: boolean): Promise<AxiosResponse>;
    delete(path: string): Promise<AxiosResponse>;
};
