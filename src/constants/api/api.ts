import axios, {AxiosResponse} from "axios";

export const API = {
    baseUrl: 'https://gemscout.sixhands.co',
    baseUrl2: 'https://gemscout.sixhands.co/api',
    // baseUrl: 'https://95.179.168.153',
    // baseUrl2: 'https://95.179.168.153/api',
    config: {
        headers: {
            'Content-Type': 'application/json',
            // After login Authorization header will be added
        }
    },
    get formDataConfig() {
       return {
           ...this.config,
           headers: {
               ...this.config.headers,
               'Content-Type': 'multipart/form-data'
           }
       }
    },
    setAuthHeader(token: string): void {
        console.log(token);
        this.config.headers['Authorization'] = 'Bearer ' + token;
    },
    get(path: string): Promise<AxiosResponse> {
        return axios.get(this.baseUrl2 + path, this.config)
    },
    getWithParams(path: string, params: any): Promise<AxiosResponse> {
        return axios.get(this.baseUrl2 + path, {...this.config, params: {...params}})
    },
    post(path: string, data: any, isFormData = false): Promise<AxiosResponse> {
        return axios.post(
            this.baseUrl2 + path,
            isFormData ? data : JSON.stringify(data),
            isFormData ? this.formDataConfig : this.config
        )
    },
    put(path: string, data: any, isFormData = false): Promise<AxiosResponse> {
        return axios.put(
            this.baseUrl2 + path,
            isFormData ? data : JSON.stringify(data),
            isFormData ? this.formDataConfig : this.config
        )
    },
    delete(path: string): Promise<AxiosResponse> {
        return axios.delete(this.baseUrl2 + path, this.config);
    },
};