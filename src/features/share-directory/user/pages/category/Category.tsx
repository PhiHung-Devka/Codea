import { UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd"
import styles from "./Category.module.scss";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { ProductList } from "@repo/component/ui/list/ProductList";
import { PaginationBasicV2 } from "@repo/component/ui/pagination/PaginationBasic";

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

const items: MenuItem[] = [
    getItem('Tất cả sản phẩm', '1', <UnorderedListOutlined />),
    getItem('Handmade', '2', <UnorderedListOutlined />),
    getItem('T-Shirt', '3', <UnorderedListOutlined />),
    getItem('Baby Tee', '4', <UnorderedListOutlined />),
    getItem('Boxy', '5', <UnorderedListOutlined />)
];

const products = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    img1: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103",
    img2: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760",
    name: "Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069",
    price: 350000,
    realPrice: 195000,
}));

const Category = () => {
    return (
        <div className="container">
            <Layout hasSider style={{ margin: '10px 0' }}>
                <Sider style={siderStyle}>
                    <div className={styles["ctgr__title"]}>Danh mục</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout style={{ background: '#fff' }}>
                    <Content style={{ overflow: 'initial' }}>
                        <div style={{ padding: '0 20px' }}>
                            <ProductList products={products} />
                        </div>
                        <PaginationBasicV2 total={products.length || 0} current={1} pageSize={5} />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Category;