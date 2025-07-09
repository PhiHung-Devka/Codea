import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

const PrivacyPolicy = () => {
    return (
        <div className="container">
            <Typography style={{ fontSize: 16 }}>
                <Title level={2}>CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG – CODEA</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng tôi cam kết bảo vệ mọi thông tin cá nhân của khách hàng như một phần không thể tách rời trong việc xây dựng niềm tin thương hiệu.
                </Paragraph>

                <Divider />

                <Title level={3}>1. Thu thập thông tin</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng tôi chỉ thu thập những thông tin cần thiết như:
                    <ul>
                        <li>Họ tên, số điện thoại, địa chỉ giao hàng.</li>
                        <li>Email, lịch sử đơn hàng, phản hồi và đánh giá.</li>
                    </ul>
                </Paragraph>

                <Title level={3}>2. Mục đích sử dụng</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Dùng để xác nhận đơn hàng, giao hàng nhanh chóng và chính xác.</li>
                        <li>Cung cấp thông tin khuyến mãi, giảm giá (nếu khách hàng đồng ý).</li>
                        <li>Cải thiện chất lượng dịch vụ và chăm sóc khách hàng.</li>
                    </ul>
                </Paragraph>

                <Title level={3}>3. Bảo mật và lưu trữ</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Mọi dữ liệu được lưu trữ an toàn trên hệ thống có bảo mật.</li>
                        <li>Nhân viên Codea được đào tạo nghiêm ngặt về bảo mật thông tin khách hàng.</li>
                        <li>Không chia sẻ cho bất kỳ bên thứ ba nào trừ khi có yêu cầu từ cơ quan pháp luật.</li>
                    </ul>
                </Paragraph>

                <Title level={3}>4. Quyền của khách hàng</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Quý khách có quyền yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân bất kỳ lúc nào bằng cách liên hệ với chúng tôi.</li>
                        <li>Có thể từ chối nhận email tiếp thị bằng cách nhấp "Hủy đăng ký" ở cuối mỗi email.</li>
                    </ul>
                </Paragraph>
            </Typography>
        </div>
    );
};

export default PrivacyPolicy;
