const API_BASE = 'http://localhost:3000/api';

// Interface pour les options de requête
export interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

// Interface pour la réponse API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Gère les réponses HTTP
 */
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    let err = text;
    try {
      err = JSON.parse(text);
    } catch (_) {}
    throw new Error(typeof err === 'string' ? err : JSON.stringify(err));
  }
  return (await res.json()) as T;
}

/**
 * Classe pour gérer les appels HTTP génériques
 */
class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  /**
   * Requête GET
   */
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse<T>(res);
  }

  /**
   * Requête POST
   */
  async post<T>(endpoint: string, body?: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  }

  /**
   * Requête PUT
   */
  async put<T>(endpoint: string, body?: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  }

  /**
   * Requête DELETE
   */
  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      await handleResponse(res);
    }
    return undefined as T;
  }

  /**
   * Requête PATCH
   */
  async patch<T>(endpoint: string, body?: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  }
}

// Instance unique du client HTTP
export const httpClient = new HttpClient();

export default httpClient;
