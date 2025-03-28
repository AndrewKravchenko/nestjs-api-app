import type { HttpMethod } from '@features/endpoint/entities';
import type { Router } from 'express';

export const getAvailableRoutes = (router: Router) =>
  router.stack
    .filter((layer) => layer.route)
    .map(({ route }) => {
      const path = route!.path;
      const method = route!.stack[0].method.toUpperCase() as HttpMethod;
      return { method, url: path };
    });
