import { createAsyncThunk } from
"@reduxjs/toolkit";

import {  createCounter,getCounters } from "../../services/counter.service";

export const fetchCounters =
  createAsyncThunk(
    "counters/fetchCounters",
    async () => {
      return await getCounters();
    }
  );

export const addCounter =
  createAsyncThunk(
    "counters/addCounter",
    async (data: {
      name: string;
      email: string;
    }) => {
      return await createCounter(data);
    }
  );

 