import { Context, Hono } from 'hono';
import { fetchUserProfile } from '../lib';

const port = +(Bun.env.PORT ?? 1234);

const app = new Hono();

app.get('/api/users/:userId', async (context) => {
  const userId = context.req.param('userId');
  const data = await fetchUserProfile({ userId });

  return context.json(data);
});

export default {
  port,
  fetch: app.fetch
};


// const server = Bun.serve({
//   port: 1234,
//   fetch(request) {
//     return new Response("Welcome to Bun!");
//   },
// });

// console.log(`Listening on localhost:${server.port}`);