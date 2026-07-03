import { create } from "zustand";
import { persist } from 'zustand/middleware';
import type { User } from "../types";
import { register as registerApi, login as loginApi, type Register, type Login } from "../lib/api/auth";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: Login) => Promise<User>;
    register: (credentials: Register) => Promise<User>;
    logout: () => void;
    clearError: () => void;
}

function decodeJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export const useAuth = create<AuthState>()(persist((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (credentials: Login) => {
        set({ isLoading: true, error: null });
        try {
            const { access_token, app_count } = await loginApi(credentials);
            const decoded = decodeJwt(access_token);
            const user: User = {
                id: decoded?.sub || "",
                email: decoded?.email || credentials.email,
                name: decoded?.email?.split('@')[0] || credentials.email,
                app_count,
            };
            set({ user, accessToken: access_token, isAuthenticated: true, isLoading: false });
            return user;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || "Failed to login. Please check your credentials.",
            });
            throw error;
        }
    },

    register: async (credentials: Register) => {
        set({ isLoading: true, error: null });
        try {
            const { access_token, app_count } = await registerApi(credentials);
            const decoded = decodeJwt(access_token);
            const user: User = {
                id: decoded?.sub || "",
                email: decoded?.email || credentials.email,
                name: decoded?.email?.split('@')[0] || credentials.email,
                app_count,
            };
            set({ user, accessToken: access_token, isAuthenticated: true, isLoading: false });
            return user;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || "Failed to register account.",
            });
            throw error;
        }
    },

    logout: () => set({ user: null, accessToken: null, isAuthenticated: false, error: null }),
    clearError: () => set({ error: null }),
}), {
    name: 'auth',
}))