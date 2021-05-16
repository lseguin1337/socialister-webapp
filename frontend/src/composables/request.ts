import { ref } from '../lib/reactive';
import { jwt, refresh } from './user';

let refreshing = false;

async function fetchRequest({ method, url, data, signal, headers }: { method: string, url: string, data?: any, signal?: AbortSignal, headers?: HeadersInit }) {
  function perform() {
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        ...(data ? { 'Content-Type': 'application/json' } : {}),
        ...(jwt.value ? { 'Authorization': `Bearer ${jwt.value}` } : {}),
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      method,
      signal,
    });
  }

  let repsonse = await perform();
  if (repsonse.status === 401 && !refreshing) {
    refreshing = true;
    await refresh();
    refreshing = false;
    repsonse = await perform();
  }

  if (repsonse.status >= 400) {
    console.error(repsonse);
    throw new Error(`Http error ${repsonse.status}`);
  }
  return repsonse.json();
}

export function useRequest(method: string, url: string) {
  const response = ref(null);
  const loading = ref(false);
  let controller: AbortController;

  async function send(data?: any) {
    try {
      abort();
      controller = new AbortController();
      loading.value = true;
      response.value = await fetchRequest({ method, url, data, signal: controller.signal });
      return response.value;
    } finally {
      loading.value = false;
    }
  }

  function abort() {
    controller?.abort();
    controller = null;
  }

  return {
    loading,
    response,
    abort,
    send,
  };
}