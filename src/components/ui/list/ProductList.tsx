import type { ProductListProps } from "@repo/packages/types";
import { Col, Row } from "antd";
import { CardBasic } from "../card/CardBasic";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.scss";

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <>
            {products.map((section) => (
                <div key={section.label}>
                    <div className={styles["pl__cardTitle"]}>{section.label}</div>
                    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                        {section.products.map((p) => (
                            <Col key={p.productId} className="gutter-row" span={6}>
                                <Link to={`/portal/product/${p.productId}`}>
                                    <CardBasic {...p} />
                                </Link>
                            </Col>
                        ))};
                    </Row>
                </div>
            ))}
        </>
    )
}