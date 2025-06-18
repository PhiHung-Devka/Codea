import { FontSize, FontWeight } from "@repo/packages/ultis/enum/ui.enum";

const generateFontSizeClass = (fontSize: FontSize) => {
    let fontSizeClass = "is-fs-";

    switch (fontSize) {
        case FontSize._4XS:
            fontSizeClass += "4xs";
            break;
        case FontSize._3XS:
            fontSizeClass += "3xs";
            break;
        case FontSize._2XS:
            fontSizeClass += "2xs";
            break;
        case FontSize.XS:
            fontSizeClass += "xs";
            break;
        case FontSize._2SM:
            fontSizeClass += "2sm";
            break;
        case FontSize.SM:
            fontSizeClass += "sm";
            break;
        case FontSize.MD:
            fontSizeClass += "md";
            break;
        case FontSize.LG:
            fontSizeClass += "lg";
            break;
        case FontSize.XL:
            fontSizeClass += "xl";
            break;
        case FontSize._2XL:
            fontSizeClass += "xxl";
            break;
    }

    return fontSizeClass;
};

const generateFontWeightClass = (fontWeight: FontWeight) => {
    let fontWeightClass = "is-lw-";

    switch (fontWeight) {
        case FontWeight.Light:
            fontWeightClass += "light";
            break;
        case FontWeight.Regular:
            fontWeightClass += "regular";
            break;
        case FontWeight.Medium:
            fontWeightClass += "medium";
            break;
        case FontWeight.SemiBold:
            fontWeightClass += "semibold";
            break;
        case FontWeight.Bold:
            fontWeightClass += "bold";
            break;
    }

    return fontWeightClass;
};

const domClass = { generateFontSizeClass, generateFontWeightClass }

export { domClass };