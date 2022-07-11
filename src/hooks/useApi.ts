import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export function useApi<T>(url: string, deps: any[] = []): [number | null, T | null] {
  const [body, setBody] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { status: resStatus, body: resBody } = await api<T>(url);

      setBody(resBody);
      setStatus(resStatus);
    })();
  }, [...deps]);

  return [status, body];
}
