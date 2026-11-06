import seed from "../../db.json";
import { API_URL } from "../config";

/**
 * REST client for JSON Server  (resource: /profiles)
 *
 *   Create → POST   /profiles
 *   Read   → GET    /profiles
 *   Update → PUT    /profiles/:id
 *   Delete → DELETE /profiles/:id
 */
const ENDPOINT = `${API_URL}/profiles`;

async function request(url, options) {
  let response;
  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    // fetch() only rejects when the server cannot be reached at all
    throw new Error(
      `Cannot reach JSON Server at ${API_URL}. Start it with "npm run server".`,
    );
  }

  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

/* ------------------------------------------------------------------
   Preview build only (VITE_STORAGE=local): same API shape, but records
   live in the browser's localStorage, seeded from db.json.
------------------------------------------------------------------- */
const LS_KEY = "dinemate-profiles";
const readLocal = () => {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* storage blocked – fall through to the seed */
  }
  return structuredClone(seed.profiles);
};
const writeLocal = (rows) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
  } catch {
    /* ignore */
  }
  return rows;
};

const localApi = {
  getAll: async () => readLocal().sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  create: async (data) => {
    const rows = readLocal();
    const now = new Date().toISOString();
    const created = { ...data, id: Math.max(0, ...rows.map((r) => r.id)) + 1, createdAt: now, updatedAt: now };
    writeLocal([...rows, created]);
    return created;
  },
  update: async (id, data) => {
    const rows = readLocal();
    const updated = { ...data, id, updatedAt: new Date().toISOString() };
    writeLocal(rows.map((r) => (r.id === id ? updated : r)));
    return updated;
  },
  remove: async (id) => {
    writeLocal(readLocal().filter((r) => r.id !== id));
  },
};

const restApi = {
  /** READ – newest first */
  getAll: () => request(`${ENDPOINT}?_sort=createdAt&_order=desc`),

  /** CREATE */
  create: (data) => {
    const now = new Date().toISOString();
    return request(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ ...data, createdAt: now, updatedAt: now }),
    });
  },

  /** UPDATE (PUT replaces the whole record) */
  update: (id, data) =>
    request(`${ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...data, id, updatedAt: new Date().toISOString() }),
    }),

  /** DELETE */
  remove: (id) => request(`${ENDPOINT}/${id}`, { method: "DELETE" }),
};

export const IS_LOCAL_PREVIEW = import.meta.env.VITE_STORAGE === "local";
export const profileApi = IS_LOCAL_PREVIEW ? localApi : restApi;
