import clsx from "clsx";
import styles from "./Header.module.scss";
import { Badge, Button, Flex, Popover, type MenuProps } from "antd";
import { DropdownBasic, LinkBasic } from "@repo/component/ui";
import { UserOutlined, LogoutOutlined, SearchOutlined, LoginOutlined, UserAddOutlined, KeyOutlined } from "@ant-design/icons";
import Search, { type SearchProps } from "antd/es/input/Search";
import { useAuthStore } from "@repo/packages/stores";
import { CartIcon } from "@repo/assets/icons";
import { useNavigate } from "react-router-dom";
import { useNotify } from "@repo/component/ui/notification/Notification";
import { categoryApi } from "@repo/packages/services/api/category.api";
import useCartStore from "@repo/packages/stores/cart/use-cart-store";
import { FormatCurrency } from "@repo/packages/ultis/common/currency-format";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

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

const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
};

const HeaderComponent = () => {
    const { user, logout } = useAuthStore();
    const { cartItems } = useCartStore();
    const notify = useNotify();
    const navigate = useNavigate();
    const cartItemCount: any[] = [];

    const totalAmount = cartItems.reduce((sum, item) => sum + item.realPrice * item.quantity, 0);

    const cartContent = (
        <div style={{ width: 340, padding: 10 }}>
            <RenderCondition condition={cartItems.length === 0}>
                <div style={{ textAlign: "center", padding: 20 }}>Giỏ hàng trống</div>
            </RenderCondition>
            <RenderCondition condition={cartItems.length !== 0}>
                {cartItems.map((item) => (
                    <div key={item.cartId} style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: 10, marginBottom: 10 }}>
                        <Flex gap={10}>
                            <img src={item.imageUrl} alt={item.productName} width={80} style={{ objectFit: "contain" }} />
                            <div style={{ flex: 1 }}>
                                <div>{item.productName}</div>
                                <div>{item.colorName} / {item.size}</div>
                                <div style={{ color: "red", fontWeight: "bold" }}>{FormatCurrency(item.realPrice)}</div>
                            </div>
                        </Flex>
                    </div>
                ))}
                <div style={{ textAlign: "right", fontWeight: "bold", color: "red" }}>
                    Tổng tiền: {FormatCurrency(totalAmount)}
                </div>
                <Button type="primary" block style={{ marginTop: 10, background: "black", border: "none" }}
                    onClick={() => navigate("/portal/checkout")}>
                    Thanh toán
                </Button>
            </RenderCondition>
        </div>
    );

    const handleLogout = () => {
        logout();
        notify?.success({ message: "Đăng xuất thành công" });
        navigate("/account/login");
    };

    const categoryQuery = categoryApi.queries.readQuery();

    const handleCategoryClick = (key: string) => {
        if (key === 'all') {
            navigate("/portal/category");
        } else {
            navigate(`/portal/category?categoryId=${key}`);
        }
    };

    const categoryData = Array.isArray(categoryQuery.data) ? categoryQuery.data : [];

    const categoryItems: MenuItem[] = [
        getItem(
            <span onClick={() => handleCategoryClick('all')}>Tất cả sản phẩm</span>,
            'all'
        ),
        ...categoryData.map((cat) =>
            getItem(
                <span onClick={() => handleCategoryClick(String(cat.categoryId))}>{cat.name}</span>,
                String(cat.categoryId)
            )
        )
    ];

    const authMenuItems: MenuProps["items"] = user ? [
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
            label: <span onClick={handleLogout}>Đăng xuất</span>,
            icon: <LogoutOutlined style={{ fontSize: 16 }} />,
        },
    ] : authItemsWhenLoggedOut;

    const policyMenuItems: MenuProps["items"] = [
        {
            key: "purchase-policy",
            label: <LinkBasic to={"/portal/purchase-policy"}>Chính sách mua hàng</LinkBasic>
        },
        {
            key: "return-policy",
            label: <LinkBasic to={"/portal/return-policy"}>Chính sách đổi trả</LinkBasic>
        },
        {
            key: "privacy-policy",
            label: <LinkBasic to={"/portal/privacy-policy"}>Chính sách bảo mật</LinkBasic>
        },
    ]

    return (
        <header className={styles["hd__stickyHeader"]}>
            <Flex className={styles["hd__topHeader"]}>
                <Flex align="center" gap={10} justify="flex-end" className="container">
                    <Search allowClear placeholder="Tìm kiếm sản phẩm..." onSearch={onSearch} enterButton={
                        <Button style={{ background: "#545457", color: "white" }} icon={<SearchOutlined />} />
                    } style={{ width: 250 }} />
                    <div className={clsx(styles["hd__topHeader--text"], styles["hd__topHeader--cursor"])}>
                        <Popover destroyOnHidden content={cartContent} placement="bottomLeft">
                            <LinkBasic to="/portal/cart" title="Giỏ hàng">
                                <Badge dot={cartItemCount.length > 0} size="small" style={{ marginLeft: 10 }}>
                                    <CartIcon style={{ width: "auto", height: "24px" }} />
                                </Badge>
                            </LinkBasic>
                        </Popover>
                    </div>
                </Flex>
            </Flex>
            <header className="container">
                <Flex gap={190} align="center" justify="space-evenly" className={styles["hd__midHeader"]}>
                    <Flex gap={140} justify="space-between">
                        <LinkBasic classLocal={"midHeader__text"} to={"/portal/home"} color="black">
                            Trang chủ
                        </LinkBasic>
                        <DropdownBasic menu={{ items: policyMenuItems }} trigger={["hover"]}
                            className={clsx(styles["hd__midHeader--text"], styles["hd__midHeader--cursor"])}>
                            Chính sách
                        </DropdownBasic>
                    </Flex>
                    <LinkBasic to="/portal/home" title="Codea">
                        <img src="https://res.cloudinary.com/dydx2mqqw/image/upload/v1751747464/logo-black_cdce4c.png"
                            alt="Logo" width={90} />
                    </LinkBasic>
                    <Flex gap={140}>
                        <DropdownBasic menu={{ items: categoryItems }} trigger={["hover"]}
                            className={clsx(styles["hd__midHeader--text"], styles["hd__midHeader--cursor"])}>
                            Sản phẩm
                        </DropdownBasic>
                        <DropdownBasic menu={{ items: authMenuItems }} trigger={["hover"]}
                            className={clsx(styles["hd__midHeader--text"], styles["hd__midHeader--cursor"])}>
                            Tài khoản
                        </DropdownBasic>
                    </Flex>
                </Flex>
            </header>
        </header>
    );
};

export default HeaderComponent;