import { FaceIcon, Ins, TikTok, PhoneIcon, ShippingIcon, PaymentIcon, ExchangeIcon } from "@repo/assets/icons";
import ShopeeIcon from "@repo/assets/images/shopee.webp";

const QUERY_KEYS = {
    user: {
        findAll: "user-list"
    }
};

const DEFAULT_VALUE_FOOTER = {
    supportBoxes: [
        {
            icon: PhoneIcon,
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
            icon: FaceIcon,
            isPng: false
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/codea_vn?igsh=cHVqdGI1c3B3bXdn",
            icon: Ins,
            isPng: false
        },
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@codea.style2025?is_from_webapp=1&sender_device=pc",
            icon: TikTok,
            isPng: false
        },
        {
            name: "Shoppe",
            href: "https://shopee.vn/codea",
            icon: ShopeeIcon,
            isPng: true
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
    DEFAULT_VALUE_FOOTER
};

export default REPO_CONSTANT;