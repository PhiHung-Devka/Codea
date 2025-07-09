import type { Address } from "./address.type";
import type { Authority } from "./authority.type";

type User = {
    userId: number,
    email: string,
    image: string,
    password: string,
    fullname: string,
    authorities: Authority[],
    addresses: Address[]
}

export type { User };