import { createAsyncThunk } from
"@reduxjs/toolkit";

import { getUsers, createUser, getMenus, createMenu, login } from "../../services/user.service";
import { saveActiveUserSession, clearActiveUserSession, type ActiveUser } from "../../services/session.service";
import { verifyCustomerOtp } from "../../services/customer-auth.service";
import type { Menu } from "../../common/model/users/types";
import { LoginRole } from "../../common/model/users/roles";

export const fetchUsers =
  createAsyncThunk(
    "users/fetchUsers",
    async () => {
      return await getUsers();
    }
  );

export const addUser =
  createAsyncThunk(
    "users/addUser",
    async (data: {
      name: string;
      email: string;
    }) => {
      return await createUser(data);
    }
  );

export const fetchMenus =
  createAsyncThunk(
    "users/fetchMenus",
    async () => {
      return await getMenus();
    }
  );

export const addMenu =
  createAsyncThunk(
    "users/addMenu",
    async (menu: Menu) => createMenu(menu),
  );

export const loginUser = createAsyncThunk<
  ActiveUser,
  { userName: string; password: string },
  { rejectValue: string }
>("users/login", async ({ userName, password }, { rejectWithValue }) => {
  const user = await login(userName, password);
  if (!user) return rejectWithValue("Invalid username or password");

  const activeUser: ActiveUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
  };
  saveActiveUserSession(activeUser);
  return activeUser;
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
  clearActiveUserSession();
});

export const loginCustomerWithOtp = createAsyncThunk<
  ActiveUser,
  { name: string; phone: string; otp: string; tableId?: string },
  { rejectValue: string }
>(
  "users/loginCustomerWithOtp",
  async (request, { rejectWithValue }) => {
    try {
      const customer = await verifyCustomerOtp(request);
      const activeUser: ActiveUser = {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        ...(customer.phone ? { email: customer.phone } : {}),
        roleId: LoginRole.Customer,
      };
      saveActiveUserSession(activeUser);
      return activeUser;
    } catch {
      return rejectWithValue("OTP verification failed. Check the code and try again.");
    }
  },
);