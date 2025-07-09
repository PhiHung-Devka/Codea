import { Layout, Menu, type MenuProps } from "antd"
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: string, path: string): MenuItem {
    return {
        key,
        label,
        path, // tùy chọn nếu bạn cần
    } as MenuItem;
}

const menuItems = [
    { key: '1', label: 'Quản lý Banner', path: '/admin/banner' },
    { key: '2', label: 'Quản lý mạng xã hội', path: '/admin/social' },
    { key: '3', label: 'Quản lý sản phẩm', path: '/admin/product' },
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const items: MenuItem[] = menuItems.map(({ key, label }) => getItem(label, key, ''));

    const keyByPath: Record<string, string> = {
        '/admin/banner': '1',
        '/admin/social': '2',
        '/admin/product': '3',
    };

    const pathByKey: Record<string, string> = {
        '1': '/admin/banner',
        '2': '/admin/social',
        '3': '/admin/product',
    };


    const selectedKey =
        Object.entries(keyByPath).find(([prefix]) =>
            location.pathname.startsWith(prefix)
        )?.[1] || '1';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Link to={"/portal/home"}>
                    <div className={styles["adl__logo"]} />
                </Link>
                <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={({ key }) => navigate(pathByKey[key])} items={items} />
            </Sider>
            <Layout>
                <Content style={{ padding: 20 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;
