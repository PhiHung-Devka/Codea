import { Outlet } from "react-router-dom";
import { FloatButton, Layout } from "antd";
import { CustomerServiceOutlined, FacebookFilled, PhoneOutlined } from "@ant-design/icons";
import HeaderComponent from "../header/HeaderComponent";
import FooterComponent from "../footer/FooterComponent";

const UserLayout = () => {
    return (
        <Layout style={{ background: '#fff' }}>
            <HeaderComponent />
            <section>
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
                    <FloatButton href="https://m.me/61577080404179" target="_blank"
                        tooltip={{
                            title: 'Messenger',
                            placement: 'left',
                        }}
                        icon={<img src="https://res.cloudinary.com/dydx2mqqw/image/upload/v1751745574/messenger-icon_y8okh6.svg"
                            alt="Messenger" />}
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

export default UserLayout;