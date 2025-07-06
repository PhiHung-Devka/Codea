import { axiosInternalMethod } from "@repo/packages/libs";
import type { Banner } from "@repo/packages/types";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

// const _controllerPath = "/api/banner";
const _controllerPath = "/api/home";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const read = async () => {
    const resp = await axiosInternalMethod._get<Banner[]>(mergePath("/banners"));
    return resp;
};

const bannerApi = {
    queries: {
        readQuery: () => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.findAll],
            queryFn: () => read()
        })
    },
    apis: {
        read
    }
};

export { bannerApi };