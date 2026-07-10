import api from '../axios';
import type { Coupon, CreateCouponPayload } from '../../types';

export async function getCoupons(): Promise<Coupon[]> {
    const { data } = await api.get('/v1/coupons');
    return data;
}

export async function createCoupon(body: CreateCouponPayload): Promise<Coupon> {
    const { data } = await api.post('/v1/coupons', body);
    return data;
}
