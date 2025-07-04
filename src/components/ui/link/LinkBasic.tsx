import type { LinkBasicProps } from "@repo/packages/types";
import { domClass } from "@repo/packages/ultis/common/dom-class";
import { FontSize, FontWeight, TextAlign } from "@repo/packages/ultis/enum/ui.enum";
import clsx from "clsx";
import { Link } from "react-router-dom";
import "./LinkBasic.scss";

export const LinkBasic = ({ fontSize = FontSize._2XS, align = TextAlign.Left, fontWeight = FontWeight.Light, children,
    color, isHover = false, classLocal, ...props }: LinkBasicProps) => {
    const fontSizeClass = domClass.generateFontSizeClass(fontSize);
    const fontWeightClass = domClass.generateFontWeightClass(fontWeight);
    const colorStyle = color ? `${color}` : undefined;

    return (
        <Link style={{ color: colorStyle }} className={clsx(fontSizeClass, fontWeightClass, align === TextAlign.Left && "text-left",
            align === TextAlign.Center && "text-center", align === TextAlign.Right && "text-right", isHover === true && "linkbs",
            classLocal
        )} {...props}>
            {children}
        </Link>
    )
}