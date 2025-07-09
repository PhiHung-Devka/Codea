import { Typography, Divider } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const PurchasePolicy = () => {
    return (
        <div className="container">
            <Typography>
                <Title level={2}>CHÍNH SÁCH MUA HÀNG - CODEA</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng tôi xin chân thành cảm ơn Quý khách đã lựa chọn và đồng hành cùng thương hiệu thời trang thiết kế CODEA – Style Be The Life.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    Khi quý khách truy cập và thực hiện các hoạt động mua sắm tại website{" "}
                    <Link to="https://codea.click" target="_blank">https://codea.click</Link>, điều đó đồng nghĩa với việc quý khách đã đồng ý
                    tuân thủ những quy định trong chính sách mua hàng này. CODEA có thể điều chỉnh nội dung chính sách bất kỳ lúc nào mà không cần thông báo trước.
                </Paragraph>

                <Divider />

                <Title level={3}>1. Quy định khi sử dụng website</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Website chỉ dành cho người dùng từ đủ 18 tuổi hoặc có sự giám sát của phụ huynh.</li>
                        <li>Khuyến khích tạo tài khoản để theo dõi đơn hàng. Bảo mật thông tin tài khoản là trách nhiệm của người dùng.</li>
                        <li>Nghiêm cấm sử dụng website với mục đích thương mại, sao chép nội dung hoặc giả mạo CODEA.</li>
                        <li>CODEA có quyền khóa tài khoản vi phạm mà không cần báo trước.</li>
                        <li>Người dùng có thể nhận hoặc hủy thông tin khuyến mãi qua email bất cứ lúc nào.</li>
                    </ul>
                </Paragraph>

                <Divider />

                <Title level={3}>2. Đặt hàng và chính sách giá</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Tất cả đơn hàng sẽ được kiểm tra, xác nhận trước khi xử lý.</li>
                        <li>CODEA có quyền từ chối các đơn hàng không rõ ràng, bất thường.</li>
                        <li>Giá sản phẩm hiển thị là giá cuối cùng đã bao gồm VAT. Phí vận chuyển sẽ hiển thị riêng khi thanh toán.</li>
                        <li>Giá có thể thay đổi theo chương trình ưu đãi.</li>
                    </ul>
                </Paragraph>

                <Divider />

                <Title level={3}>3. Quyền sở hữu nội dung & bản quyền</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Toàn bộ nội dung trên website <Text strong>codea.click</Text> là tài sản của CODEA hoặc đối tác được cấp phép.
                    Nghiêm cấm sao chép, chỉnh sửa, sử dụng cho mục đích thương mại nếu không có sự đồng ý bằng văn bản.
                </Paragraph>

                <Divider />

                <Title level={3}>4. Hình thức mua hàng & thanh toán</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <Text strong style={{ fontSize: 16 }}>(a) Thanh toán trước:</Text>
                    <ul>
                        <li>Chọn sản phẩm và đặt hàng.</li>
                        <li>Thanh toán qua mã QR ngân hàng (Vietcombank, BIDV, MB,...).</li>
                        <li>Xác nhận đơn hàng và giao hàng.</li>
                        <li>Quý khách nhận và kiểm tra sản phẩm.</li>
                    </ul>
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    <Text strong style={{ fontSize: 16 }}>(b) Thanh toán khi nhận hàng (COD):</Text>
                    <ul>
                        <li>Chọn sản phẩm và đặt hàng.</li>
                        <li>CODEA xác nhận đơn và gửi hàng.</li>
                        <li>Thanh toán khi nhận hàng từ nhân viên giao hàng.</li>
                    </ul>
                </Paragraph>

                <Divider />

                <Title level={3}>5. Điều chỉnh hoặc hủy đơn hàng</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Vui lòng liên hệ sớm với bộ phận hỗ trợ nếu cần thay đổi/hủy đơn:
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    <ul>
                        <li>Email: <Text code>codealab.vn@gmail.com</Text></li>
                        <li>Hotline: <Text code>+84 344966647 (Ms. Kim)</Text> – Giờ hành chính: Thứ 2 - Thứ 6, 9:00 - 17:00</li>
                    </ul>
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    Việc đổi/trả hàng sẽ tuân theo <Link to="/return-policy">Chính sách đổi/trả</Link> cụ thể được công bố trên website.
                </Paragraph>
            </Typography>
        </div>
    );
};

export default PurchasePolicy;