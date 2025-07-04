import { Segmented, type SegmentedProps } from "antd"

export const SegmentedBasic = ({ options, onChange }: SegmentedProps) => {
    return (
        <Segmented options={options} onChange={onChange} block />
    )
}