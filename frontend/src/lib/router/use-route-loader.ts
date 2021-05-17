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
      const [props, Component] = await Promise.all([
        def.paramsToProps ? def.paramsToProps(params) : Promise.resolve(params),
        def.loader(),
      ]);
      route.value = {
        name: def.name,
        props,
        Component,
      };
      return route.value;
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