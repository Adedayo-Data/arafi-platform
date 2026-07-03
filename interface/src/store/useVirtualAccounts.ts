import { create } from 'zustand';
import type { VirtualAccount, CreateVirtualAccountPayload } from '../types';
import { createVirtualAccount, getVirtualAccounts } from '../lib/api/virtualAccounts';

interface VirtualAccountsState {
    accounts: VirtualAccount[];
    isLoading: boolean;
    error: string | null;
    fetch: () => Promise<void>;
    create: (payload: CreateVirtualAccountPayload) => Promise<VirtualAccount>;
    reset: () => void;
}

export const useVirtualAccounts = create<VirtualAccountsState>()((set) => ({
    accounts: [],
    isLoading: false,
    error: null,

    fetch: async () => {
        set({ isLoading: true, error: null });
        try {
            const accounts = await getVirtualAccounts();
            set({ accounts, isLoading: false });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || 'Failed to fetch virtual accounts.',
            });
        }
    },

    create: async (payload: CreateVirtualAccountPayload) => {
        set({ isLoading: true, error: null });
        try {
            const account = await createVirtualAccount(payload);
            set((state) => ({ accounts: [...state.accounts, account], isLoading: false }));
            return account;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || 'Failed to provision virtual account.',
            });
            throw error;
        }
    },

    reset: () => set({ accounts: [], error: null }),
}));
