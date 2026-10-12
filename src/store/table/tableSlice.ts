import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
   addTable,fetchTables  
} from "./tableThunks";

import type { ITable } from "../../common/model/users/types";

interface TableState {
  data: ITable[];
  loading: boolean;
  menusLoading: boolean;
  error: string | null;
  menuError: string | null;
}

const initialState: TableState = {
  data: [],
  loading: false,
  menusLoading: false,
  error: null,
  menuError: null,
};

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    updateTable: (state, action: PayloadAction<ITable>) => {
      state.data = state.data.map((table) =>
        table.id === action.payload.id ? action.payload : table,
      );
    },
    removeTable: (state, action: PayloadAction<ITable["id"]>) => {
      state.data = state.data.filter((table) => table.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchTables.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchTables.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        }
      )

      .addCase(
        fetchTables.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ||
            "Something went wrong";
        }
      )
     
      .addCase(addTable.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      });
  },
});

export const { updateTable, removeTable } = tableSlice.actions;

export default tableSlice.reducer;
