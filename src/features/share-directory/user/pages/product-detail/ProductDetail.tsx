import { Col, Image, Row, Button, Flex, Form, Rate, Progress, Input, ConfigProvider, Modal, type ModalProps } from "antd";
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

const { TextArea } = Input;

const mockDataRate = () => [
    { star: 5, count: 80 },
    { star: 4, count: 40 },
    { star: 3, count: 20 },
    { star: 2, count: 10 },
    { star: 1, count: 5 }
];

const mockComments = [
    { name: "An", rate: 5, date: "01/06/2025", content: "Sản phẩm tốt" },
    { name: "Bình", rate: 4, date: "02/06/2025", content: "Khá ổn" },
    { name: "Chi", rate: 3, date: "03/06/2025", content: "Tạm ổn" }
];

const CommentModal = ({ open, onOk, onCancel }: ModalProps) => {
    const [rating, setRating] = useState(0);
    const [form] = Form.useForm();

    const ratingLabel = ['', 'Không thích', 'Tạm được', 'Bình thường', 'Khá tốt', 'Tuyệt vời'];

    return (
        <Modal open={open} onOk={onOk} onCancel={onCancel} closable={false}
            footer={[
                <Button key="back" onClick={onCancel}>Hủy</Button>,
                <Button key="submit" type="primary" danger onClick={onOk}>Gửi</Button>
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

interface MockProduct {
    color: { name: string; hex: string };
    image: string;
    sizes: string[];
}

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const notify = useNotify();
    const productId = Number(id);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetail | MockProduct | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [filterStar, setFilterStar] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const detailQuery = productApi.queries.detailQuery(productId, true);
    const productDetails: ProductDetail[] = detailQuery.data?.productDetails || [];

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

    const handleSelectColor = (product: ProductDetail | MockProduct) => {
        setSelectedProduct(product);
        if ('sizes' in product && Array.isArray(product.sizes)) {
            setSelectedSize(typeof product.sizes[0] === 'string' ? product.sizes[0] : product.sizes[0]?.size || "");
        } else {
            setSelectedSize("");
        }
    };

    const handleSelectSize = (size: string) => setSelectedSize(size);

    const totalRating = mockDataRate().reduce((sum, item) => sum + item.count, 0);
    const ratingAverage = totalRating === 0 ? 0 : mockDataRate().reduce((sum, item) => sum + item.star * item.count, 0) / totalRating;

    const filteredComments = filterStar ? mockComments.filter(c => c.rate === filterStar) : mockComments;

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

    let imageUrl = "";
    let sizes: any[] = [];
    let colorName = "";
    let colorHex = "";
    if (selectedProduct) {
        if ('galleries' in selectedProduct) {
            imageUrl = selectedProduct.galleries?.[0]?.imageUrl || "";
            sizes = selectedProduct.sizes || [];
            colorName = selectedProduct.color?.name;
            colorHex = selectedProduct.color?.hexCode;
        } else {
            imageUrl = selectedProduct.image;
            sizes = selectedProduct.sizes || [];
            colorName = selectedProduct.color?.name;
            colorHex = selectedProduct.color?.hex;
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

    const handleOk = () => setIsModalOpen(false);

    const handleCancel = () => setIsModalOpen(false);

    return (
        <ConfigProvider theme={{
            components: {
                Rate: { starBg: '#cccaca' }
            }
        }}>
            <section className="container">
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} style={{ marginTop: 20 }}>
                    <Col span={13}>
                        <Image src={imageUrl} alt={colorName} width="100%" style={{ objectFit: "contain" }} />
                    </Col>
                    <Col span={11}>
                        <div className={styles["pdd__titleHead"]}>{detailQuery.data?.name}</div>
                        <Flex align="center" gap={10} className={styles["pdd__priceBox"]}>
                            <div className={styles["pdd__priceBox--specialPrice"]}>{price}</div>
                            <span className={styles["pdd__priceBox--oldPrice"]}>{oldPrice}</span>
                            {discount && discount !== "0" && (
                                <span className={styles["pdd__priceBox--savePrice"]}>{discount}</span>
                            )}
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
                                                }}
                                                title={product.color.name}
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
                            {mockDataRate().map((item) => (
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
                        <RenderCondition condition={filteredComments.length > 0}>
                            {filteredComments.map((c, i) => (
                                <div className={styles["pdd__cmtWrapper--cmtContent"]} key={i}>
                                    <Flex gap={20} align="center">
                                        <strong>{c.name}</strong>
                                        <Flex gap={20} align="center">
                                            <div>
                                                {[...Array(c.rate)].map((_, idx) => <StarFilled style={{ color: "#fadb14" }} key={idx} />)}
                                            </div>
                                            <span>•</span>
                                            <div><i>{c.date}</i></div>
                                        </Flex>
                                    </Flex>
                                    <div style={{ marginTop: 10 }}>{c.content}</div>
                                </div>
                            ))}
                        </RenderCondition>
                        {filteredComments.length > 0 ? filteredComments.map((c, i) => (
                            <div className={styles["pdd__cmtWrapper--cmtContent"]} key={i}>
                                <Flex gap={20} align="center">
                                    <strong>{c.name}</strong>
                                    <Flex gap={20} align="center">
                                        <div>
                                            {[...Array(c.rate)].map((_, idx) => <StarFilled style={{ color: "#fadb14" }} key={idx} />)}
                                        </div>
                                        <span>•</span>
                                        <div><i>{c.date}</i></div>
                                    </Flex>
                                </Flex>
                                <div style={{ marginTop: 10 }}>{c.content}</div>
                            </div>
                        )) : (
                            <Flex align="center" justify="center" className={styles["pdd__cmtWrapper--noCmt"]}>
                                <span>Chưa có đánh giá nào về sản phẩm này!</span>
                                <img src={noCmt} alt="Đánh giá" />
                            </Flex>
                        )}
                    </div>
                </div>
            </section>
            <CommentModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
        </ConfigProvider>
    );
};

export default ProductDetail;