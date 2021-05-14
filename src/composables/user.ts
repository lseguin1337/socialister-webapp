import { ref } from '../lib/reactive';
import { useRequest } from './request';

export const user = ref(null as { username: string, email: string });
export const jwt = ref(localStorage.getItem('jwtToken') as string);

jwt.subscribe((value) => {
  if (value)
    localStorage.setItem('jwtToken', value);
  else
    localStorage.removeItem('jwtToken');
});

export async function login(email: string, _: string) {
  // TODO: make a real call
  return new Promise((resolve) => {
    setTimeout(() => {
      user.value = {
        username: email,
        email,
      };
      resolve(user.value);
    }, 300);
  });
}

export async function logout() {
  jwt.value = null;
  user.value = null;
}

export async function me() {
  const { send } = useRequest('GET', '/api/me');
  if (!jwt.value) {
    return null;
  }
  user.value = await send();
  return user.value;
}

export async function futureLogin(email: string, password: string) {
  const { send } = useRequest('POST', '/api/login');
  user.value = await send({ email, password });
  return user.value;
}