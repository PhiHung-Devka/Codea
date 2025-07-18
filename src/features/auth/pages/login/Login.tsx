import { Button, Card, Checkbox, Col, ConfigProvider, Divider, Flex, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LinkBasic } from "@repo/component/ui";
import { LabelDivider } from "@repo/component/ui/label/LabelDivider";
import { useNavigate } from "react-router-dom";
import { useNotify } from "@repo/component/ui/notification/Notification";
import { useAuthStore } from "@repo/packages/stores";
import { userApi } from "@repo/packages/services";

const Login = () => {
    const { login } = useAuthStore();
    const notify = useNotify();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const user = await userApi.apis.loginApi({ email: values.email, password: values.password });
            login(user);
            notify?.success({ message: "Đăng nhập thành công!" });
            navigate("/admin/banner");
        } catch (err: any) {
            const message = typeof err === "string" ? err : err?.message || err?.error || "Vui lòng thử lại.";
            notify?.error({ message: "Đăng nhập thất bại!", description: message });
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: 'black' } }}>
            <Row justify={"center"} align={"middle"}>
                <Col span={8}>
                    <Card title="Đăng nhập tài khoản" className="boxShadow" styles={{
                        header: {
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                            borderBottom: 'none'
                        }
                    }}>
                        <Form name="login" initialValues={{ remember: false }} onFinish={onFinish}>
                            <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email tài khoản!' }]}>
                                <Input prefix={<UserOutlined />} placeholder="Email" autoComplete="user" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" autoComplete="current-password" />
                            </Form.Item>
                            <Form.Item>
                                <Flex justify="space-between" align="center">
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox style={{ color: 'black' }}>Ghi nhớ?</Checkbox>
                                    </Form.Item>
                                    <LinkBasic to="/account/forgot-password" color="black">Quên mật khẩu?</LinkBasic>
                                </Flex>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" color="default" variant="solid" block>Đăng nhập</Button>
                                <Divider orientation="center">
                                    <LabelDivider label={<>Hoặc <LinkBasic isHover={true} to="/account/register" color="black">đăng ký ngay!</LinkBasic></>} />
                                </Divider>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </ConfigProvider>
    )
}

export default Login;