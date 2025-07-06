import { axiosInternalMethod } from "@repo/packages/libs";
import type { HomeProduct } from "@repo/packages/types";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/home";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const read = async () => {
    const resp = await axiosInternalMethod._get<HomeProduct[]>(mergePath("/products"));
    return resp;
};

const homeApi = {
    queries: {
        readQuery: () => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.home.product],
            queryFn: () => read()
        })
    },
    apis: {
        read
    }
};

export { homeApi };