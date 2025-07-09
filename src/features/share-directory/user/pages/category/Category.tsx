import { UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd"
import styles from "./Category.module.scss";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { ProductList } from "@repo/component/ui/list/ProductList";
import { PaginationBasicV2 } from "@repo/component/ui/pagination/PaginationBasic";
import { usePaginationParams } from "@repo/packages/hooks/pagination/use-pagination-params.hook";
import { productApi } from "@repo/packages/services/api/product.api";
import { categoryApi } from "@repo/packages/services/api/category.api";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";
import { useSearchParams } from "react-router-dom";
import { NotFoundTable } from "@repo/component/ui/common/NotFoundTable";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '90vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const Category = () => {
    const [searchParams] = useSearchParams();
    const categoryIdParam = searchParams.get("categoryId");
    const [categoryId, setCategoryId] = useState<number | undefined>(
        categoryIdParam ? Number(categoryIdParam) : undefined
    );

    const { pageIndex, pageSize, pagingObj, resetPagination } = usePaginationParams({
        defaultPageIndex: 1, defaultPageSize: 10, readyUpdate: false,
    });

    const productQuery = productApi.queries.paginationFilterQuery({ ...pagingObj, categoryId }, true);
    const categoryQuery = categoryApi.queries.readQuery();
    const selectedKey = categoryId !== undefined ? String(categoryId) : "all";

    const categoryItems: MenuItem[] = [
        getItem('Tất cả sản phẩm', 'all', <UnorderedListOutlined />),
        ...(categoryQuery.data?.map((cat: { categoryId: number, name: string }) =>
            getItem(cat.name, String(cat.categoryId), <UnorderedListOutlined />)
        ) || [])
    ];

    const handleMenuSelect: MenuProps['onSelect'] = ({ key }) => {
        if (key === 'all') {
            setCategoryId(undefined);
        } else {
            setCategoryId(Number(key));
        }
    };

    useEffect(() => {
        const categoryIdParam = searchParams.get("categoryId");
        const parsed = categoryIdParam ? Number(categoryIdParam) : undefined;

        setCategoryId(parsed);
        resetPagination();
    }, [searchParams]);

    return (
        <div className="container">
            <Layout hasSider style={{ margin: '10px 0' }}>
                <Sider style={siderStyle}>
                    <div className={styles["ctgr__title"]}>Danh mục</div>
                    <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={categoryItems} onSelect={handleMenuSelect} />
                </Sider>
                <Layout style={{ background: '#fff' }}>
                    <Content style={{ overflow: 'initial' }}>
                        <div style={{ padding: '0 20px' }}>
                            <RenderCondition condition={!!productQuery.data?.records.length}>
                                <ProductList products={productQuery.data?.records || []} source="category" />
                            </RenderCondition>
                            <RenderCondition condition={!productQuery.data?.records.length}>
                                <NotFoundTable />
                            </RenderCondition>
                        </div>
                        <RenderCondition condition={productQuery.data?.totalPages! > 1}>
                            <PaginationBasicV2 total={productQuery.data?.totalPages || 0} current={pageIndex} pageSize={pageSize} />
                        </RenderCondition>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Category;