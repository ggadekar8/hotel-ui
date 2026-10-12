export interface ActiveUser {
  id: number | string;
  name: string;
  email?: string;
  phone?: string;
  roleId: number;
}

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
      (typeof parsed.id === "number" || typeof parsed.id === "string") &&
      "name" in parsed &&
      typeof parsed.name === "string" &&
      "roleId" in parsed &&
      typeof parsed.roleId === "number" &&
      (!("email" in parsed) || typeof parsed.email === "string") &&
      (!("phone" in parsed) || typeof parsed.phone === "string")
    ) {
      const email = "email" in parsed && typeof parsed.email === "string"
        ? parsed.email
        : undefined;
      const phone = "phone" in parsed && typeof parsed.phone === "string"
        ? parsed.phone
        : undefined;

      return {
        id: parsed.id,
        name: parsed.name,
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
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
