import { callEvery } from '../utils/call-every'; 

export function useSubscription() {
  const subscribers = new Set<Function>();
  const onStartHandlers = new Set<Function>();
  const onStopHandlers = new Set<Function>();

  function subscribe(fn) {
    const handler = (...args) => fn(...args);
    subscribers.add(handler);
    if (subscribers.size === 1)
      callEvery(onStartHandlers);
    return () => {
      if (subscribers.size === 0)
        return;
      subscribers.delete(handler);
      if (subscribers.size === 0)
        callEvery(onStopHandlers);
    };
  }

  function dispatch(...args) {
    callEvery(subscribers, args);
  }

  function onStart(fn) {
    onStartHandlers.add(() => fn());
  }

  function onStop(fn) {
    onStopHandlers.add(() => fn());
  }
  
  return {
    onLastUnsubscription: onStop,
    onFirstSubscription: onStart,
    subscribe,
    dispatch,
  };
}