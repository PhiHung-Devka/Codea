import { Avatar, Button, Col, Divider, Flex, Input, Row } from "antd";
import styles from "./Footer.module.scss";
import { LinkBasic } from "@repo/component/ui";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import REPO_CONSTANT from "@repo/packages/ultis/contants";

const { supportBoxes, socialLinks, aboutLinks, policyLinks } = REPO_CONSTANT.DEFAULT_VALUE_FOOTER;

const FooterComponent = () => {
    return (
        <footer>
            <div style={{ backgroundColor: '#D1D1D1', marginTop: 20 }}>
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
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={7}>
                            <Flex gap={10} align="center">
                                <img src="https://res.cloudinary.com/dydx2mqqw/image/upload/v1751747464/logo-white_gqyegs.png" alt="Codea" width={100} />
                                <span className={styles["ft__logoText"]}>Codea</span>
                            </Flex>
                            <span style={{ color: '#999999', fontSize: 16 }}>
                                Điện thoại: +84 344966647 (Ms. Kim)<br />
                                Địa chỉ: 64 Nguyễn Thành Phương, Thống Nhất, Biên Hoà, Đồng Nai
                            </span>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className={styles["ft__mailChip"]}>
                                <span className={styles["ft__mailChip--header"]}>Đăng ký nhận tin thông báo</span>
                                <form action="">
                                    <Input placeholder="Nhập địa chỉ email"
                                        suffix={<Button style={{ background: '#545457', color: 'white' }} icon={<SendOutlined />} />} />
                                </form>
                                <p style={{ color: '#999999', fontSize: '16px', textAlign: 'center' }}>Theo dõi Codea từ các nền tảng khác!</p>
                                <Flex justify="space-evenly">
                                    {socialLinks.map(({ name, href, icon }, index) => (
                                        <LinkBasic title={name} key={index} to={href} target="_blank" rel="noopener noreferrer">
                                            <Avatar src={icon} size="large" />
                                        </LinkBasic>
                                    ))}
                                </Flex>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <span className={styles["ft__clickMe--header"]}>Về chúng tôi</span>
                            <Flex vertical gap={15} className={styles["ft__clickMe--content"]}>
                                {aboutLinks.map(({ href, label }, index) => (
                                    <LinkBasic key={index} to={href}>{label}</LinkBasic>
                                ))}
                            </Flex>
                        </Col>
                        <Col className="gutter-row" span={4}>
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