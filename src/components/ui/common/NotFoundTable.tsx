import notFoundBackgroundTable from '@repo/assets/images/NotFoundBackgroundTable.png'
import { Flex } from 'antd'

export const NotFoundTable = () => {
    return (
        <Flex vertical gap={8} align='center' justify='center'>
            <img src={notFoundBackgroundTable} />
            <span style={{ color: "#626F86", fontWeight: 400, fontSize: 16 }}>Không có dữ liệu</span>
        </Flex>
    )
}