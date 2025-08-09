// =============================================
// /hooks/useApi.ts
// =============================================
import { useAuth } from "@/context/AuthProvider";

export function useApi() {
  const { token } = useAuth();
  const base = process.env.NEXT_PUBLIC_API_BASE || "";

  async function api<T = any>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${base}${path}` , {
      ...init,
      headers: {
        "Content-Type": init.body instanceof FormData ? undefined as any : "application/json",
        ...(init.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as T;
  }

  return { api };
}