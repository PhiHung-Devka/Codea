import type { DropDownProps } from "antd/es/dropdown";
import Dropdown from "antd/es/dropdown";

export const DropdownBasic = ({ children, placement = "bottom", arrow = true, ...props }: DropDownProps) => {
    return (
        <Dropdown {...props} placement={placement} arrow={arrow}>
            {children}
        </Dropdown>
    )
}