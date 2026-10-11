import { createAsyncThunk } from
"@reduxjs/toolkit";

import { getUsers, createUser, getMenus, createMenu } from "../../services/user.service";
import type { Menu } from "../../common/model/users/types";

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