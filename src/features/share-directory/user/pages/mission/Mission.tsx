import { Typography, Divider, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const Mission = () => {
    return (
        <div className="container" style={{ padding: "20px 0" }}>
            <Typography>
                <Title level={2}>TẦM NHÌN, SỨ MỆNH, GIÁ TRỊ CỐT LÕI</Title>

                <Divider />

                <Title level={3}>1. TẦM NHÌN</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Trở thành thương hiệu thời trang sáng tạo đi đầu xu hướng Gen Z – nơi mỗi người có thể thể hiện bản sắc riêng qua từng chi tiết thiết kế.
                    CODEA muốn biến áo thun thành ngôn ngữ cá tính và độc đáo của mỗi cá nhân.
                </Paragraph>

                <Divider />

                <Title level={3}>2. SỨ MỆNH</Title>
                <Space direction="vertical" size={8}>
                    <Text style={{ fontSize: 16 }}>• Cho người mua tự sáng tạo thiết kế mang đậm màu sắc cá nhân.</Text>
                    <Text style={{ fontSize: 16 }}>• Đi đầu xu hướng thể hiện cái đẹp hiện đại, cá tính và tự do.</Text>
                    <Text style={{ fontSize: 16 }}>• Biến sự sáng tạo thành câu chuyện và thông điệp qua sản phẩm.</Text>
                </Space>

                <Divider />

                <Title level={3}>3. GIÁ TRỊ CỐT LÕI</Title>
                <Space direction="vertical" size={8}>
                    <Text style={{ fontSize: 16 }}>
                        • <strong>Phá vỡ khuôn mẫu:</strong> CODEA tôn trọng sự khác biệt, giúp khách hàng kể câu chuyện riêng qua trang phục.
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        • <strong>Dẫn đầu xu hướng Gen Z:</strong> Luôn cập nhật xu hướng, phong cách và tư duy thiết kế mới, kết nối với giới trẻ hiện đại.
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        • <strong>Chất lượng và trách nhiệm:</strong> CODEA sáng tạo nhưng vẫn hướng đến phát triển bền vững, mang lại trải nghiệm tốt nhất cho khách hàng.
                    </Text>
                </Space>
            </Typography>
        </div>
    );
};

export default Mission;
