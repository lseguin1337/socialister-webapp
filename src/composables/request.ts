import { jwt } from './user';

function fetchRequest(method: string, url: string, data?: any) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(jwt.value ? { 'Authorization': `Bearer ${jwt.value}` } : {}),
    },
    body: data ?? JSON.stringify(data),
    method,
  });
}

export function useRequest() {
  return {
    post: (url: string, data: any) => fetchRequest('POST', url, data),
    get: (url: string) => fetchRequest('GET', url),
  };
}