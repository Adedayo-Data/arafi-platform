import api from '../axios';
import type { Customer, CreateCustomerPayload } from '../../types';

export async function getCustomers(): Promise<Customer[]> {
    const { data } = await api.get('/v1/customers');
    return data;
}

export async function createCustomer(body: CreateCustomerPayload): Promise<Customer> {
    const { data } = await api.post('/v1/customers', body);
    return data;
}

export async function deleteCustomerCard(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/v1/customers/${id}/card`);
    return data;
}

export async function tokenizeCustomerCard(id: string, redirectUrl?: string): Promise<{ checkout_url: string }> {
    const url = redirectUrl ? `/v1/customers/${id}/card/tokenize?redirect_url=${encodeURIComponent(redirectUrl)}` : `/v1/customers/${id}/card/tokenize`;
    const { data } = await api.post(url);
    return data;
}
