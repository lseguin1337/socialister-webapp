import { ref } from '../lib/reactive';
import { jwt } from './user';

function fetchRequest({ method, url, data, signal, headers }: { method: string, url: string, data?: any, signal?: AbortSignal, headers?: HeadersInit }) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...(jwt.value ? { 'Authorization': `Bearer ${jwt.value}` } : {}),
      ...headers,
    },
    body: data ?? JSON.stringify(data),
    method,
    signal,
  });
}

export function useRequest(method: string, url: string) {
  const response = ref(null);
  const loading = ref(false);
  const controller = new AbortController();

  async function send(data?: any) {
    try {
      abort();
      loading.value = true;
      response.value = await fetchRequest({ method, url, data, signal: controller.signal });
      return response.value;
    } finally {
      loading.value = false;
    }
  }

  function abort() {
    controller.abort();
  }

  return {
    loading,
    response,
    abort,
    send,
  };
}