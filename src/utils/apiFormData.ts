import { HttpMethod } from './api';

interface ApiOptions {
  method?: HttpMethod,
  payload?: FormData,
}

interface ApiReturn<T> {
  body: T | null;
  status: number | null;
}

export async function apiFormData<T>(url: string, options?: ApiOptions): Promise<ApiReturn<T>> {
  try {
    const res = await fetch(url, {
      method: options?.method ?? HttpMethod.GET,
      body: options?.payload,
      credentials: 'include',
    });

    const data = await res.json();

    return {
      status: res.status,
      body: data ?? null,
    };
  } catch (err) {
    console.log(err);
  }

  return {
    status: null,
    body: null,
  };
}
