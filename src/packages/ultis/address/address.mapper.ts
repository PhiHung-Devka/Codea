import type { addressVN } from "@repo/packages/types/domain/address.type";
import type { CascaderProps } from "antd";

export const mapAddressToCascaderOptions = (addressVN: addressVN[]): CascaderProps["options"] => {
    return addressVN.map((lv1) => ({
        label: lv1.name,
        value: lv1.level1_id,
        children: lv1.level2s.map((lv2) => ({
            label: lv2.name,
            value: lv2.level2_id,
            children: lv2.level3s.map((lv3) => ({
                label: lv3.name,
                value: lv3.level3_id,
            })),
        })),
    }));
};
