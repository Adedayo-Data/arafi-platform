import api from '../axios';
import type { VirtualAccount, CreateVirtualAccountPayload } from '../../types';
import { useWorkspace } from '../../store/useWorkspace';

export async function createVirtualAccount(body: CreateVirtualAccountPayload): Promise<VirtualAccount> {
    const active = useWorkspace.getState().activeWorkspace;
    const key = active?.sandbox_key;
    const { data } = await api.post('/v1/virtual-accounts', body, {
        headers: key ? { Authorization: `Bearer ${key}` } : {}
    });
    return data;
}

export async function getVirtualAccounts(): Promise<VirtualAccount[]> {
    const active = useWorkspace.getState().activeWorkspace;
    const key = active?.sandbox_key;
    const { data } = await api.get('/v1/virtual-accounts', {
        headers: key ? { Authorization: `Bearer ${key}` } : {}
    });
    return data;
}
