import { FirstIcon, LeftArrowIcon } from "@repo/assets/icons";
import { ConfigProvider, Flex, Pagination, Select } from "antd";
import clsx from "clsx";
import React from "react";
import styles from "./PaginationBasic.module.scss";
import type { PaginationBasicProps } from "@repo/packages/types";
import { RenderCondition } from "../common/RenderCondition";
import { IconWrapper } from "../icon-wrapper/IconWrapper";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { AntdVariables } from "@repo/packages/ultis/variable/antd-variables";

const { colors, spacing } = AntdVariables;

type LabelTextProps = {
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
};

const LabelText = ({ children, isActive = false, isDisabled = false }: LabelTextProps) => {
  return (
    <span className={clsx("antd-text is-fs-2xs is-fw-regular", styles["pgb__item--page"],
      isActive && styles["is-active"], isDisabled && styles["is-disabled"])}>
      {children}
    </span>
  );
};

type DoubleIconProps = {
  children: React.ReactNode;
  title: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

const DoubleIcon = ({ children, title, isDisabled, onClick }: DoubleIconProps) => {
  return (
    <button className={clsx(styles["pgb__item--custom-icon"], "flex-center", isDisabled && styles["is-disabled"])}
      title={title} onClick={onClick}>
      {children}
    </button>
  );
};

export const PaginationBasicV2 = ({ total, current, pageSize = REPO_CONSTANT.DEFAUL_VALUES.pagination.pageSize,
  resetWhenChangePageSize = true, hideOnSinglePage = false, align = "end", ...props }: PaginationBasicProps) => {
  const totalPages = Math.ceil(total / pageSize);

  const handleChange = (page: number, pageSize: number) => {
    props.onChange?.(page, pageSize);
  };

  const doublePrevIconColor = current === 1 ? colors.text.disabled : colors.black[100];
  const siglePrevIconColor = current === 1 ? colors.text.disabled : "#000";
  const doubleNextIconColor = current === totalPages || totalPages == 0 ? colors.text.disabled : colors.black[100];
  const sigleNextIconColor = current === totalPages || totalPages == 0 ? colors.text.disabled : "#000";

  return (
    <RenderCondition condition={!hideOnSinglePage || (hideOnSinglePage && totalPages > 1)}>
      <Flex wrap gap="12px 42px" justify={align} className="pagination-custom">
        <Flex gap={spacing.margin.paginationBasic}>
          <DoubleIcon title="Trang đầu" isDisabled={current === 1} onClick={() => handleChange(1, pageSize)}>
            <IconWrapper icon={FirstIcon} color={doublePrevIconColor} size={12} />
          </DoubleIcon>
          <ConfigProvider
            theme={{ components: { Pagination: { itemActiveBg: colors.primary.main } } }}>
            <Pagination {...props} total={total || 1} current={current} pageSize={pageSize} showLessItems
              showQuickJumper={false} showSizeChanger={false} onChange={handleChange} itemRender={(page, type, element) => {
                if (props.itemRender) return props.itemRender(page, type, element);
                switch (type) {
                  case "page":
                    return (<LabelText isActive={page === current}>{page}</LabelText>);
                  case "prev":
                    return (
                      <LabelText isDisabled={current === 1}>
                        <IconWrapper icon={LeftArrowIcon} size={12} color={siglePrevIconColor} />
                      </LabelText>
                    );
                  case "next":
                    return (
                      <LabelText isDisabled={current === totalPages}>
                        <IconWrapper icon={LeftArrowIcon} size={12} color={sigleNextIconColor}
                          style={{ transform: "rotate(180deg)" }} />
                      </LabelText>
                    );
                  case "jump-prev":
                    return (
                      <div className={clsx(styles["pgb__jump--wrapper"])}>
                        <span className={clsx(styles["pgb__jump--icon"], styles["is-dot"], styles["hide-when-hover"])}>
                          ...
                        </span>
                        <IconWrapper icon={FirstIcon} size={12} className={clsx(styles["pgb__jump--icon"],
                          styles["is-action"], styles["show-when-hover"])} />
                      </div>
                    );
                  case "jump-next":
                    return (
                      <div className={clsx(styles["pgb__jump--wrapper"])}>
                        <span className={clsx(styles["pgb__jump--icon"], styles["is-dot"], styles["hide-when-hover"])}>
                          ...
                        </span>
                        <IconWrapper icon={FirstIcon} size={12} style={{ transform: "rotate(180deg)" }}
                          className={clsx(styles["pgb__jump--icon"], styles["is-action"], styles["show-when-hover"])} />
                      </div>
                    );
                }
              }}
            />
          </ConfigProvider>
          <DoubleIcon title="Trang cuối" isDisabled={current === totalPages || totalPages == 0}
            onClick={() => handleChange(totalPages, pageSize)}>
            <IconWrapper icon={FirstIcon} size={12} color={doubleNextIconColor} style={{ transform: "rotate(180deg)" }} />
          </DoubleIcon>
        </Flex>
        <Flex align="center" gap={10}>
          <span className="antd-text is-fs-2xs is-fw-regular">Trang</span>
          <Select value={current} showSearch onChange={(e) => handleChange(e, pageSize)} options={Array.from(
            { length: Math.ceil(total / pageSize) }, (_, i) => ({ value: i + 1 }))} />
          <span className="antd-text is-fs-2xs is-fw-regular">trên {totalPages}</span>
        </Flex>
      </Flex>
    </RenderCondition>
  );
};
