import type { IUser } from "../common/model/users/types";

export type ActiveUser = Omit<IUser, "password">;

const ACTIVE_USER_KEY = "activeUser";

export const readActiveUserSession = (): ActiveUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = window.localStorage.getItem(ACTIVE_USER_KEY);
    if (!storedUser) return null;

    const parsed: unknown = JSON.parse(storedUser);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "id" in parsed &&
      typeof parsed.id === "number" &&
      "name" in parsed &&
      typeof parsed.name === "string" &&
      "email" in parsed &&
      typeof parsed.email === "string" &&
      "roleId" in parsed &&
      typeof parsed.roleId === "number"
    ) {
      return {
        id: parsed.id,
        name: parsed.name,
        email: parsed.email,
        roleId: parsed.roleId,
      };
    }

    window.localStorage.removeItem(ACTIVE_USER_KEY);
  } catch {
    window.localStorage.removeItem(ACTIVE_USER_KEY);
  }

  return null;
};

export const saveActiveUserSession = (user: ActiveUser): void => {
  window.localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
};

export const clearActiveUserSession = (): void => {
  window.localStorage.removeItem(ACTIVE_USER_KEY);
};
