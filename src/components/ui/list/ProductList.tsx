import type { ProductListProps } from "@repo/packages/types";
import { Col, Row } from "antd";
import { CardBasic } from "../card/CardBasic";
import { Link } from "react-router-dom";

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {products.map((p) => (
                <Col key={p.id} className="gutter-row" span={6}>
                    <Link to={`/portal/product/${p.id}`}>
                        <CardBasic {...p} />
                    </Link>
                </Col>
            ))};
        </Row>
    )
}