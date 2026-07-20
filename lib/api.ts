import type { ApiFailure, ApiSuccess } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export class ApiClientError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
}

const buildUrl = (path: string, query?: RequestOptions["query"]) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && !Number.isNaN(value)) url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query } = options;

  const res = await fetch(buildUrl(path, query), {
    method,
    credentials: "include", // send the better-auth session cookie
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as ApiSuccess<T> | ApiFailure | null;

  if (!res.ok || !json || json.success === false) {
    const message = (json as ApiFailure | null)?.message || `Request failed (${res.status})`;
    throw new ApiClientError(message, res.status);
  }

  return (json as ApiSuccess<T>).data;
}
