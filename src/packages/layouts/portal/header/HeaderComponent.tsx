import clsx from "clsx";
import styles from "./Header.module.scss";
import { Badge, Button, Flex, Popover, type MenuProps } from "antd";
import { DropdownBasic, LinkBasic } from "@repo/component/ui";
import { UserOutlined, LogoutOutlined, SearchOutlined, LoginOutlined, UserAddOutlined, KeyOutlined } from "@ant-design/icons";
import Search, { type SearchProps } from "antd/es/input/Search";
import { useAuthStore } from "@repo/packages/stores";
import { CartIcon } from "@repo/assets/icons";

const isAuthenticated = useAuthStore();
const cartItemCount: any[] = [];

const authItemsWhenLoggedOut: MenuProps["items"] = [
    {
        key: "login",
        label: <LinkBasic to={"/account/login"}>Đăng nhập</LinkBasic>,
        icon: <LoginOutlined style={{ fontSize: 16 }} />,
    },
    {
        key: "register",
        label: <LinkBasic to={"/account/register"}>Đăng ký</LinkBasic>,
        icon: <UserAddOutlined style={{ fontSize: 16 }} />,
    },
    {
        key: "forgot-pass",
        label: <LinkBasic to={"/account/forgot-password"}>Quên mật khẩu</LinkBasic>,
        icon: <KeyOutlined style={{ fontSize: 16 }} />,
    },
];

const authItemsWhenLoggedIn: MenuProps["items"] = [
    {
        key: "profile",
        label: <LinkBasic to={"/account/profile"}>Thông tin tài khoản</LinkBasic>,
        icon: <UserOutlined style={{ fontSize: 16 }} />,
    },
    {
        key: "change-pass",
        label: <LinkBasic to={"/account/change-password"}>Đổi mật khẩu</LinkBasic>,
        icon: <KeyOutlined style={{ fontSize: 16 }} />,
    },
    {
        key: "logout",
        label: <span>Đăng xuất</span>,
        icon: <LogoutOutlined style={{ fontSize: 16 }} />,
    },
];

const categoryItems: MenuProps["items"] = [
    {
        key: "handmade",
        label: <span>Handmade</span>
    },
    {
        key: "shirt",
        label: <span>T-Shirt</span>
    },
    {
        key: "babytee",
        label: <span>Baby Tee</span>
    },
    {
        key: "boxy",
        label: <span>Boxy</span>
    }
];

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const cartContent = (
    <div style={{ width: 340, padding: 10 }}>
        <div style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: 10 }}>
            <div style={{ display: "flex", gap: 10 }}>
                <img src="URL_IMG_1" alt="Product 1" width={60} />
                <div style={{ flex: 1 }}>
                    <div>Áo Thun Local Brand Unisex Teelab Striped Tshirt TS328</div>
                    <div>Đen / M</div>
                    <div style={{ color: "red", fontWeight: "bold" }}>210.000đ</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Button size="small">-</Button>
                        <span>1</span>
                        <Button size="small">+</Button>
                        <span style={{ marginLeft: "auto", color: "#007bff", cursor: "pointer" }}>Xóa</span>
                    </div>
                </div>
            </div>
        </div>

        <div style={{ borderBottom: "1px solid #e8e8e8", paddingTop: 10, paddingBottom: 10 }}>
            <div style={{ display: "flex", gap: 10 }}>
                <img src="URL_IMG_2" alt="Product 2" width={60} />
                <div style={{ flex: 1 }}>
                    <div>Áo Thun Wash Local Brand Unisex Teelab Rodeos Tshirt TS325</div>
                    <div>Wash Xám / M</div>
                    <div style={{ color: "red", fontWeight: "bold" }}>230.000đ</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Button size="small">-</Button>
                        <span>1</span>
                        <Button size="small">+</Button>
                        <span style={{ marginLeft: "auto", color: "#007bff", cursor: "pointer" }}>Xóa</span>
                    </div>
                </div>
            </div>
        </div>

        <div style={{ marginTop: 10, textAlign: "right", fontWeight: "bold", color: "red" }}>
            Tổng tiền: 440.000đ
        </div>

        <Button type="primary" block style={{ marginTop: 10, background: "black", border: "none" }}>
            Thanh toán
        </Button>
    </div>
);

const HeaderComponent = () => {
    return (
        <header className={styles["hd__stickyHeader"]}>
            <Flex className={styles["hd__topHeader"]}>
                <Flex align="center" gap={10} justify="flex-end" className="container">
                    <Search allowClear placeholder="Tìm kiếm sản phẩm..." onSearch={onSearch}
                        enterButton={<Button style={{ background: '#545457', color: 'white' }} icon={<SearchOutlined />} />} style={{ width: 250 }} />
                    <div className={clsx(styles["hd__topHeader--text"], styles["hd__topHeader--cursor"])}>
                        <Popover destroyOnHidden={true} content={cartContent} placement="bottomLeft">
                            <LinkBasic to="/portal/cart" title="Giỏ hàng">
                                <Badge dot={cartItemCount.length > 0} size="small" style={{ marginLeft: 10 }}>
                                    <CartIcon style={{ width: 'auto', height: '24px' }} />
                                </Badge>
                            </LinkBasic>
                        </Popover>
                    </div>
                </Flex>
            </Flex>
            <header className="container">
                <Flex gap={190} align="center" justify="space-evenly" className={styles["hd__midHeader"]}>
                    <Flex gap={140} justify="space-between">
                        <LinkBasic classLocal={"midHeader__text"} to={"/portal/home"} color="black">Trang chủ</LinkBasic>
                        <LinkBasic classLocal={"midHeader__text"} to={"/"} color="black">Chính sách</LinkBasic>
                    </Flex>
                    <LinkBasic to="/portal/home" title="Codea">
                        <img src={"/logo-black.png"} alt="Logo" width={90} />
                    </LinkBasic>
                    <Flex gap={140}>
                        <DropdownBasic menu={{ items: categoryItems }} trigger={["hover"]}
                            className={clsx(styles["hd__midHeader--text"], styles["hd__midHeader--cursor"])}>
                            Sản phẩm
                        </DropdownBasic>
                        <DropdownBasic menu={{ items: isAuthenticated ? authItemsWhenLoggedIn : authItemsWhenLoggedOut }}
                            trigger={["hover"]} className={clsx(styles["hd__midHeader--text"], styles["hd__midHeader--cursor"])}>
                            Tài khoản
                        </DropdownBasic>
                    </Flex>
                </Flex>
            </header>
        </header>
    )
}

export default HeaderComponent;