import api from '../axios';
import type { Payout, CreatePayoutPayload } from '../../types';

export async function getPayouts(): Promise<Payout[]> {
    const { data } = await api.get('/v1/payouts');
    return data;
}

export async function requestPayout(body: CreatePayoutPayload): Promise<Payout> {
    const { data } = await api.post('/v1/payouts', body);
    return data;
}
