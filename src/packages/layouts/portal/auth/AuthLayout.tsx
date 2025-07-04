import { FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../header/HeaderComponent";
import FooterComponent from "../footer/FooterComponent";
import { CustomerServiceOutlined, FacebookFilled, PhoneOutlined } from "@ant-design/icons";
import { ZaloIcon } from "@repo/assets/icons";

const AuthLayout = () => {
    return (
        <Layout style={{ background: '#fff' }}>
            <HeaderComponent />
            <section style={{ margin: '40px 0' }}>
                <Outlet />
            </section>
            <FooterComponent />
            <FloatButton.Group shape="circle">
                <FloatButton.BackTop visibilityHeight={400} style={{ marginBottom: 56 }} />
                <FloatButton.Group trigger="click" icon={<CustomerServiceOutlined />}>
                    <FloatButton href="https://www.facebook.com/people/Codea-Lab/61577080404179/" target="_blank"
                        tooltip={{
                            title: 'Facebook',
                            placement: 'left',
                        }}
                        icon={<FacebookFilled style={{ color: '#0866ff' }} />}
                    />
                    <FloatButton href="https://zalo.me/" target="_blank"
                        tooltip={{
                            title: 'Zalo',
                            placement: 'left',
                        }}
                        icon={<ZaloIcon />}
                    />
                    <FloatButton href="tel:0344966647"
                        tooltip={{
                            title: 'Điện thoại',
                            placement: 'left',
                        }}
                        icon={<PhoneOutlined />}
                    />
                </FloatButton.Group>
            </FloatButton.Group>
        </Layout>
    )
}

export default AuthLayout;