import type { Social } from "../base-model/social.type";

type SocialCreateBody = Pick<Social, "iconUrl" | "isActive" | "isPhone" | "link" | "name">;

type SocialEditBody = SocialCreateBody & Pick<Social, "socialId">;

export type { SocialCreateBody, SocialEditBody };