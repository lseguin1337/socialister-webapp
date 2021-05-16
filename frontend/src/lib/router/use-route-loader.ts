import { RouteDef } from "./use-router";
import { ref } from "../reactive";

export interface Route {
  name: string;
  props: any;
  Component: any;
}

export function useRouteLoader() {
  const loading = ref(false);
  const route = ref(null as Route);

  async function load(def: RouteDef, params: any) {
    try {
      loading.value = true;
      return (route.value = {
        name: def.name,
        props: def.paramsToProps ? await def.paramsToProps(params) : params,
        Component: await def.loader(),
      });
    } finally {
      loading.value = false;
    }
  }

  return {
    route,
    loading,
    load,
  };
}