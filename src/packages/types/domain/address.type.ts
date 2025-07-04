interface AddressVNApiResponse {
    data: addressVN[];
    data_date: string;
    generate_date: number;
    stats: {
        elapsed_time: number;
        level1_count: number;
        level2_count: number;
        level3_count: number;
    };
}

type addressVN = {
    level1_id: string,
    name: string,
    type: string,
    level2s: addressLV2[]
}

type addressLV2 = {
    level2_id: string,
    name: string,
    type: string,
    level3s: addressLV3[]
}

type addressLV3 = {
    level3_id: string,
    name: string,
    type: string
}

export type { AddressVNApiResponse, addressVN };