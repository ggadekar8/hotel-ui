import { createAsyncThunk } from
"@reduxjs/toolkit";

import {  createWaiter, getWaiters } from "../../services/waiter.service";

export const fetchWaiters =
  createAsyncThunk(
    "waiters/fetchWaiters",
    async () => {
      return await getWaiters();
    }
  );

export const addWaiter =
  createAsyncThunk(
    "waiters/addWaiter",
    async (data: {
      name: string;
      email: string;
    }) => {
      return await createWaiter(data);
    }
  );

 