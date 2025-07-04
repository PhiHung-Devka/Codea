import clsx from "clsx";
import React, { forwardRef, type SVGProps } from "react";
import styles from "./IconWrapper.module.scss";

export interface IconWrapperProps extends SVGProps<SVGSVGElement> {
    icon: React.FC<SVGProps<SVGSVGElement>>;
    size?: number | string;
    color?: string;
    hoverColor?: string;
    className?: string;
    isAllowCustomFill?: boolean;
}

export const IconWrapper = forwardRef<SVGSVGElement, IconWrapperProps>(
    ({ icon: IconComponent, size = 24, width, height, color = "currentColor", hoverColor, className, style,
        isAllowCustomFill = false, ...rest }, ref) => {
        // dùng CSS variable --icon-color và --icon-hover-color
        const _width = width || size;
        const _height = height || size;

        const finalStyle: React.CSSProperties = {
            width: typeof _width === "number" ? `${_width}px` : _width,
            height: typeof _height === "number" ? `${_height}px` : _height,
            "--icon-color": color,
            "--icon-hover-color": hoverColor ?? color, // fallback về color nếu không truyền hoverColor
            ...style,
        } as React.CSSProperties;

        return (
            <IconComponent ref={ref} style={finalStyle} className={clsx(className, styles.icw__detail,
                (isAllowCustomFill || (color && color !== "currentColor")) && styles["is-custom-fill"],
                hoverColor && styles["is-allow-hover"])}
                {...rest}
            />
        );
    },
);
