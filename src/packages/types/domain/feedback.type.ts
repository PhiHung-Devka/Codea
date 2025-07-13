type FeedbackCreateBody = {
    productId: number;
    userId: number;
    comment: string;
    star: number;
};

export type { FeedbackCreateBody };