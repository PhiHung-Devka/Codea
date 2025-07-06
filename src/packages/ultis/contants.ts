import { ShippingIcon, PaymentIcon, ExchangeIcon } from "@repo/assets/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const QUERY_KEYS = {
    user: {
        findAll: "user-list"
    },
    addressVN: {
        base: "dvhcvn"
    },
    banner: {
        findAll: "banner-list"
    },
    home: {
        product: "product"
    }
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
            iconUrl: "https://res.cloudinary.com/dydx2mqqw/image/upload/v1751745574/phone_omdydr.svg",
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
    socialLinks: [
        {
            name: "Facebook",
            href: "https://www.facebook.com/people/Codea-Lab/61577080404179/",
            icon: "https://res.cloudinary.com/dydx2mqqw/image/upload/v1751745576/facebook_su0jwq.svg",
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/codea_vn?igsh=cHVqdGI1c3B3bXdn",
            icon: "https://res.cloudinary.com/dydx2mqqw/image/upload/v1751745574/instagram_kohm86.svg",
        },
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@codea.style2025?is_from_webapp=1&sender_device=pc",
            icon: "https://res.cloudinary.com/dydx2mqqw/image/upload/v1751745574/tiktok_oyf25l.svg"
        },
        {
            name: "Shoppe",
            href: "https://shopee.vn/codea",
            icon: "https://res.cloudinary.com/dydx2mqqw/image/upload/v1751747483/shopee_qdvuyo.webp"
        }
    ],
    aboutLinks: [
        { href: "/portal/about-us", label: "Giới thiệu về Codea" },
        { href: "/portal/mission", label: "Tầm nhìn, sứ mệnh và giá trị" },
        { href: "/portal/mission", label: "Câu hỏi thường gặp" },
    ],
    policyLinks: [
        { href: "/portal/about-us", label: "Chính sách mua hàng" },
        { href: "/portal/mission", label: "Chính sách đổi trả" },
        { href: "/portal/mission", label: "Chính sách bảo mật" },
    ],
};

const REPO_CONSTANT = {
    QUERY_KEYS,
    DEFAULT_VALUE_FOOTER,
    DEFAUL_VALUES
};

export default REPO_CONSTANT;