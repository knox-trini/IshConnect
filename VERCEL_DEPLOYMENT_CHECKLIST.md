# Vercel Deployment Checklist — EmailJS

## 1. Set Environment Variables in Vercel

Go to: **Vercel Dashboard → Project → Settings → Environment Variables**

Add **ALL** of the following (one by one):

| Variable                              | Value                                                    |
| ------------------------------------- | -------------------------------------------------------- |
| `VITE_EMAILJS_PUBLIC_KEY`             | From EmailJS Dashboard → Account → API Keys              |
| `VITE_EMAILJS_SERVICE_ID`             | From EmailJS Dashboard → Email Services → your service   |
| `VITE_EMAILJS_TEMPLATE_CONTACT`       | Template ID for contact form submissions                 |
| `VITE_EMAILJS_TEMPLATE_FULLSTACK`     | Template ID for full-stack enrollment                    |
| `VITE_EMAILJS_TEMPLATE_PYTHON`        | Template ID for python enrollment                        |
| `VITE_EMAILJS_TEMPLATE_CYBERSECURITY` | Template ID for cybersecurity enrollment                 |
| `VITE_EMAILJS_TEMPLATE_MOBILE`        | Template ID for mobile enrollment                        |
| `VITE_EMAILJS_TEMPLATE_CLOUD`         | Template ID for cloud/devops enrollment                  |
| `VITE_EMAILJS_TEMPLATE_UIUX`          | Template ID for UI/UX enrollment                         |
| `VITE_EMAILJS_TEMPLATE_DEFAULT`       | Fallback template (used for any missing course template) |

**Important:** Vercel env vars must use `VITE_` prefix. Vite only exposes `VITE_*` vars to the client bundle. Without this prefix, the vars will be `undefined` at runtime.

## 2. Redeploy

After setting environment variables:

```
Vercel Dashboard → Deployments → "Redeploy" the latest deployment
```

Or push a new commit to trigger auto-deploy.

## 3. Verify it works

1. Go to https://www.ishconnect.rw/contact
2. Fill out the form (use a real email)
3. Submit
4. Check **EmailJS Dashboard → Logs** — you should see a successful send
5. Check your connected email inbox for the message

## 4. If it still shows "Simulated send"

- Open **browser DevTools → Console**
- The error now shows: `"EmailJS not configured. Set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID in your .env file or Vercel environment variables."`
- This means the env vars are not reaching the client bundle
- Common causes:
  - Env var names in Vercel don't have the `VITE_` prefix
  - Env vars were added after the last deployment (need to redeploy)
  - Env vars are set in "Preview" but you're viewing "Production" (or vice versa)

## EmailJS Template Setup

Each template should use these template variables:

**Contact template (`VITE_EMAILJS_TEMPLATE_CONTACT`):**

```
{{name}} — sender name
{{email}} — sender email
{{phone}} — sender phone
{{subject}} — email subject
{{message}} — email body
{{submitted_at}} — timestamp
```

**Course enrollment templates (per course):**

```
{{name}} — student name
{{email}} — student email
{{phone}} — student phone
{{course}} — course name
{{course_slug}} — course slug
{{message}} — additional message
{{submitted_at}} — timestamp
```
