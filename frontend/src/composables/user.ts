import { ref } from '../lib/reactive';
import { router } from '../routes';
import { useRequest } from './request';

export const user = ref(null as { username: string, email: string });
export const jwt = ref(localStorage.getItem('jwtToken') as string);

jwt.subscribe((value) => {
  if (value)
    localStorage.setItem('jwtToken', value);
  else
    localStorage.removeItem('jwtToken');
});

export async function login(username: string, password: string) {
  const { access_token } = await useRequest('POST', '/api/auth/login').send({ username, password });
  jwt.value = access_token;
  const user = await me();
  router.navigate('overview');
  return user;
}

export async function logout() {
  await useRequest('POST', '/api/auth/logout').send();
  jwt.value = null;
  user.value = null;
  router.navigate('login');
}

export async function refresh() {
  const { access_token } = await useRequest('POST', '/api/auth/refresh').send();
  jwt.value = access_token;
}

export async function me() {
  if (!jwt.value) {
    return null;
  }
  user.value = await useRequest('GET', '/api/users/me').send();
  return user.value;
}