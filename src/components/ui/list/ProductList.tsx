import type { ProductListProps } from "@repo/packages/types";
import { Col, Row } from "antd";
import { CardBasic } from "../card/CardBasic";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.scss";
import { RenderCondition } from "../common/RenderCondition";

export const ProductList = ({ products, source }: ProductListProps) => {
    const isSectioned =
        source === "home" ||
        (
            Array.isArray(products) &&
            products.length > 0 &&
            typeof products[0] === 'object' &&
            'products' in products[0] &&
            Array.isArray((products[0] as any).products)
        );

    let sections;

    if (source === "category") {
        const previews = (Array.isArray(products) ? products : []).map((p: any) => {
            const allSizes = (p.productDetails || []).flatMap((detail: any) => detail.sizes || []);
            const minSize = allSizes.reduce((min: any, s: any) =>
                (min == null || (s.realPrice ?? Infinity) < (min.realPrice ?? Infinity)) ? s : min, null);
            const allImages = (p.productDetails || []).flatMap((detail: any) =>
                (detail.galleries || []).map((g: any) => g.imageUrl)
            );
            return {
                productId: p.productId,
                name: p.name,
                realPrice: minSize?.realPrice ?? 0,
                price: minSize?.price ?? 0,
                images: allImages,
            };
        });
        sections = [{ label: "", products: previews }];
    } else {
        sections = isSectioned
            ? (Array.isArray(products) ? products : [])
            : [{ label: "", products: Array.isArray(products) ? products : [] }];
    }

    return (
        <>
            {Array.isArray(sections) && sections.map((section: any, idx: number) => (
                <RenderCondition
                    key={section.label ?? idx}
                    condition={Array.isArray(section.products) && section.products.length > 0}
                >
                    {isSectioned && (
                        <div className={styles["pl__cardTitle"]}>{section.label}</div>
                    )}
                    <Row
                        gutter={[
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                        ]}
                    >
                        {section.products.map((p: any) => (
                            <Col key={p.productId} className="gutter-row" xs={12} sm={12} md={6}>
                                <Link to={`/portal/product/${p.productId}`}>
                                    <CardBasic {...p} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </RenderCondition>
            ))}
        </>
    );
};
