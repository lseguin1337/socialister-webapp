import { ref } from "../reactive";

export function useCurrentUrl() {
  const url = ref(null as string);

  function computeUrl() {
    url.value = window.location.hash.replace(/^#/, '') || '/';
  }
  window.addEventListener("hashchange", computeUrl, false);
  computeUrl();

  return {
    url,
  };
}
