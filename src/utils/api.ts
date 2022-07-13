export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum MimeType {
  JSON = 'application/json',
}

interface ApiOptions {
  method?: HttpMethod,
  inputMime?: MimeType;
  payload?: any,
}

interface ApiReturn<T> {
  body: T | null;
  status: number | null;
}

export async function api<T>(url: string, options?: ApiOptions): Promise<ApiReturn<T>> {
  try {
    const res = await fetch(url, {
      method: options?.method ?? HttpMethod.GET,
      body: options?.payload && JSON.stringify(options.payload),
      headers: {
        'Content-Type': options?.inputMime ?? MimeType.JSON,
      },
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
