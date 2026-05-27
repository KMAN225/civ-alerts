import { API_URL } from '../config';
import { getToken } from './auth';

export async function api(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw { status: res.status, message: body.message || 'Erreur serveur', errors: body.errors };
  }

  return res.json().catch(() => ({}));
}
