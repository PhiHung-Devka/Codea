// import styles from "./Home.module.scss";
import { Carousel, Spin } from "antd";
import { ProductList } from "@repo/component/ui/list/ProductList";
import { bannerApi, homeApi } from "@repo/packages/services";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Home = () => {
    const bannerQuery = bannerApi.queries.readQuery();
    const homeProduct = homeApi.queries.readQuery();
    const [percent, setPercent] = React.useState(0);

    return (
        <section>
            <Spin spinning={bannerQuery.isLoading || !bannerQuery.data} indicator={<LoadingOutlined spin />} size="large" fullscreen />
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