import styles from "./Home.module.scss";
import { Carousel } from "antd";
import slider3 from "@repo/assets/images/slider_3.webp";
import slider5 from "@repo/assets/images/slider_5.webp";
import { ProductList } from "@repo/component/ui/list/ProductList";

const bannerList = [
    { src: slider3, alt: "Codea" },
    { src: slider5, alt: "Codea" }
];

const Home = () => {
    const products = Array.from({ length: 8 }, (_, i) => ({
        id: String(i + 1),
        img1: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103",
        img2: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760",
        name: "Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069",
        price: 350000,
        realPrice: 195000,
    }));

    return (
        <section>
            <div className="container-fluid">
                <Carousel draggable autoplay={{ dotDuration: true }} autoplaySpeed={4000} pauseOnHover={false}>
                    {bannerList.map(({ src, alt }, index) => (
                        <img key={index} style={{ width: '100%' }} src={src} alt={alt} />
                    ))}
                </Carousel>
            </div>
            <div className="container">
                <div>
                    <div className={styles["home__cardTitle"]}>Handmade</div>
                    <ProductList products={products} />
                </div>
            </div>
        </section>
    );
}

export default Home;