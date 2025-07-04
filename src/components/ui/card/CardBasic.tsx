import type { CardBasicProps } from "@repo/packages/types";
import { Card, Flex, Tooltip } from "antd";
import styles from "./Card.module.scss";
import { memo } from "react";
const { Meta } = Card;

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

export const CardBasic = memo(({ name, img1, img2, realPrice, price, hoverable = true }: CardBasicProps) => {
    return (
        <Card hoverable={hoverable} className={styles["cd__bgColor"]}
            cover={<div className={styles["cd__productImg"]}>
                <img alt={name} src={img1} className={styles["cd__productImg--imgPri"]} loading="lazy" decoding="async" />
                <img alt={name} src={img2} className={styles["cd__productImg--imgSecond"]} loading="lazy" decoding="async" />
            </div>}>
            <Meta title={<Tooltip title={name}>{name}</Tooltip>} description={<Flex align="center" justify="center" gap={10}>
                <span className={styles["cd__textPrice"]}>{formatCurrency(realPrice!)}</span>
                <del>{formatCurrency(price!)}</del>
            </Flex>} />
        </Card>
    )
});