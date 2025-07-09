import { ShippingIcon, PaymentIcon, ExchangeIcon, PhoneIcon } from "@repo/assets/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const QUERY_KEYS = {
    user: {
        findAll: "user-list",
        base: "user"
    },
    addressVN: {
        base: "dvhcvn"
    },
    banner: {
        findAll: "banner-list",
        base: "banner"
    },
    home: {
        product: "product"
    },
    social: {
        findAll: "social-list",
        base: "social"
    },
    product: {
        findAll: "product-all",
        base: "product"
    },
    productDetail: {
        base: "productDetail"
    },
    cart: {
        base: "cart"
    },
    order: {
        base: "order"
    }
};

const PROP_KEYS = {
    pagination: {
        pageIndex: "pageIndex",
        pageSize: "pageSize",
    },
    sort: {
        sortBy: "sortBy",
        sortOrder: "sortOrder",
    },
};

const DEFAUL_VALUES = {
    controlSize: "large" as SizeType,
    pagination: {
        sizeOptions: [5, 10, 20],
        pageIndex: 1,
        pageSize: 25
    },
};

const DEFAULT_VALUE_FOOTER = {
    supportBoxes: [
        {
            iconUrl: PhoneIcon,
            title: "Hỗ trợ 24/7",
            desc: "Gọi ngay để tư vấn!",
        },
        {
            icon: ShippingIcon,
            title: "Free ship",
            desc: "Đơn từ 500k",
        },
        {
            icon: PaymentIcon,
            title: "Thanh toán",
            desc: "Đa dạng và linh động",
        },
        {
            icon: ExchangeIcon,
            title: "Đổi trả dễ dàng",
            desc: "Trong vòng 30 ngày",
        },
    ],
    aboutLinks: [
        { href: "/portal/about-us", label: "Giới thiệu về Codea" },
        { href: "/portal/mission", label: "Tầm nhìn, sứ mệnh và giá trị" },
        { href: "/portal/faq", label: "Câu hỏi thường gặp" },
    ],
    policyLinks: [
        { href: "/portal/purchase-policy", label: "Chính sách mua hàng" },
        { href: "/portal/return-policy", label: "Chính sách đổi trả" },
        { href: "/portal/privacy-policy", label: "Chính sách bảo mật" },
    ],
};

const LOCAL_STORAGE_KEYS = { user: "codea_user" };

const REPO_CONSTANT = {
    QUERY_KEYS,
    PROP_KEYS,
    LOCAL_STORAGE_KEYS,
    DEFAULT_VALUE_FOOTER,
    DEFAUL_VALUES
};

export default REPO_CONSTANT;