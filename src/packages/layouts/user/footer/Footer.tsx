import { Avatar, Button, Col, Divider, Flex, Input, Row } from "antd";
import styles from "./Footer.module.scss";
import logoWhite from "@repo/assets/images/logo-white.png";
import { LinkBasic } from "@repo/component/ui";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import REPO_CONSTANT from "@repo/packages/ultis/contants";

const { supportBoxes, socialLinks, aboutLinks, policyLinks } = REPO_CONSTANT.DEFAULT_VALUE_FOOTER;

const Footer = () => {
    return (
        <>
            <div style={{ backgroundColor: '#D1D1D1', marginTop: 40 }}>
                <Flex align="center" justify="space-evenly">
                    {supportBoxes.map(({ icon: IconComponent, title, desc }, index) => (
                        <React.Fragment key={index}>
                            <Flex gap={20} align="center" className={styles["box"]}>
                                <div className={styles["box__thumb"]}><IconComponent /></div>
                                <Flex vertical>
                                    <span className={styles["box__title"]}>{title}</span>
                                    <span>{desc}</span>
                                </Flex>
                            </Flex>
                            {index < supportBoxes.length - 1 && (
                                <Divider type="vertical" style={{ height: "5.8em", marginInline: 0, borderColor: "#fff" }} />
                            )}
                        </React.Fragment>))}
                </Flex>
            </div>
            <footer className={styles["ft"]}>
                <div className="container">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={7}>
                            <Flex gap={10} align="center">
                                <img src={logoWhite} alt="Codea" width={100} />
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
                                <p style={{ color: '#999999', fontSize: '16px' }}>Theo dõi Codea từ các nền tảng khác nhau nhé!</p>
                                <Flex justify="space-evenly">
                                    {socialLinks.map(({ name, href, icon, isPng }, index) => (
                                        <LinkBasic title={name} key={index} to={href} target="_blank" rel="noopener noreferrer">
                                            {isPng ? <Avatar src={icon} size="large" /> : React.createElement(icon)}
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
            </footer>
        </>
    )
}

export default Footer;