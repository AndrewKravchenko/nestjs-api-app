import type { Router } from 'express';

export const getAllRoutes = (router: Router) => ({
  routes: router.stack
    .filter((layer) => layer.route)
    .map(({ route }) => {
      const path = route!.path;
      const method = route!.stack[0].method;
      return `${method.toUpperCase()} ${path}`;
    }),
});
