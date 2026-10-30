const API_BASE = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export type CmsRecord = Record<string, unknown> & {
  id: string;
  recordId: string;
  slug: string;
  name?: string;
  title?: string;
  isPublished: boolean;
  order: number;
};

export async function request(path: string, options: RequestInit = {}, admin = false) {
  const token =
    typeof sessionStorage === "undefined"
      ? ""
      : sessionStorage.getItem("ishconnect-admin-token") || "";
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(admin && token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || body.message || `Request failed (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

export async function getPublicContent<T>(type: string): Promise<T[]> {
  const result = await request(`/content/${type}`);
  return result.data as T[];
}

export async function getPublicItem<T>(type: string, slug: string): Promise<T> {
  const result = await request(`/content/${type}/${encodeURIComponent(slug)}`);
  return result.data as T;
}

export const cmsAdmin = {
  async setupStatus() {
    return request("/auth/setup-status");
  },
  async signup(email: string, password: string) {
    const result = await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    sessionStorage.setItem("ishconnect-admin-token", result.token);
    return result.admin;
  },
  async login(email: string, password: string) {
    const result = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    sessionStorage.setItem("ishconnect-admin-token", result.token);
    return result.admin;
  },
  async me() {
    return (await request("/auth/me", {}, true)).admin;
  },
  async logout() {
    try {
      await request("/auth/logout", { method: "POST" }, true);
    } finally {
      sessionStorage.removeItem("ishconnect-admin-token");
    }
  },
  async changePassword(currentPassword: string, newPassword: string) {
    return request(
      "/auth/change-password",
      { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) },
      true,
    );
  },
  async list(type: string): Promise<CmsRecord[]> {
    return (await request(`/admin/content/${type}`, {}, true)).data;
  },
  async create(type: string, data: Record<string, unknown>) {
    return (
      await request(`/admin/content/${type}`, { method: "POST", body: JSON.stringify(data) }, true)
    ).data as CmsRecord;
  },
  async update(type: string, id: string, data: Record<string, unknown>) {
    return (
      await request(
        `/admin/content/${type}/${id}`,
        { method: "PATCH", body: JSON.stringify(data) },
        true,
      )
    ).data as CmsRecord;
  },
  async remove(type: string, id: string) {
    return request(`/admin/content/${type}/${id}`, { method: "DELETE" }, true);
  },
};

const images = import.meta.glob("/src/assets/**/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
export function resolveCmsImage(value?: string) {
  if (!value) return "";
  if (/^(https?:|data:|blob:|\/)/i.test(value) && !value.startsWith("/src/assets/")) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return images[path] || value;
}
