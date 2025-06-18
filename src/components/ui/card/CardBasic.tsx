import type { CardBasicProps } from "@repo/packages/types";
import { Card, Flex, Tooltip } from "antd";
import styles from "./Card.module.scss";
const { Meta } = Card;

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(value);
};

export const CardBasic = ({ name, img1, img2, realPrice, price }: CardBasicProps) => {
    return (
        <Tooltip title={name}>
            <Card hoverable className={styles["cd__bgColor"]}
                cover={<div className={styles["cd__productImg"]}>
                    <img alt={name} src={img1} className={styles["cd__productImg--imgPri"]} />
                    <img alt={name} src={img2} className={styles["cd__productImg--imgSecond"]} />
                </div>}>
                <Meta title={name} description={<Flex align="center" justify="center" gap={10}>
                    <span className={styles["cd__textPrice"]}>{formatCurrency(realPrice)}</span>
                    <del>{formatCurrency(price)}</del>
                </Flex>} />
            </Card>
        </Tooltip>
    )
};