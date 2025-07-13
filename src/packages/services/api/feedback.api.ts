import { axiosInternalMethod } from "@repo/packages/libs";
import type { FeedBack } from "@repo/packages/types";
import type { FeedbackCreateBody } from "@repo/packages/types/domain/feedback.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/feedbacks";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const read = async (id: number) => {
    const resp = await axiosInternalMethod._get<FeedBack[]>(mergePath(`/product/${id}`));
    return resp;
};

const create = async (body: FeedbackCreateBody) => {
    const resp = await axiosInternalMethod._post<FeedBack>(mergePath(""), body);
    return resp;
};

const feedbackApi = {
    queries: {
        readQuery: (id: number) => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.feedback.base, id],
            queryFn: () => read(id),
            staleTime: 1000 * 60 * 5
        })
    },
    apis: { create, read }
};

export { feedbackApi };