import { create } from 'zustand';
import type { Coupon, CreateCouponPayload } from '../types';
import { getCoupons, createCoupon } from '../lib/api/coupons';

interface CouponsState {
    coupons: Coupon[];
    isLoading: boolean;
    error: string | null;
    fetch: () => Promise<void>;
    create: (payload: CreateCouponPayload) => Promise<Coupon>;
    reset: () => void;
}

export const useCoupons = create<CouponsState>()((set) => ({
    coupons: [],
    isLoading: false,
    error: null,

    fetch: async () => {
        set({ isLoading: true, error: null });
        try {
            const coupons = await getCoupons();
            set({ coupons, isLoading: false });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || 'Failed to fetch coupons.',
            });
        }
    },

    create: async (payload: CreateCouponPayload) => {
        set({ isLoading: true, error: null });
        try {
            const coupon = await createCoupon(payload);
            set((state) => ({ coupons: [...state.coupons, coupon], isLoading: false }));
            return coupon;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || 'Failed to create coupon.',
            });
            throw error;
        }
    },

    reset: () => set({ coupons: [], error: null }),
}));
