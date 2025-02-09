import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    token: localStorage.getItem("token") || null,

    login: async (response) => {
        try {
            const { token } = response;
            set({ token });
            localStorage.setItem("token", token);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
        }
        return false;
    },

    logout: () => {
        set({ token: null });
        localStorage.removeItem("token");
    },

    isAuthenticated: async () => {
        const token = get().token;
        return !!token;
    },
}));
