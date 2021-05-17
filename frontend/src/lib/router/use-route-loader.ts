import { RouteDef } from "./use-router";
import { ref } from "../reactive";

export interface Route {
  name: string;
  props: any;
  Component: any;
}

function creatAbortable() {
  let previous = null;
  return {
    new: () => {
      let aborted = false;
      previous?.abort();
      previous = { abort: () => aborted = true };
      return {
        get aborted() {
          return aborted;
        }
      };
    },
  };
}

export function useRouteLoader() {
  const loading = ref(false);
  const route = ref(null as Route);
  const abortable = creatAbortable();

  async function load(def: RouteDef, params: any) {
    const scope = abortable.new();
    try {
      loading.value = true;
      const [props, Component] = await Promise.all([
        def.paramsToProps ? def.paramsToProps(params) : Promise.resolve(params),
        def.loader(),
      ]);
      if (scope.aborted) return;
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