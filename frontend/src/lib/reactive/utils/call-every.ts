export function callEvery(fns: Array<Function> | Set<Function>, args = []) {
  for (const fn of fns) {
    fn(...args);
  }
}