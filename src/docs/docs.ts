import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

export const docsSetup = (app: Elysia) =>
  app
    .use(
      swagger({
        path: '/api-docs',
        documentation: {
          info: {
            title: 'Bun.js CRUD app with Elysia.js',
            version: '1.0.0',
          },
        },
      })
);