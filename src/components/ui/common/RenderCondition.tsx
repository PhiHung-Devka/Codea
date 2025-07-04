import React from "react";

type RenderConditionProps = {
    condition: boolean;
    children: React.ReactNode;
};

export const RenderCondition = ({ condition, children }: RenderConditionProps) => {
    return <>{condition && children}</>;
};
