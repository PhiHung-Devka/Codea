import { LinkBasic } from '@repo/component/ui';
import { RenderCondition } from '@repo/component/ui/common/RenderCondition';
import { LabelDivider } from '@repo/component/ui/label/LabelDivider';
import type { GetProps } from 'antd';
import { Button, Card, Col, Divider, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';

type OTPProps = GetProps<typeof Input.OTP>;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const Register = () => {
    const [countdown, setCountdown] = useState<number>(0);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        alert('Đăng ký thành công!');
    };

    const otpProps: OTPProps = {
        onChange: (text) => console.log('onChange:', text),
        onInput: (value) => console.log('onInput:', value),
    };

    useEffect(() => {
        if (countdown === 0) return;
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSendOTP = () => {
        setCountdown(60);
    };

    return (
        <Row justify={"center"} align={"middle"}>
            <Col span={10}>
                <Card title="Đăng ký tài khoản" className="boxShadow" styles={{
                    header: {
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        borderBottom: 'none'
                    }
                }}>
                    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
                        <Form.Item name="email" label="E-mail" rules={[
                            { type: 'email', message: 'Không đúng định dạng Email!' },
                            { required: true, message: 'Không để trống Email!' },
                        ]}>
                            <Input autoComplete='email' placeholder='Nhập email tài khoản' />
                        </Form.Item>
                        <Form.Item name="fullname" label="Họ và tên"
                            rules={[{ required: true, message: 'Không để trống họ và tên!' },
                            { pattern: /^[A-Za-zÀ-ỹ\s]+$/u, message: 'Họ và tên chỉ được chứa chữ cái và khoảng trắng!' }]}>
                            <Input autoComplete='name' placeholder='Nhập họ và tên' />
                        </Form.Item>
                        <Form.Item name="password" label="Mật khẩu" hasFeedback
                            rules={[{ required: true, message: 'Không để trống mật khẩu!' },
                            { min: 8, max: 16, message: "Mật khẩu phải từ 8 - 16 kí tự!" },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@*!#])[A-Za-z\d@*!#]{8,16}$/,
                                message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (@, *, !, #)'
                            }]}>
                            <Input.Password autoComplete='new-password' placeholder='Nhập mật khẩu' />
                        </Form.Item>
                        <Form.Item name="confirm" label="Xác nhận mật khẩu" dependencies={['password']} hasFeedback
                            rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Xác nhận mật khẩu không chính xác!'));
                                },
                            })]}>
                            <Input.Password autoComplete='new-password' placeholder='Nhập xác nhận mật khẩu' />
                        </Form.Item>
                        <Form.Item label="OTP" extra="Chúng tôi sẽ gửi mã về email của bạn.">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item name="otp" noStyle rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
                                        <Input.OTP length={4} {...otpProps} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Button block onClick={handleSendOTP} disabled={countdown > 0}>
                                        <RenderCondition condition={countdown === 0}>Gửi mã</RenderCondition>
                                        <RenderCondition condition={countdown > 0}>Gửi lại sau {countdown}s</RenderCondition>
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button htmlType="submit" color="default" variant="solid" block>Đăng ký</Button>
                            <Divider orientation="center">
                                <LabelDivider label={<>Đã có tài khoản? <LinkBasic isHover={true} to="/account/login" color="black">Đăng nhập ngay!</LinkBasic></>} />
                            </Divider>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row >
    )
}

export default Register;