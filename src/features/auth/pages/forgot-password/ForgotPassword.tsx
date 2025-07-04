import { Button, Card, Col, ConfigProvider, Divider, Form, Input, Row, type GetProps } from "antd";
import { LockOutlined, SafetyOutlined, UserOutlined } from "@ant-design/icons";
import { LinkBasic } from "@repo/component/ui";
import { useEffect, useState } from "react";
import { LabelDivider } from "@repo/component/ui/label/LabelDivider";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";
import { useNavigate } from "react-router-dom";

type ForgotPasswordFormData = {
    email?: string;
    otp?: string;
    password?: string;
    confirm?: string;
};

type OTPProps = GetProps<typeof Input.OTP>;

const sharedProps: OTPProps = {
    onChange: (text) => { console.log('onChange:', text) },
    onInput: (value) => { console.log('onInput:', value) }
};

const ForgotPassword = () => {
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState<string>("");
    const [form] = Form.useForm<ForgotPasswordFormData>();
    const [countdown, setCountdown] = useState<number>(60);
    const navigate = useNavigate();

    const isOtpStep = step === "otp";
    const canResend = countdown === 0;

    useEffect(() => {
        if (!isOtpStep || countdown === 0) return;
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, isOtpStep]);

    const onSubmitEmail = async ({ email }: ForgotPasswordFormData) => {
        try {
            setEmail(email!);
            setStep("otp");
            setCountdown(60);
            alert("Mã OTP đã được gửi đến email!");
        } catch {
            alert("Không thể gửi OTP. Vui lòng thử lại!");
        }
    };

    const onSubmitReset = async () => {
        try {
            alert("Mật khẩu đã được đặt lại!");
            navigate("/account/login");
        } catch (error) {
            alert("OTP không đúng hoặc có lỗi xảy ra.");
        }
    };

    const handleResendOtp = async () => {
        try {
            // Gọi lại API gửi OTP ở đây
            setCountdown(60);
            alert("Đã gửi lại mã OTP!");
        } catch (error) {
            alert("Không thể gửi lại mã OTP. Vui lòng thử lại!");
        }
    };

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: 'black'
            }
        }}>
            <Row justify={"center"} align={"middle"}>
                <Col span={8}>
                    <Card title="Quên mật khẩu" className="boxShadow" styles={{
                        header: {
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                            borderBottom: 'none'
                        }
                    }}>
                        <Form name="forgot-pass" form={form} onFinish={isOtpStep ? onSubmitReset : onSubmitEmail}>
                            <RenderCondition condition={!isOtpStep}>
                                <Form.Item name="email" rules={[{ type: 'email', message: 'Không đúng định dạng Email!' },
                                { required: true, message: 'Không để trống Email!' }]}>
                                    <Input prefix={<UserOutlined />} placeholder="Nhập email tài khoản" autoComplete="email" />
                                </Form.Item>
                            </RenderCondition>
                            <RenderCondition condition={isOtpStep}>
                                <>
                                    <Form.Item extra={`Chúng tôi đã gửi mã về email ${email}.`}>
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Form.Item name="otp" noStyle rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
                                                    <Input.OTP length={4} {...sharedProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Button block disabled={!canResend} onClick={handleResendOtp}>
                                                    <RenderCondition condition={canResend}>Gửi lại mã</RenderCondition>
                                                    <RenderCondition condition={!canResend}>Gửi lại sau {countdown}s</RenderCondition>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item name="password" hasFeedback
                                        rules={[{ required: true, message: 'Không để trống mật khẩu!' },
                                        { min: 8, max: 16, message: "Mật khẩu phải từ 8 - 16 kí tự!" },
                                        {
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@*!#])[A-Za-z\d@*!#]{8,16}$/,
                                            message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (@, *, !, #)'
                                        }]}>
                                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" autoComplete='new-password' />
                                    </Form.Item>
                                    <Form.Item name="confirm" dependencies={['password']} hasFeedback
                                        rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value || getFieldValue('password') != value) return Promise.reject(new Error('Xác nhận mật khẩu không chính xác!'));
                                                return Promise.resolve();
                                            },
                                        })]}>
                                        <Input.Password prefix={<SafetyOutlined />} placeholder="Nhập xác nhận mật khẩu" autoComplete='new-password' />
                                    </Form.Item>
                                </>
                            </RenderCondition>
                            <Form.Item>
                                <Button block color="default" variant="solid" htmlType="submit">
                                    <RenderCondition condition={step === "email"}>Tìm lại mật khẩu</RenderCondition>
                                    <RenderCondition condition={step === "otp"}>Đặt lại mật khẩu</RenderCondition>
                                </Button>
                                <Divider orientation="center">
                                    <LabelDivider label={<>
                                        <LinkBasic isHover={true} to="/account/login" color="black">Đăng nhập</LinkBasic>
                                        <span style={{ padding: '0 5px' }}>hoặc</span>
                                        <LinkBasic isHover={true} to="/account/register" color="black">đăng ký ngay!</LinkBasic>
                                    </>} />
                                </Divider>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </ConfigProvider>
    )
}

export default ForgotPassword;