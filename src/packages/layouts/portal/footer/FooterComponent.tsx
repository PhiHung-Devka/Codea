import { Avatar, Button, Col, Divider, Flex, Input, Row } from "antd";
import styles from "./Footer.module.scss";
import { LinkBasic } from "@repo/component/ui";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { socialApi } from "@repo/packages/services/api/social.api";

const { supportBoxes, aboutLinks, policyLinks } = REPO_CONSTANT.DEFAULT_VALUE_FOOTER;

const FooterComponent = () => {
    const socialData = socialApi.queries.readQuery();

    const socialList = Array.isArray(socialData.data) ? socialData.data : [];

    return (
        <footer>
            <div className={styles["support"]}>
                <Flex align="center" justify="space-evenly">
                    {supportBoxes.map(({ icon, iconUrl, title, desc }, index) => (
                        <React.Fragment key={index}>
                            <Flex gap={20} align="center" className={styles["box"]}>
                                <div className={styles["box__thumb"]}>
                                    {icon ? (React.createElement(icon)) : iconUrl ? (
                                        <img src={iconUrl} alt={title} width={36} height={36} />
                                    ) : null}
                                </div>
                                <Flex vertical>
                                    <span className={styles["box__title"]}>{title}</span>
                                    <span>{desc}</span>
                                </Flex>
                            </Flex>
                            {index < supportBoxes.length - 1 && (
                                <Divider type="vertical" style={{ height: "5.8em", marginInline: 0, borderColor: "#fff" }} />
                            )}
                        </React.Fragment>
                    ))}
                </Flex>
            </div>
            <div className={styles["ft"]}>
                <div className="container">
                    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                        <Col className="gutter-row" xs={24} sm={24} md={7}>
                            <Flex align="center" className={styles["ft__logo"]}>
                                <img src="https://res.cloudinary.com/dydx2mqqw/image/upload/v1751747464/logo-white_gqyegs.png" alt="Codea" width={100} />
                                <span className={styles["ft__logo--text"]}>Codea</span>
                            </Flex>
                            <span className={styles["ft__address"]}>
                                Điện thoại: +84 344966647 (Ms. Kim)<br />
                                Địa chỉ: 64 Nguyễn Thành Phương, Thống Nhất, Biên Hoà, Đồng Nai
                            </span>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={8}>
                            <div className={styles["ft__mailChip"]}>
                                <span className={styles["ft__mailChip--header"]}>Đăng ký nhận tin thông báo</span>
                                <form action="">
                                    <Input placeholder="Nhập địa chỉ email"
                                        suffix={<Button style={{ background: '#545457', color: 'white' }} icon={<SendOutlined />} />} />
                                </form>
                                <p style={{ color: '#999999', fontSize: '16px', textAlign: 'center' }}>Theo dõi Codea từ các nền tảng khác!</p>
                                <Flex justify="space-evenly">
                                    {socialList.filter(item => !item.isPhone && item.name !== "Messenger")
                                        .map((item, index) => (
                                            <LinkBasic title={item.name} key={index} to={item.link} target="_blank" rel="noopener noreferrer">
                                                <Avatar src={item.iconUrl} size="large" />
                                            </LinkBasic>
                                        ))}
                                </Flex>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={5}>
                            <span className={styles["ft__clickMe--header"]}>Về chúng tôi</span>
                            <Flex vertical gap={15} className={styles["ft__clickMe--content"]}>
                                {aboutLinks.map(({ href, label }, index) => (
                                    <LinkBasic key={index} to={href}>{label}</LinkBasic>
                                ))}
                            </Flex>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={4}>
                            <span className={styles["ft__clickMe--header"]}>Chính sách</span>
                            <Flex vertical gap={15} className={styles["ft__clickMe--content"]}>
                                {policyLinks.map(({ href, label }, index) => (
                                    <LinkBasic key={index} to={href}>{label}</LinkBasic>
                                ))}
                            </Flex>
                        </Col>
                    </Row>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent;