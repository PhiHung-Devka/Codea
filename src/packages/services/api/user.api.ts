import { axiosInternalMethod } from "@repo/packages/libs";
import type { User } from "@repo/packages/types";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/rest/user";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const read = async () => {
    const resp = await axiosInternalMethod._get<User[]>(mergePath("/list"));
    return resp;
}

const userApi = {
    queries: {
        readQuery: () =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.user.findAll],
                queryFn: () => read(),
            }),
    },
    apis: {
        read
    }
}

export { userApi };