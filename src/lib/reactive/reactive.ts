import { scope, register } from "./utils/magic-context";
import { useSubscription } from "./composables/use-subscription";

export interface Reactive<T> {
  subscribe: (handler: (v: T) => void) => (() => void),
  value: T;
}

function watchFn<T>(fn: () => T, dispatch: (v: T, isFirst: boolean) => void) {
  let unsubscribeAll = () => {};

  function compute(isFirst: boolean) {
    const { onChange, value } = scope(fn);
    dispatch(value, isFirst);
    unsubscribeAll = onChange(compute);
  }
  compute(true);
  return () => unsubscribeAll();
}

export function watch<T>(reactive: Reactive<T>, handler: (v: T) => void, options?: { immediate: boolean }) {
  const unsubscribe = reactive.subscribe(handler);
  if (options?.immediate) {
    handler(reactive.value);
  }
  return unsubscribe;
}

export function ref<T>(value: T): Reactive<T> {
  const { subscribe, dispatch } = useSubscription();

  return {
    subscribe,
    get value() {
      register(subscribe);
      return value;
    },
    set value(v) {
      value = v;
      dispatch(value);
    }
  };
}

export function computed<T>(compute: () => T): Reactive<T> {
  const { subscribe, onFirstSubscription, onLastUnsubscription, dispatch } = useSubscription();
  let computedValue: any;
  let unsubscribe: Function;

  onFirstSubscription(() => {
    unsubscribe = watchFn(compute, (value, isFirst) => {
      computedValue = value;
      if (!isFirst) dispatch(value);
    });
  });

  onLastUnsubscription(() => {
    unsubscribe();
  });

  function getComputedValue() {
    subscribe(() => {})();
    return computedValue;
  }

  return {
    subscribe,
    get value() {
      register(subscribe);
      return getComputedValue();
    },
  };
}
