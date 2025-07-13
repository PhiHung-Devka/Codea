import type { FeedBack } from "../base-model";

type FeedbackCreateBody = Pick<FeedBack, "productId" | "userId" | "comment" | "star">;

export type { FeedbackCreateBody };