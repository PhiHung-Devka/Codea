import type { AddressVNApiResponse } from "@repo/packages/types/domain/address.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosAddressVN = axios.create({
    baseURL: import.meta.env.VITE_API_ADDRESSVN
});

const fetchAddressVN = async () => {
    const resp = await axiosAddressVN.get<AddressVNApiResponse>("");
    return resp.data;
};

export const useAddressStore = () => {
    return useQuery({
        queryKey: [REPO_CONSTANT.QUERY_KEYS.addressVN.base],
        queryFn: fetchAddressVN,
        staleTime: Infinity,
        retry: 1
    })
};

export const AppInitializer = () => {
    useAddressStore();
    return null;
};