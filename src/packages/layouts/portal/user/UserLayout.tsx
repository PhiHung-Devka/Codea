import { Outlet } from "react-router-dom";
import { FloatButton, Layout } from "antd";
import { CustomerServiceOutlined, FacebookFilled } from "@ant-design/icons";
import HeaderComponent from "../header/HeaderComponent";
import FooterComponent from "../footer/FooterComponent";
import { socialApi } from "@repo/packages/services/api/social.api";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";

const UserLayout = () => {
    const socialData = socialApi.queries.readQuery();

    const socialList = Array.isArray(socialData.data) ? socialData.data : [];

    const messengerItem = socialList.find(item => item.name === "Messenger");
    const phoneItem = socialList.find(item => item.isPhone);

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
                    <RenderCondition condition={!!messengerItem}>
                        <FloatButton href={messengerItem?.link} target="_blank"
                            tooltip={{ title: messengerItem?.name, placement: 'left' }}
                            icon={<img src={messengerItem?.iconUrl} alt="Messenger" />}
                        />
                    </RenderCondition>
                    <RenderCondition condition={!!phoneItem}>
                        <FloatButton href={`tel:${phoneItem?.link}`}
                            tooltip={{ title: phoneItem?.name, placement: 'left' }}
                            icon={<img src={phoneItem?.iconUrl} alt="SĐT" />}
                        />
                    </RenderCondition>
                </FloatButton.Group>
            </FloatButton.Group>
        </Layout>
    )
}

export default UserLayout;