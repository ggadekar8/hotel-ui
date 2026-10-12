import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import { type IWaiter } from '../../common/model/users/types';
import { fetchWaiters } from './waiterThunks';
 

interface WaiterState {
  waiters: IWaiter[];
  selectedWaiterId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WaiterState = {
  waiters: [],
  selectedWaiterId: null,
  isLoading: false,
  error: null,
};

const waiterSlice = createSlice({
  name: 'waiter',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setWaiters: (state, action: PayloadAction<IWaiter[]>) => {
      state.waiters = action.payload;
    },

    addWaiter: (state, action: PayloadAction<IWaiter>) => {
      state.waiters.push(action.payload);
    },

    updateWaiter: (state, action: PayloadAction<IWaiter>) => {
      const index = state.waiters.findIndex((waiter) => waiter.id === action.payload.id);
      if (index !== -1) {
        state.waiters[index] = action.payload;
      }
    },

    removeWaiter: (state, action: PayloadAction<string | number>) => {
      state.waiters = state.waiters.filter(
        (waiter) => String(waiter.id) !== String(action.payload),
      );

      if (state.selectedWaiterId === String(action.payload)) {
        state.selectedWaiterId = null;
      }
    },

    setSelectedWaiterId: (state, action: PayloadAction<string | null>) => {
      state.selectedWaiterId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaiters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaiters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waiters = action.payload;
      })
      .addCase(fetchWaiters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to load waiters';
      });
  },
});

export const {
  setLoading,
  setError,
  setWaiters,
  addWaiter,
  updateWaiter,
  removeWaiter,
  setSelectedWaiterId,
} = waiterSlice.actions;

export default waiterSlice.reducer;
