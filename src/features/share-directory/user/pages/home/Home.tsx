import "./Home.scss";
import { Carousel } from "antd";
import { ProductList } from "@repo/component/ui/list/ProductList";
import { bannerApi, homeApi } from "@repo/packages/services";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { CardBasic } from "@repo/component/ui";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
    const bannerQuery = bannerApi.queries.readQuery();
    const homeProduct = homeApi.queries.readQuery();
    const saleProduct = homeApi.queries.saleQuery();
    const options: EmblaOptionsType = { align: 'start', slidesToScroll: 'auto', loop: true };
    const autoplayOptions = { delay: 3000, stopOnInteraction: false };
    const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

    return (
        <section>
            <div className="container-fluid">
                <Carousel draggable autoplay={{ dotDuration: true }} autoplaySpeed={4000} pauseOnHover={false}>
                    {bannerQuery.data?.map((item) => (
                        <img key={item.bannerId} src={item.bannerUrl} alt={item.bannerUrl} style={{ width: '100%' }} />
                    ))}
                </Carousel>
            </div>
            <RenderCondition condition={!!saleProduct.data}>
                <div className="embla">
                    <span className="embla_sale">SALE OFF</span>
                    <section className="embla_wrapper">
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className="embla__container">
                                {saleProduct.data?.products.map(p => (
                                    <div className="embla__slide" key={p.productId}>
                                        <CardBasic {...p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </RenderCondition>
            <div className="container">
                <div>
                    <ProductList products={homeProduct.data ?? []} />
                </div>
            </div>
        </section>
    );
}

export default Home;