import api from '../axios';
import type { Workspace } from '../../types';

export interface CreateWorkspacePayload {
    name: string;
}

export async function createWorkspace(body: CreateWorkspacePayload): Promise<Workspace> {
    const { data } = await api.post('/v1/workspaces/create', body);
    return data;
}

export async function getWorkspaces(): Promise<Workspace[]> {
    const { data } = await api.get('/v1/workspaces');
    return data;
}

export interface UpdateWebhookPayload {
    webhook_url: string;
    redirect_url: string;
}

export async function updateWebhookSettings(appId: string, body: UpdateWebhookPayload): Promise<Workspace> {
    const { data } = await api.put(`/v1/workspaces/${appId}/webhook`, body);
    return data;
}

export interface ApiKeys {
    sandboxKey: string;
    liveKey: string;
}

export async function getWorkspaceApiKeys(appId: string): Promise<ApiKeys> {
    const { data } = await api.get(`/v1/workspaces/${appId}/api-keys`);
    return data;
}

export async function regenerateWorkspaceApiKey(appId: string, mode: string): Promise<{ key: string }> {
    const { data } = await api.post(`/v1/workspaces/${appId}/api-keys/regenerate?mode=${mode}`);
    return data;
}
