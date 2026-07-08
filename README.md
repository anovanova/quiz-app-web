## Getting Started

Create a `.env.local` file in the root directory.

Then add this `env` variables:

BACKEND_URL=http://127.0.0.1:8787
FRONTEND_URL=http://localhost:3000
JWT_SECRET=<i>depends on your preferred jwt secret but you can use <b>secret</b> for testing purposes</i>

<i>Note: JWT_SECRET env variable needs to be the same in both frontend and backend</i>

**Run the development server:**

```bash
npm install
npm run dev
```

**Credentials for login:**

Username: user
Password: password

**To run the test:**

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
