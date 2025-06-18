import styles from "./Home.module.scss";
import { Carousel, Col, Row } from "antd";
import slider3 from "@repo/assets/images/slider_3.webp";
import slider5 from "@repo/assets/images/slider_5.webp";
import { CardBasic } from "@repo/component/ui";
import { userApi } from "@repo/packages/services";
import { useEffect } from "react";

const bannerList = [
    { src: slider3, alt: "Codea" },
    { src: slider5, alt: "Codea" }
];

const { data } = userApi.queries.readQuery();

useEffect(() => {
    if (data) {
        console.log("User data:", data);
    }
}, [data]);

const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <Carousel draggable adaptiveHeight arrows autoplay={{ dotDuration: true }} autoplaySpeed={4000}>
                    {bannerList.map(({ src, alt }, index) => (
                        <div key={index}>
                            <img style={{ width: '100%' }} src={src} alt={alt} />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="container">

                <section style={{ margin: '20px 0' }}>
                    <div className="section-product">
                        <div className="block-title">Handmade</div>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                            <Col className="gutter-row" span={6}>
                                <CardBasic img1="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103"
                                    img2="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760"
                                    name="Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069" price={350000} realPrice={195000}>
                                </CardBasic>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CardBasic img1="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103"
                                    img2="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760"
                                    name="Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069" price={350000} realPrice={195000}>
                                </CardBasic>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CardBasic img1="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103"
                                    img2="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760"
                                    name="Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069" price={350000} realPrice={195000}>
                                </CardBasic>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CardBasic img1="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103"
                                    img2="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760"
                                    name="Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069" price={350000} realPrice={195000}>
                                </CardBasic>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CardBasic img1="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103"
                                    img2="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760"
                                    name="Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069" price={350000} realPrice={195000}>
                                </CardBasic>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CardBasic img1="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103"
                                    img2="https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760"
                                    name="Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069" price={350000} realPrice={195000}>
                                </CardBasic>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </>
    );

}

export default Home;