import { Button, Card, Col, ConfigProvider, Form, Input, Row } from "antd";
import { LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useNotify } from "@repo/component/ui/notification/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@repo/packages/services";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useAuthStore } from "@repo/packages/stores";

type ChangePasswordFormData = {
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
};

const ForgotPassword = () => {
    const [form] = Form.useForm<ChangePasswordFormData>();
    const notify = useNotify();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    const mutationEdit = useMutation({
        mutationFn: userApi.apis.changePassword,
        onSuccess: () => {
            notify?.success({ message: "Thay đổi mật khẩu thành công!" });
            queryClient.invalidateQueries({ queryKey: [REPO_CONSTANT.QUERY_KEYS.user.base] });
            navigate("/admin/banner");
        },
        onError: (err: any) => {
            const message = typeof err === "string" ? err : err?.message || err?.error || "Vui lòng thử lại.";
            notify?.error({ message: "Đăng nhập thất bại!", description: message });
        }
    });

    const onFinish = async (values: ChangePasswordFormData) => {
        mutationEdit.mutate({
            email: user!.email,
            oldPassword: values.oldPassword!,
            newPassword: values.newPassword!,
        })
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
                        <Form name="forgot-pass" form={form} onFinish={onFinish}>
                            <Form.Item name="oldPassword" hasFeedback rules={[{ required: true, message: 'Không để trống mật khẩu!' }]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu cũ" autoComplete='old-password' />
                            </Form.Item>
                            <Form.Item name="newPassword" hasFeedback
                                rules={[{ required: true, message: 'Không để trống mật khẩu!' },
                                { min: 8, max: 16, message: "Mật khẩu phải từ 8 - 16 kí tự!" },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@*!#])[A-Za-z\d@*!#]{8,16}$/,
                                    message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (@, *, !, #)'
                                }]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" autoComplete='new-password' />
                            </Form.Item>
                            <Form.Item name="confirm" dependencies={['newPassword']} hasFeedback
                                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue('newPassword') && getFieldValue('newPassword') !== value) {
                                            return Promise.reject(new Error('Xác nhận mật khẩu không chính xác!'));
                                        }
                                        return Promise.resolve();
                                    },
                                })]}>
                                <Input.Password prefix={<SafetyOutlined />} placeholder="Nhập xác nhận mật khẩu" autoComplete='confirm' />
                            </Form.Item>
                            <Form.Item>
                                <Button block color="default" variant="solid" htmlType="submit">
                                    Thay đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </ConfigProvider>
    )
}

export default ForgotPassword;