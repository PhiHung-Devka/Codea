import type { LinkBasicProps } from "@repo/packages/types";
import { domClass } from "@repo/packages/ultis/common/dom-class";
import { FontSize, FontWeight, TextAlign } from "@repo/packages/ultis/enum/ui.enum";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const LinkBasic = ({ fontSize = FontSize._2XS, align = TextAlign.Left, fontWeight = FontWeight.Light, children, ...props }: LinkBasicProps) => {
    const fontSizeClass = domClass.generateFontSizeClass(fontSize);
    const fontWeightClass = domClass.generateFontWeightClass(fontWeight);

    return (
        <Link className={clsx(fontSizeClass, fontWeightClass, align === TextAlign.Left && "text-left",
            align === TextAlign.Center && "text-center", align === TextAlign.Right && "text-right",
        )} {...props}>
            {children}
        </Link>
    )
}