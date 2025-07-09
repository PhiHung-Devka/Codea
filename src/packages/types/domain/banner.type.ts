import type { Banner } from "../base-model";

type BannerCreateBody = Pick<Banner, "bannerUrl">;

type BannerEditBody = BannerCreateBody & Pick<Banner, "bannerId">;

export type { BannerCreateBody, BannerEditBody };