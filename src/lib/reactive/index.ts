import { computed as basicComputed, ref as basicRef, Reactive } from './reactive';

function sync<T>(reactive: Reactive<T>): Reactive<T> {
  const subscribe = reactive.subscribe;
  return Object.assign(reactive, {
    subscribe: (fn) => {
      const unsubscribe = subscribe(fn);
      fn(reactive.value);
      return unsubscribe;
    }
  });
}

export function ref<T>(v: T) {
  const r = basicRef(v);
  return sync(Object.assign(r, { set: (l) => r.value = l }));
}

export function compute<T>(compute: () => T): Reactive<T> {
  return sync(basicComputed(compute));
}