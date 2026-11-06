import { createContext, useContext } from "react";
import { useProfiles } from "../hooks/useProfiles";

const ProfilesContext = createContext(null);

/** One shared useProfiles() instance so the CRUD section and the AI demo see the same data. */
export function ProfilesProvider({ children }) {
  const value = useProfiles();
  return <ProfilesContext.Provider value={value}>{children}</ProfilesContext.Provider>;
}

export const useProfilesContext = () => {
  const ctx = useContext(ProfilesContext);
  if (!ctx) throw new Error("useProfilesContext must be used inside <ProfilesProvider>");
  return ctx;
};
