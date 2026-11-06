import { useCallback, useEffect, useState } from "react";
import { profileApi } from "../services/profileApi";

/**
 * State + CRUD actions for the dining-profile records.
 * Every action talks to JSON Server, then updates local state so the UI
 * re-renders immediately.
 */
export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");

  /* READ */
  const load = useCallback(async () => {
    setStatus("loading");
    try {
      setProfiles(await profileApi.getAll());
      setError("");
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* CREATE */
  const createProfile = async (data) => {
    const created = await profileApi.create(data);
    setProfiles((prev) => [created, ...prev]);
    return created;
  };

  /* UPDATE */
  const updateProfile = async (id, data) => {
    const updated = await profileApi.update(id, data);
    setProfiles((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  /* DELETE */
  const deleteProfile = async (id) => {
    await profileApi.remove(id);
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    profiles,
    status,
    error,
    reload: load,
    createProfile,
    updateProfile,
    deleteProfile,
  };
}
