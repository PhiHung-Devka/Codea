import type { LabelDividerProps } from "@repo/packages/types/ui/label";
import { domClass } from "@repo/packages/ultis/common/dom-class";
import { FontSize, FontWeight } from "@repo/packages/ultis/enum/ui.enum";
import clsx from "clsx";

export const LabelDivider = ({ label, fontSize = FontSize._2XS, color = '#758195',
    fontWeight = FontWeight.Regular }: LabelDividerProps) => {
    const fontSizeClass = domClass.generateFontSizeClass(fontSize);
    const fontWeightClass = domClass.generateFontWeightClass(fontWeight);

    return (
        <span style={{ color: color }} className={clsx(fontSizeClass, fontWeightClass)}>
            {label}
        </span>
    );
};
