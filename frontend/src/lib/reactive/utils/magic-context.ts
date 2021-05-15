import { callEvery } from "./call-every";

const context = { currentContext: null };

function createContext() {
  return {
    refs: new Set<Function>(),
  };
}

export function register(subscriber) {
  context.currentContext?.refs.add(subscriber);
}

export function scope(fn: Function) {
  const ctx = createContext();
  const parentContext = context.currentContext;
  context.currentContext = ctx;
  const value = fn();
  context.currentContext = parentContext;

  function onChange(fn) {
    const dependencies = Array.from(ctx.refs).map((s: any) => s(() => {
      unsubscribeAll();
      fn();
    }));

    function unsubscribeAll() {
      callEvery(dependencies);
    }

    return unsubscribeAll;
  }

  return {
    onChange,
    value
  };
}