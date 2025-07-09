import { Typography, Divider, } from "antd";

const { Title, Paragraph, Text } = Typography;

const ReturnPolicy = () => {
    return (
        <div className="container">
            <Typography>
                <Title level={2}>CHÍNH SÁCH ĐỔI/TRẢ SẢN PHẨM – CODEA</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng tôi luôn nỗ lực để mang lại trải nghiệm mua sắm tốt nhất cho khách hàng.
                    Trong trường hợp sản phẩm không như mong đợi, Codea hỗ trợ đổi/trả theo chính sách dưới đây:
                </Paragraph>

                <Divider />

                <Title level={3}>1. Thời gian đổi/trả</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Quý khách có thể yêu cầu đổi/trả trong vòng <Text strong>03 ngày</Text> kể từ khi nhận được hàng (tính theo ngày ghi trên đơn giao hàng).</li>
                        <li>Quá thời gian trên, chúng tôi xin phép từ chối mọi yêu cầu liên quan.</li>
                    </ul>
                </Paragraph>

                <Title level={3}>2. Điều kiện đổi/trả</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <Text strong style={{ fontSize: 16 }}>Sản phẩm sẽ được chấp nhận đổi/trả nếu:</Text>
                    <ul>
                        <li>Còn nguyên tem mác, chưa qua sử dụng, không giặt, không bị bẩn hoặc hư hỏng.</li>
                        <li>Có video/ảnh quay lại quá trình mở hàng (unbox) để xác minh lỗi nếu có.</li>
                        <li>Sản phẩm bị giao sai mẫu, size hoặc bị lỗi sản xuất (rách, bung chỉ, lỗi in/thiết kế,...).</li>
                    </ul>
                    <Text strong style={{ fontSize: 16 }}>Không áp dụng đổi trả đối với:</Text>
                    <ul>
                        <li>Sản phẩm nằm trong danh mục ưu đãi giảm giá trên 50%, hoặc đặt theo yêu cầu riêng.</li>
                        <li>Các trường hợp đổi trả do sở thích cá nhân như: không thích màu, thay đổi ý định mua,…</li>
                    </ul>
                </Paragraph>

                <Title level={3}>3. Chi phí đổi/trả</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li><Text strong>Miễn phí</Text> đổi trả trong trường hợp lỗi do Codea (sai hàng, lỗi kỹ thuật).</li>
                        <li><Text strong>Khách hàng chịu phí</Text> vận chuyển hai chiều nếu đổi do nhu cầu cá nhân (đổi size, đổi mẫu).</li>
                    </ul>
                </Paragraph>

                <Title level={3}>4. Quy trình đổi/trả</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ol>
                        <li>Gửi yêu cầu về email: <Text code>codealab.vn@gmail.com</Text> hoặc hotline: <Text code>+84 344966647 (Ms. Kim)</Text></li>
                        <li>Đội ngũ Codea xác nhận và hướng dẫn gửi hàng về kho.</li>
                        <li>Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ gửi sản phẩm thay thế hoặc hoàn tiền theo thỏa thuận.</li>
                    </ol>
                </Paragraph>
            </Typography>
        </div>
    );
};

export default ReturnPolicy;