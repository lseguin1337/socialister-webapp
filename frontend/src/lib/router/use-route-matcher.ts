import Route from 'route-parser';

interface Route {
  path: string;
  name: string;
}

function prepareRoutes<T extends Route>(routes: T[]) {
  return routes.map((routeDef) => {
    return {
      routeDef,
      routeMatcher: new Route(routeDef.path),
    };
  });
}

export function useRouteResolver<T extends Route>(routes: T[]) {
  const perparedRoutes = prepareRoutes(routes);

  function resolve(url: string) {
    for (const item of perparedRoutes) {
      const params = item.routeMatcher.match(url);
      if (params) {
        return { route: item.routeDef, params };
      }
    }
    return null;
  }

  function reverse(name: string, params: any) {
    const item = perparedRoutes.find(({ routeDef }) => routeDef.name === name);
    if (!item) {
      return null;
    }
    return item.routeMatcher.reverse(params || {});
  }

  return {
    resolve,
    reverse,
  };
}