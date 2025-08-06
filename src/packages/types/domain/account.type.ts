import type { User } from "../base-model";

type LoginBody = Pick<User, "email" | "password">;

type ChangePasswordRequest = Pick<User, "email"> & {
    oldPassword: string;
    newPassword: string;
};

type RegisterPayload = Pick<User, "email" | "fullname" | "password">;

export type { LoginBody, ChangePasswordRequest, RegisterPayload };