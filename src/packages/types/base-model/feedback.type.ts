import type { User } from "./user.type";

type FeedBack = {
    feedbackId: number,
    user: User,
    productId: number,
    comment: string,
    star: number,
    date: Date
}

export type { FeedBack };