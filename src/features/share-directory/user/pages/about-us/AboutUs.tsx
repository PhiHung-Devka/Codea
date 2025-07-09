import { Divider, Typography, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
    return (
        <div className="container">
            <Typography>
                <Title level={2}>GIỚI THIỆU VỀ CODEA – STYLE BE THE LIFE</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    <Text strong>CODEA</Text> là một thương hiệu thời trang áo thun custom dành cho Gen Z – những người trẻ yêu sự tự do, cá tính và thích thể hiện bản thân theo cách riêng.
                    Chúng mình tin rằng thời trang không chỉ là thứ để mặc, mà còn là ngôn ngữ để kể câu chuyện của mỗi người.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    CODEA bắt đầu từ một ý tưởng đơn giản: tạo nên những chiếc áo mang hơi thở của tự do và cá tính.
                    Mỗi người đều có một chất riêng đáng để thể hiện – và thời trang là cách mạnh mẽ nhất để kể câu chuyện ấy.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    Tại CODEA, bạn không chỉ mua một chiếc áo – bạn đang góp phần định hình nó.
                    Từ màu sắc, hình in đến thông điệp, mọi chi tiết đều có thể được chọn lựa và điều chỉnh để phản ánh đúng gu thẩm mỹ, cảm xúc và cá tính của riêng bạn.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng tôi tạo ra không gian cho sự tự do sáng tạo, nơi mỗi sản phẩm là một bản thể độc lập – không sao chép, không rập khuôn.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    CODEA tin rằng: <Text strong>Thời trang không chỉ để mặc. Thời trang là để thể hiện.</Text>
                </Paragraph>

                <Divider />

                <Title level={3}>1. CUSTOM ÁO, TẠO CHẤT – TỰ DO LÀ ĐIỀU DUY NHẤT CODEA HƯỚNG ĐẾN</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Với CODEA, bạn không cần phải là nhà thiết kế – bạn chỉ cần là chính bạn.
                    Mỗi chiếc áo bạn đặt là một phiên bản độc nhất – từ kiểu chữ, câu quote, màu áo cho đến hình ảnh mang ý nghĩa riêng.
                    Tụi mình hỗ trợ bạn trong suốt quá trình lên ý tưởng, hoàn thiện chiếc áo <Text italic>"có một không hai"</Text> đúng vibe bạn muốn.
                </Paragraph>
                <Space direction="vertical">
                    <Text style={{ fontSize: 16 }}>• Bạn có thể tự do sáng tạo</Text>
                    <Text style={{ fontSize: 16 }}>• Chúng mình không sản xuất hàng loạt</Text>
                    <Text style={{ fontSize: 16 }}>• Chúng mình chăm chút từng chi tiết</Text>
                </Space>

                <Divider />

                <Title level={3}>2. CODEA LÀ GÌ TRONG THẾ GIỚI CỦA GEN Z?</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Trong một thế giới ai cũng có thể trở thành “content creator” thì CODEA chọn trở thành nền tảng để bạn bắt đầu tạo trend cho chính mình.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng mình không theo đuổi việc sản xuất ào ạt hay tạo ra bộ sưu tập “xịn sò” mỗi mùa – mà muốn xây một nơi bạn có thể ghé vào,
                    đặt một chiếc áo đúng với tâm trạng hôm nay, và tự tin diện nó ra đường như thể: “Đây là mình”.
                </Paragraph>

                <Divider />

                <Title level={3}>3. CHỌN CODEA – CHỌN CHÍNH MÌNH</Title>
                <Paragraph style={{ fontSize: 16 }}>
                    Chúng mình không cố gắng làm ra chiếc áo đẹp nhất, nhưng sẽ giúp bạn làm ra chiếc áo mang nhiều ý nghĩa nhất.
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                    CODEA là lựa chọn của những người:
                </Paragraph>
                <Space direction="vertical">
                    <Text style={{ fontSize: 16 }}>• Yêu sự khác biệt và muốn tôn vinh cá tính riêng</Text>
                    <Text style={{ fontSize: 16 }}>• Muốn tặng người thân một món quà thực sự mang dấu ấn cá nhân</Text>
                    <Text style={{ fontSize: 16 }}>• Muốn kể câu chuyện đời mình thông qua một chiếc áo</Text>
                    <Text style={{ fontSize: 16 }}>• Hay đơn giản, là những người yêu cái đẹp theo cách của riêng mình</Text>
                </Space>
            </Typography>
        </div>
    );
};

export default AboutUs;