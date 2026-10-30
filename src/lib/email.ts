import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "I3579akFPAYK4y_LS";
const EMAILJS_SERVICE_ID = "service_emew7q6";
const TEMPLATE_CONTACT = "template_flzt17z";
const TEMPLATE_DEFAULT = "template_gumqgv8";

export type CourseSlug =
  | "full-stack"
  | "python"
  | "cybersecurity"
  | "mobile"
  | "cloud-devops"
  | "ui-ux";

const COURSE_TEMPLATES: Record<CourseSlug, string> = {
  "full-stack": TEMPLATE_DEFAULT,
  python: TEMPLATE_DEFAULT,
  cybersecurity: TEMPLATE_DEFAULT,
  mobile: TEMPLATE_DEFAULT,
  "cloud-devops": TEMPLATE_DEFAULT,
  "ui-ux": TEMPLATE_DEFAULT,
};

let initialised = false;
function ensureInit() {
  if (!initialised) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    initialised = true;
  }
}

function getTemplate(slug?: CourseSlug): string {
  if (slug) return COURSE_TEMPLATES[slug];
  return TEMPLATE_CONTACT;
}

export interface EnrollPayload {
  name: string;
  email: string;
  phone: string;
  course: string;
  courseSlug: CourseSlug;
  message?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function sendEnrollment(payload: EnrollPayload) {
  ensureInit();

  await emailjs.send(EMAILJS_SERVICE_ID, getTemplate(payload.courseSlug), {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    course: payload.course,
    course_slug: payload.courseSlug,
    message: payload.message ?? "",
    submitted_at: new Date().toISOString(),
  });
}

export async function sendContact(payload: ContactPayload) {
  ensureInit();

  await emailjs.send(EMAILJS_SERVICE_ID, getTemplate(), {
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? "",
    subject: payload.subject ?? "Website inquiry",
    message: payload.message,
    submitted_at: new Date().toISOString(),
  });
}
