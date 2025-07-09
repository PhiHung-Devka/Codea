type LoginBody = {
    email: string;
    password: string;
};

type ChangePasswordRequest = {
    email: string;
    oldPassword: string;
    newPassword: string;
};

export type { LoginBody, ChangePasswordRequest };