import type { ProductPreview } from "@repo/packages/types";
import { Card, Flex, Tooltip } from "antd";
import styles from "./Card.module.scss";
import { memo } from "react";
import { FormatCurrency } from "@repo/packages/ultis/common/currency-format";
import { RenderCondition } from "../common/RenderCondition";
const { Meta } = Card;

export const CardBasic = memo(({ ...props }: ProductPreview) => {
    const img1 = props.images?.[0] ?? "/fallback.jpg";
    const img2 = props.images?.[1] ?? img1;
    return (
        <Card key={props.productId} hoverable={true} className={styles["cd__bgColor"]}
            cover={<div className={styles["cd__productImg"]}>
                <img alt={props.name} src={img1} className={styles["cd__productImg--imgPri"]} loading="lazy" decoding="async" />
                <img alt={props.name} src={img2} className={styles["cd__productImg--imgSecond"]} loading="lazy" decoding="async" />
            </div>}>
            <Meta title={<Tooltip title={props.name}>{props.name}</Tooltip>}
                description={<Flex align="center" justify="center" gap={10}>
                    <span className={styles["cd__textPrice"]}>{FormatCurrency(props.realPrice)}</span>
                    <RenderCondition condition={props.price !== props.realPrice}>
                        <del>{FormatCurrency(props.price)}</del>
                    </RenderCondition>
                </Flex>} />
        </Card>
    )
});