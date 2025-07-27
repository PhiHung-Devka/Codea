import type { PagingFilterResult } from "@repo/packages/types/base/response.type";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const axiosInternalInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json'
    }
});

const _get = async <T>(path: string, config?: AxiosRequestConfig) => {
    const resp = await axiosInternalInstance.get<T>(path, config);
    return resp.data;
};

const _post = async <T>(path: string, body: any, config?: AxiosRequestConfig) => {
    const resp = await axiosInternalInstance.post<T>(path, body, config);
    return resp.data
};

const _postPaging = async <T>(path: string, body: any, config?: AxiosRequestConfig) => {
    const resp = await axiosInternalInstance.post<PagingFilterResult<T>>(path, body, config);
    return resp.data;
}

const _put = async <T>(path: string, body?: any, config?: AxiosRequestConfig) => {
    const resp = await axiosInternalInstance.put<T>(path, body, config);
    return resp.data;
}

const _delete = async <T>(path: string, config?: AxiosRequestConfig) => {
    const resp = await axiosInternalInstance.delete<T>(path, config);
    return resp.data;
}

const axiosInternalMethod = {
    _get, _post, _put, _delete, _postPaging
};

export { axiosInternalInstance, axiosInternalMethod };