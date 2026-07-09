import api from '../axios';
import type { Subscription, CreateSubscriptionPayload } from '../../types';

export async function getSubscriptions(): Promise<Subscription[]> {
    const { data } = await api.get('/v1/subscriptions');
    return data;
}

export async function createSubscription(body: CreateSubscriptionPayload): Promise<Subscription> {
    const { data } = await api.post('/v1/subscriptions', body);
    return data;
}

export interface PublicVerificationResponse {
    success: boolean;
    status: string;
    message: string;
    appName: string;
    planName: string;
    amount: string;
    orderReference: string;
    transactionId?: string;
    redirectUrl?: string | null;
}

export async function verifyPublicSubscription(orderReference: string): Promise<PublicVerificationResponse> {
    const { data } = await api.get(`/v1/subscriptions/public/verify?orderReference=${orderReference}`);
    return data;
}
