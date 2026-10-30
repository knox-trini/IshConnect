# IshConnect CMS API

A standalone Express and MongoDB API for the event management operations represented by the existing events editor. No frontend files were changed. The editor still uses browser localStorage until connected to this API.

## Scope audit

The repository has one management interface: the events editor embedded on the home page. Its actions are add, edit/save, list/view, and delete. Services, portfolio, testimonials, partners, academy, DevQueens, WebCare, and statistics are static frontend data, not existing CMS models or management operations here. There are no existing media upload, publish/unpublish, archive/restore, approval, reorder, or bulk-action flows to implement.

## Local setup

Use Node.js 20 or newer and a running MongoDB instance.

1. Install project dependencies with npm ci.
2. Copy .env.example to .env.
3. Set **MONGODB_URI** to your MongoDB connection string. Local example: mongodb://127.0.0.1:27017/ishconnect.
4. Set **CMS_ADMIN_USERNAME**.
5. Generate a bcrypt password hash and set **CMS_ADMIN_PASSWORD_HASH**. Do not store the plaintext password.
6. Generate a random JWT signing key and set **JWT_SECRET** to at least 32 characters.
7. Set **CORS_ORIGIN** to the exact comma-separated frontend origins allowed to call the API.
8. Start the API with npm run api. It listens on port 4000 by default; GET /health reports database connectivity.

In PowerShell, generate the hash and JWT secret with:

    $env:CMS_ADMIN_PASSWORD='choose-a-strong-password'
    node --input-type=module -e "import bcrypt from 'bcryptjs'; console.log(await bcrypt.hash(process.env.CMS_ADMIN_PASSWORD, 12))"
    node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"

Copy the hash and random key into .env, then remove the temporary CMS*ADMIN_PASSWORD variable. Keep all backend secrets server-side. Never use a VITE* prefix for them.

## MongoDB setup

### Local MongoDB

Start the local MongoDB service, then use mongodb://127.0.0.1:27017/ishconnect as MONGODB_URI. MongoDB creates the database and event collection on the first write.

### MongoDB Atlas

1. Create an Atlas project and cluster.
2. Create a database user with a strong password; do not use the Atlas account password.
3. Add the backend host's outbound IP to the Atlas network access list.
4. Copy the Node.js driver connection string and replace its username, password, and database name.
5. Set the completed connection string as MONGODB_URI in the backend host's environment variables. Do not commit it to the repository.

## Authentication

POST /api/auth/login accepts username and password and returns a signed HS256 JWT that expires in 15 minutes. Password verification uses bcrypt. Login attempts are rate limited. Protected event writes require Authorization: Bearer followed by this JWT. The API accepts only admin-role tokens it issued; it does not trust a client-supplied role.

## Event API

| Method | Path            | Access               | Database action                                          |
| ------ | --------------- | -------------------- | -------------------------------------------------------- |
| POST   | /api/auth/login | Public, rate limited | Verifies admin credentials and returns a short-lived JWT |
| GET    | /api/events     | Public               | Lists events with q, type, from, to, page, and limit     |
| GET    | /api/events/:id | Public               | Reads one event by stable string id                      |
| POST   | /api/events     | Admin JWT            | Inserts a validated event; returns 201 and saved record  |
| PUT    | /api/events/:id | Admin JWT            | Updates permitted fields on the matching event           |
| PATCH  | /api/events/:id | Admin JWT            | Applies partial update; omitted fields remain unchanged  |
| DELETE | /api/events/:id | Admin JWT            | Permanently removes the matching event                   |

Create fields are id, type, title, date, time, location, summary, and optional link. Updates accept any subset except id. Duplicate IDs return 409, invalid input or ID formats return 400, missing records return 404, and missing/invalid JWTs return 401. Successful writes emit structured audit entries with authenticated username, action, event id, time, and changed field names; tokens and event field values are not logged. Requests are rate limited.

## Tests

Run integration tests with npm run test:api. They use **MONGODB_TEST_URI** or the isolated default mongodb://127.0.0.1:27017/ishconnect_test. The test runner refuses a database name without test and only clears the Event collection in that test database.

The suite covers valid and invalid login, signed JWT authorization and role checks, CORS restrictions, invalid JSON and event validation, create and duplicate handling, MongoDB persistence, detail reads, search/filter/pagination, partial and full updates, no-upsert behavior, malformed IDs, audits, delete, and repeat-delete behavior.

## Deployment

The current Vercel configuration serves the frontend only. Deploy the Express process as a separate Node.js service, then:

1. Set the required MongoDB and admin environment variables in the host dashboard.
2. Set CORS_ORIGIN to the production website origin.
3. Set the service start command to npm start.
4. Wait for GET /health to return status ok.
5. Test POST /api/auth/login, then use the JWT to call protected event routes.

Existing frontend integration remains intentionally untouched. To make the current editor persist changes through this API, a future data-handling change must load GET /api/events and send POST, PATCH, and DELETE requests; the current client passcode gate cannot securely authorize server writes. Existing static seed events are not automatically imported into MongoDB.

## Operation checklist

- [x] Events — create (POST), list/search/filter/paginate (GET), detail (GET), edit/save (PUT/PATCH), delete (DELETE). Automated MongoDB integration tests cover each operation.
- [ ] Other named content types — no current management API or CMS model exists for these static frontend data sets.
- [ ] Publish/archive/media/bulk operations — no corresponding existing frontend operation or backend model exists.
- [ ] Connect the existing editor to persistent storage — frontend remains unchanged under the backend-only constraint.
