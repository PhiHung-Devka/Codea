import type { CardProps } from "antd";

type CardBasicProps = CardProps & {
    name: string,
    img1: string,
    img2: string,
    realPrice: number,
    price: number
}

export type { CardBasicProps };