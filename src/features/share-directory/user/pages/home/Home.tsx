// import styles from "./Home.module.scss";
import { Carousel } from "antd";
import { ProductList } from "@repo/component/ui/list/ProductList";
import { bannerApi, homeApi } from "@repo/packages/services";

const Home = () => {
    const bannerQuery = bannerApi.queries.readQuery();
    const homeProduct = homeApi.queries.readQuery();

    return (
        <section>
            <div className="container-fluid">
                <Carousel draggable autoplay={{ dotDuration: true }} autoplaySpeed={4000} pauseOnHover={false}>
                    {bannerQuery.data?.map((item) => (
                        <img key={item.bannerId} src={item.bannerUrl} alt={item.bannerUrl} style={{ width: '100%' }} />
                    ))}
                </Carousel>
            </div>
            <div className="container">
                <div>
                    <ProductList products={homeProduct.data ?? []} />
                </div>
            </div>
        </section>
    );
}

export default Home;