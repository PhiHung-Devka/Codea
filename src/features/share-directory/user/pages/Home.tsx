import styles from "./Home.module.scss";
import { Carousel, Col, Row } from "antd";
import slider3 from "@repo/assets/images/slider_3.webp";
import slider5 from "@repo/assets/images/slider_5.webp";
import { CardBasic } from "@repo/component/ui";
import { userApi } from "@repo/packages/services";

const bannerList = [
    { src: slider3, alt: "Codea" },
    { src: slider5, alt: "Codea" }
];


const Home = () => {
    const { data: users, isLoading, error } = userApi.queries.readQuery();

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi xảy ra khi tải dữ liệu</p>;

    console.table(users);

    const products = new Array(6).fill({
        img1: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103",
        img2: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760",
        name: "Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069",
        price: 350000,
        realPrice: 195000,
    });

    return (
        <>
            <div className="container-fluid">
                <Carousel draggable autoplay={{ dotDuration: true }} autoplaySpeed={4000} pauseOnHover={false}>
                    {bannerList.map(({ src, alt }, index) => (
                        <img key={index} style={{ width: '100%' }} src={src} alt={alt} />
                    ))}
                </Carousel>
            </div>
            <div className="container">
                <section style={{ margin: '20px 0' }}>
                    <div className="section-product">
                        <div className="block-title">Handmade</div>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                            {products.map((p, i) => (
                                <Col key={i} className="gutter-row" span={6}>
                                    <CardBasic {...p} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>
            </div>
        </>
    );

}

export default Home;