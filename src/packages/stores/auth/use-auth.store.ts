import type { User } from "@repo/packages/types";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { create } from "zustand";

interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: JSON.parse(localStorage.getItem(REPO_CONSTANT.LOCAL_STORAGE_KEYS.user) || "null"),
    login: (user) => {
        localStorage.setItem(REPO_CONSTANT.LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
        set({ user });
    },
    logout: () => {
        localStorage.removeItem(REPO_CONSTANT.LOCAL_STORAGE_KEYS.user);
        set({ user: null });
    },
    isAdmin: () => {
        const user = get().user;
        return Array.isArray(user?.authorities) &&
            user.authorities.some(auth => auth.role?.roleId === 2);
    }
}));