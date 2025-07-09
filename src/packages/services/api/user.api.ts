import { axiosInternalMethod } from "@repo/packages/libs";
import type { User } from "@repo/packages/types";
import type { ChangePasswordRequest, LoginBody } from "@repo/packages/types/domain/account.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/user";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const read = async () => {
    const resp = await axiosInternalMethod._get<User[]>(mergePath(""));
    return resp;
};

const loginApi = async (body: LoginBody) => {
    try {
        const resp = await axiosInternalMethod._post<User>(mergePath("/login"), body);
        localStorage.setItem(REPO_CONSTANT.LOCAL_STORAGE_KEYS.user, JSON.stringify(resp));
        return resp;
    } catch (err: any) {
        throw err.response?.data;
    }
};

const otpForRegister = async (body: User) => {
    const resp = await axiosInternalMethod._post(mergePath("/register/send-otp"), body);
    return resp;
};

const verifyOtpRegister = async (email: string, otp: string) => {
    const resp = axiosInternalMethod._post(
        mergePath(`/register/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`),
        {}
    );
    return resp;
};

const forgotPasswordSendOtp = async (email: string) => {
    const resp = axiosInternalMethod._post(mergePath("/forgot-password/send-otp"), email);
    return resp;
};

const forgotPasswordReset = async (payload: { email: string, otp: string, newPassword: string }) => {
    const resp = axiosInternalMethod._post(mergePath("/forgot-password/reset"), payload);
    return resp;
};

const changePassword = async (body: ChangePasswordRequest) => {
    const resp = axiosInternalMethod._post(mergePath("/change-password"), body);
    return resp;
};


const userApi = {
    queries: {
        readQuery: () =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.user.findAll],
                queryFn: () => read(),
            }),
    },
    apis: { read, loginApi, otpForRegister, verifyOtpRegister, forgotPasswordSendOtp, forgotPasswordReset, changePassword }
}

export { userApi };