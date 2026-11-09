# Message Demo for Vercel

This is a small Next.js App Router project that accepts a non-sensitive text message.

## Deploy

1. Extract this ZIP.
2. Import the extracted project into Vercel, or copy these files into the root of the existing Next.js project.
3. Ensure the Vercel project's **Root Directory** points to the folder containing `package.json` and `app/`.
4. Deploy.

The API route is `app/api/messages/route.js`. After deployment, it is available at:

`https://YOUR-DOMAIN/api/messages`

## Test

```bash
curl -i -X POST https://YOUR-DOMAIN/api/messages \
  -H "Content-Type: application/json" \
  -d '{"message":"Testing endpoint"}'
```

A successful response is:

```json
{"success":true}
```

## Important

- This demo accepts only a text field named `message`; do not use it to collect passwords, API keys, or other secrets.
- Submitted messages are written to Vercel runtime logs using `console.info`. Logs are not permanent database storage.
- If your existing project uses `src/app`, put the route at `src/app/api/messages/route.js` and the page/layout files under `src/app/`.
