import { ref } from '../lib/reactive';
import { useRequest } from './request';

export const user = ref(null as { username: string, email: string });
export const jwt = ref(localStorage.getItem('jwtToken') as string);

jwt.subscribe((value) => {
  localStorage.setItem('jwtToken', value);
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
    }, 1500);
  });
}

export async function me() {
  if (!jwt.value) {
    return null;
  }
  // TODO: recover the user
}

export async function futureLogin(email: string, password: string) {
  const { post } = useRequest();
  const userResponse = await post('/api/login', { email, password });
  user.value = userResponse as any;
  return userResponse;
}