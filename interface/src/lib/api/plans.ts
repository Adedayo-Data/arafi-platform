import api from '../axios';
import type { Plan, CreatePlanPayload } from '../../types';
import { useWorkspace } from '../../store/useWorkspace';

export async function getPlans(): Promise<Plan[]> {
    const active = useWorkspace.getState().activeWorkspace;
    const key = active?.sandbox_key;
    const { data } = await api.get('/v1/plans', {
        headers: key ? { Authorization: `Bearer ${key}` } : {}
    });
    return data;
}

export async function createPlan(body: CreatePlanPayload): Promise<Plan> {
    const active = useWorkspace.getState().activeWorkspace;
    const key = active?.sandbox_key;
    const { data } = await api.post('/v1/plans', body, {
        headers: key ? { Authorization: `Bearer ${key}` } : {}
    });
    return data;
}
