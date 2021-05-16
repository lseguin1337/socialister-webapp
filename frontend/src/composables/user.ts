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
  const { send } = useRequest('POST', '/api/auth/login');
  const { access_token } = await send({ username, password });
  jwt.value = access_token;
  return me();
}

export async function logout() {
  const { send } = useRequest('POST', '/api/auth/logout');
  await send();
  jwt.value = null;
  user.value = null;
  router.navigate('login');
}

export async function me() {
  if (!jwt.value) {
    return null;
  }
  const { send } = useRequest('GET', '/api/users/me');
  user.value = await send();
  return user.value;
}

export async function refresh() {
  const { send } = useRequest('POST', '/api/auth/refresh');
  const { access_token } = await send();
  jwt.value = access_token;
}