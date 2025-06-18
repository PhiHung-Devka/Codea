import type { FontSize, FontWeight, TextAlign } from "@repo/packages/ultis/enum/ui.enum";
import type { LinkProps } from "react-router-dom";

type LinkBasicProps = LinkProps & {
    fontSize?: FontSize,
    align?: TextAlign,
    fontWeight?: FontWeight,
}

export type { LinkBasicProps };