import type { FontSize, FontWeight } from "@repo/packages/ultis/enum/ui.enum";
import type React from "react";

type LabelDividerProps = {
    label: React.ReactNode;
    fontSize?: FontSize;
    color?: string;
    fontWeight?: FontWeight;
};

export type { LabelDividerProps };
