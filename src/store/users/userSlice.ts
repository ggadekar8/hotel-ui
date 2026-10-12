import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  addMenu,
  fetchMenus,
  fetchUsers,
  loginUser,
  logoutUser,
} from "./userThunks";

import type { Menu, IUser } from "../../common/model/users/types";
import { readActiveUserSession, type ActiveUser } from "../../services/session.service";

interface UserState {
  data: IUser[];
  activeUser: ActiveUser | null;
  menus: Menu[];
  loading: boolean;
  menusLoading: boolean;
  error: string | null;
  menuError: string | null;
}

const initialState: UserState = {
  data: [],
  activeUser: readActiveUserSession(),
  menus: [],
  loading: false,
  menusLoading: false,
  error: null,
  menuError: null,
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    renameMenu: (
      state,
      action: PayloadAction<{ id: number; name: string }>,
    ) => {
      const menu = state.menus.find(({ id }) => id === action.payload.id);
      if (menu) menu.menu = action.payload.name;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchUsers.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchUsers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        fetchUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ||
            "Something went wrong";
        }
      )
      .addCase(fetchMenus.pending, (state) => {
        state.menusLoading = true;
        state.menuError = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.menusLoading = false;
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.menusLoading = false;
        state.menuError = action.error.message || "Unable to load menus";
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.menus = [...state.menus, action.payload];
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.activeUser = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.activeUser = null;
      });
  },
});

export const { renameMenu } = userSlice.actions;

export default userSlice.reducer;
