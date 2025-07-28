import { Col, Image, Row, Button, Flex, Form, Rate, Progress, Input, ConfigProvider, Modal, type ModalProps, Segmented } from "antd";
import { InfoCircleOutlined, MinusOutlined, PlusOutlined, SendOutlined, StarFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.scss";
import { useEffect, useState } from "react";
import noCmt from "@repo/assets/images/imgStar.png";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";
import { productApi } from "@repo/packages/services/api/product.api";
import type { ProductDetail } from "@repo/packages/types";
import { useAuthStore } from "@repo/packages/stores";
import { useNotify } from "@repo/component/ui/notification/Notification";
import { cartApi } from "@repo/packages/services/api/cart.api";
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react'
import { feedbackApi } from "@repo/packages/services/api/feedback.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import type { FeedbackCreateBody } from "@repo/packages/types/domain/feedback.type";

const { TextArea } = Input;

type ModalBasicProps = ModalProps & {
    id: number
}

const CommentModal = ({ open, onCancel, id }: ModalBasicProps) => {
    const [rating, setRating] = useState(0);
    const [form] = Form.useForm();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    const ratingLabel = ['', 'Không thích', 'Tạm được', 'Bình thường', 'Khá tốt', 'Tuyệt vời'];

    const mutationCreate = useMutation({
        mutationFn: feedbackApi.apis.create,
        onSuccess: () => {
            notify?.success({ message: "Đánh giá sản phẩm thành công!" });
            queryClient.invalidateQueries({ queryKey: [REPO_CONSTANT.QUERY_KEYS.feedback.base] });
            onCancel;
        },
        onError: () => {
            notify?.error({ message: "Đánh giá sản phẩm thất bại!" });
        }
    });

    const handleOK = async () => {
        try {
            const values = await form.validateFields();

            if (!rating) {
                notify?.warning({ message: "Vui lòng chọn số sao đánh giá!" });
                return;
            }

            if (!user || !user.userId) {
                notify?.warning({ message: "Vui lòng đăng nhập để đánh giá sản phẩm" });
                return;
            }

            const payload: FeedbackCreateBody = {
                productId: Number(id),
                userId: user.userId,
                comment: values.content,
                star: rating
            }

            mutationCreate.mutate(payload);
        } catch (error) {

        }
    }

    return (
        <Modal open={open} onOk={handleOK} onCancel={onCancel} closable={false}
            footer={[
                <Button key="back" onClick={onCancel}>Hủy</Button>,
                <Button key="submit" type="primary" danger onClick={handleOK}>Gửi</Button>
            ]}>
            <Flex align="center" gap={10} className={styles["pdd__cmtWrapper--chooseRate"]}>
                <p>Chọn đánh giá của bạn</p>
                <Rate onChange={setRating} value={rating} />
                <span>{rating > 0 && ratingLabel[rating]}</span>
            </Flex>
            <Form form={form} layout="vertical">
                <Form.Item name="content" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                    tooltip={{ title: "Nội dung không được để trống", icon: <InfoCircleOutlined /> }}>
                    <TextArea rows={4} placeholder="Chia sẻ đánh giá của bạn" />
                </Form.Item>
            </Form>
        </Modal>
    )
};

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const notify = useNotify();
    const productId = Number(id);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [filterStar, setFilterStar] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
    const [selectedTab, setSelectedTab] = useState("Mô tả sản phẩm");
    const options: EmblaOptionsType = { align: 'start', slidesToScroll: 'auto' };
    const [emblaRef] = useEmblaCarousel(options)

    const detailQuery = productApi.queries.detailQuery(productId, true);
    const productDetails: ProductDetail[] = detailQuery.data?.productDetails || [];
    const feedbackQuery = feedbackApi.queries.readQuery(productId);
    const feedbacks = feedbackQuery.data || [];

    const starCounts = [1, 2, 3, 4, 5].map(star => ({ star, count: feedbacks.filter(f => f.star === star).length })).reverse();

    const totalRating = feedbacks.length;

    const ratingAverage = totalRating === 0 ? 0 : feedbacks.reduce((sum, f) => sum + f.star, 0) / totalRating;

    const handleAddToCart = async () => {
        if (!user) {
            notify?.warning({ message: "Vui lòng đăng nhập để thêm vào giỏ hàng" });
            return;
        }

        const sizeObj = sizes.find((s: any) =>
            typeof s === "object" && s.size === selectedSize
        );

        try {
            await cartApi.apis.create({ userId: user.userId, productDetailSizeId: sizeObj.productDetailSizeId, quantity });
            notify?.success({ message: "Đã thêm vào giỏ hàng" });
        } catch (err) {
            notify?.error({ message: "Thêm vào giỏ hàng thất bại" });
        }
    };

    useEffect(() => {
        if (productDetails.length > 0 && !selectedProduct) {
            setSelectedProduct(productDetails[0]);
            if ('sizes' in productDetails[0] && Array.isArray(productDetails[0].sizes)) {
                setSelectedSize(typeof productDetails[0].sizes[0] === 'string' ? productDetails[0].sizes[0] : productDetails[0].sizes[0]?.size || "");
            } else {
                setSelectedSize("");
            }
        }
    }, [productDetails]);

    useEffect(() => {
        if (selectedProduct && 'galleries' in selectedProduct && selectedProduct.galleries.length > 0) {
            const isCurrentImageInGallery = selectedProduct.galleries.some(g => g.imageUrl === selectedImageUrl);
            if (!isCurrentImageInGallery) setSelectedImageUrl(selectedProduct.galleries[0].imageUrl);
        }
    }, [selectedProduct]);

    const handleSelectColor = (product: ProductDetail) => {
        setSelectedProduct(product);
        if ('sizes' in product && Array.isArray(product.sizes)) {
            setSelectedSize(typeof product.sizes[0] === 'string' ? product.sizes[0] : product.sizes[0]?.size || "");
        } else {
            setSelectedSize("");
        }
    };

    const handleSelectSize = (size: string) => setSelectedSize(size);

    const filteredComments = filterStar ? feedbacks.filter(c => c.star === filterStar) : feedbacks;

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

    let sizes: any[] = [];
    let colorName = "";
    let colorHex = "";
    if (selectedProduct) {
        if ('galleries' in selectedProduct) {
            sizes = selectedProduct.sizes || [];
            colorName = selectedProduct.color?.name;
            colorHex = selectedProduct.color?.hexCode;
        }
    }
    const sizeObj = sizes.find((s: any) => (typeof s === 'string' ? s === selectedSize : s.size === selectedSize));
    const price = sizeObj && typeof sizeObj === 'object' ? (sizeObj.realPrice?.toLocaleString() + "đ") : "";
    const oldPrice = sizeObj && typeof sizeObj === 'object' ? (sizeObj.price?.toLocaleString() + "đ") : "";
    const discount = sizeObj && typeof sizeObj === 'object' ? (sizeObj.discountPercent ? `-${sizeObj.discountPercent}%` : "") : "";

    let currentQuantity = 0;
    if (typeof sizeObj === 'object' && sizeObj.quantity !== undefined) {
        currentQuantity = Number(sizeObj.quantity);
    }

    const showModal = () => setIsModalOpen(true);

    const handleCancel = () => setIsModalOpen(false);

    const gallerySlides = productDetails.flatMap((detail) =>
        (detail.galleries || []).map((gallery) => ({
            ...gallery,
            productDetailId: detail.productDetailId,
            color: detail.color,
            detail,
        }))
    );

    return (
        <ConfigProvider theme={{
            components: {
                Rate: { starBg: '#cccaca' }
            }
        }}>
            <section className="container">
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} style={{ marginTop: 20 }}>
                    <Col xs={24} sm={24} md={13}>
                        <Image src={selectedImageUrl} alt={colorName} width="100%" style={{ objectFit: "contain" }} />
                        <section className="embla">
                            <div className="embla__viewport" ref={emblaRef}>
                                <div className="embla__container">
                                    {gallerySlides.map((slide, index) => (
                                        <div className="embla__slide" key={slide.galleryID || index}
                                            onClick={() => {
                                                handleSelectColor(slide.detail); setSelectedImageUrl(slide.imageUrl);
                                            }}>
                                            <img src={slide.imageUrl} alt={slide.color.name} className="embla__slide__img"
                                                style={{
                                                    width: '100%',
                                                    cursor: 'pointer',
                                                    border: selectedImageUrl === slide.imageUrl ? '1px solid black'
                                                        : '1px solid #e6e6e6'
                                                }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col xs={24} sm={24} md={11}>
                        <div className={styles["pdd__titleHead"]}>{detailQuery.data?.name}</div>
                        <Flex align="center" gap={10} className={styles["pdd__priceBox"]}>
                            <div className={styles["pdd__priceBox--specialPrice"]}>{price}</div>
                            <RenderCondition condition={discount !== "0"}>
                                <span className={styles["pdd__priceBox--oldPrice"]}>{oldPrice}</span>
                                <span className={styles["pdd__priceBox--savePrice"]}>{discount}</span>+
                            </RenderCondition>
                        </Flex>
                        <Flex align="center" gap={5} className={styles["pdd__stockTitle"]} style={{ marginBottom: 10 }}>
                            Loại:
                            <span className={styles["pdd__stockTitle--aStock"]}>
                                {detailQuery.data?.category.name}
                            </span>
                        </Flex>
                        <Flex align="center" gap={5} className={styles["pdd__stockTitle"]}>
                            Tình trạng:
                            <span className={styles["pdd__stockTitle--aStock"]}>
                                {currentQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                            </span>
                        </Flex>
                        <form action="multipart/form-data" method="post">
                            <div className={styles["pdd__colorWrapper"]}>
                                <div className={styles["pdd__colorWrapper--colorTitle"]}>
                                    Màu sắc: <span>{colorName}</span>
                                </div>
                                <Flex gap={8} align="center">
                                    {productDetails.map((product: any, index: number) => {
                                        let hex = '';
                                        if ('color' in product) {
                                            hex = product.color.hexCode || product.color.hex;
                                        }
                                        let selectedHex = colorHex;
                                        return (
                                            <div key={index} onClick={() => handleSelectColor(product)}
                                                style={{
                                                    backgroundColor: hex,
                                                    border: selectedHex === hex ? '1px solid #1890ff' : '1px solid black'
                                                }} title={product.color.name}
                                                className={styles["pdd__colorWrapper--colorCircle"]}
                                            ></div>
                                        );
                                    })}
                                </Flex>
                            </div>
                            <Flex gap={25} align="center" className={styles["pdd__qtyWrapper"]}>
                                <div className={styles["pdd__qtyWrapper--qtyTitle"]}>Số lượng:</div>
                                <Flex style={{ border: '1px solid #ebebeb' }}>
                                    <Button icon={<MinusOutlined />} type="text" onClick={decreaseQuantity} />
                                    <input type="text" className={styles["pdd__qtyWrapper--inputCts"]} value={quantity} readOnly />
                                    <Button icon={<PlusOutlined />} type="text" onClick={increaseQuantity} />
                                </Flex>
                            </Flex>
                            <div className={styles["pdd__sizeWrapper"]}>
                                <div className={styles["pdd__sizeWrapper--sizeTitle"]}>
                                    Kích thước: <span>{selectedSize}</span>
                                </div>
                                <Flex gap={8} align="center">
                                    {sizes.map((sizeObj: any, index: number) => {
                                        const value = typeof sizeObj === 'string' ? sizeObj : sizeObj.size;
                                        return (
                                            <Flex
                                                justify="center"
                                                align="center"
                                                key={index}
                                                className={styles["pdd__sizeWrapper--sizeItem"]}
                                                style={{ border: value === selectedSize ? '2px solid #1890ff' : 'none' }}
                                                onClick={() => handleSelectSize(value)}
                                            >{value}</Flex>
                                        );
                                    })}
                                </Flex>
                            </div>
                            <Button color="default" variant="solid" onClick={handleAddToCart} style={{ marginTop: 10 }}>
                                Thêm vào giỏ hàng
                            </Button>
                        </form>
                    </Col>
                </Row>
                <div>
                    <Segmented options={["Mô tả sản phẩm", "Đánh giá sản phẩm"]} block value={selectedTab}
                        onChange={(val) => setSelectedTab(val)}
                        style={{ marginTop: 20, border: '1px solid #ccc' }} />
                    <RenderCondition condition={selectedTab === "Mô tả sản phẩm"}>
                        <div className={styles["pdd__description"]}>
                            <div style={{ fontSize: 16 }} dangerouslySetInnerHTML={{
                                __html: (detailQuery.data?.description || "")
                                    .replace(/\n/g, "<br />")
                            }} />
                        </div>
                    </RenderCondition>
                    <RenderCondition condition={selectedTab === "Đánh giá sản phẩm"}>
                        <div className={styles["pdd__ratingWrapper"]}>
                            <Flex align="center" justify="space-between">
                                <p className={styles["pdd__ratingWrapper--title"]}>Đánh giá & nhận xét của khách hàng</p>
                                <Button color="default" variant="solid" icon={<SendOutlined />} onClick={showModal} >Gửi đánh giá</Button>
                            </Flex>
                            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} style={{ alignItems: 'center' }}>
                                <Col span={6}>
                                    <Flex vertical className={styles["pdd__ratingAverage"]}>
                                        <span className={styles["pdd__ratingAverage--title"]}>{ratingAverage.toFixed(1)}</span>
                                        <Rate style={{ margin: '5px 0 15px' }} disabled defaultValue={ratingAverage} allowHalf />
                                        <span className={styles["pdd__ratingAverage--assess"]}>{totalRating.toLocaleString()} đánh giá</span>
                                    </Flex>
                                </Col>
                                <Col span={18} className={styles["pdd__progress"]}>
                                    {starCounts.map((item) => (
                                        <Flex gap={8} align="center" key={item.star}>
                                            <Flex gap={5} align="center" className={styles["pdd__progress--number"]}>{item.star} <StarFilled /></Flex>
                                            <Progress strokeColor={"#ff4d4f"} percent={(item.count / totalRating) * 100} showInfo={false} />
                                            <p>{item.count.toLocaleString()}</p>
                                        </Flex>
                                    ))}
                                </Col>
                            </Row>
                        </div>
                        <div className={styles["pdd__cmtWrapper"]}>
                            <Flex align="center" justify="space-between">
                                <p style={{ fontSize: 20, fontWeight: 600 }}>Bình luận</p>
                                <Flex gap={10}>
                                    <Button color="default" variant={filterStar === null ? "solid" : "outlined"} onClick={() => setFilterStar(null)}>
                                        Tất cả
                                    </Button>
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <Button key={star} color="default" variant={filterStar === star ? "solid" : "outlined"}
                                            icon={<StarFilled style={{ color: '#fadb14' }} />} onClick={() => setFilterStar(star)}>
                                            {star}
                                        </Button>
                                    ))}
                                </Flex>
                            </Flex>
                            <div>
                                <RenderCondition condition={filteredComments?.length! > 0}>
                                    {filteredComments?.map((f, i) => (
                                        <div className={styles["pdd__cmtWrapper--cmtContent"]} key={i}>
                                            <Flex gap={20} align="center">
                                                <strong>{f.user.fullname}</strong>
                                                <Flex gap={20} align="center">
                                                    <div>
                                                        {[...Array(f.star)].map((_, idx) => <StarFilled style={{ color: "#fadb14" }} key={idx} />)}
                                                    </div>
                                                    <span>•</span>
                                                    <div><i>{new Date(f.date).toLocaleDateString("vi-VN")}</i></div>
                                                </Flex>
                                            </Flex>
                                            <div style={{ marginTop: 10 }}>{f.comment}</div>
                                        </div>
                                    ))}
                                </RenderCondition>
                                <RenderCondition condition={!filteredComments?.length}>
                                    <Flex align="center" justify="center" className={styles["pdd__cmtWrapper--noCmt"]}>
                                        <span>Chưa có đánh giá nào về sản phẩm này!</span>
                                        <img src={noCmt} alt="Đánh giá" />
                                    </Flex>
                                </RenderCondition>
                            </div>
                        </div>
                    </RenderCondition>
                </div>
            </section>
            <CommentModal id={productId} open={isModalOpen} onCancel={handleCancel} />
        </ConfigProvider>
    );
};

export default ProductDetail;