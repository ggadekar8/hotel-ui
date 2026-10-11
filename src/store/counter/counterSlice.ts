import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ICounter } from '../../common/model/users/types';
import { fetchCounters } from './counterThunk';

interface CounterState {
  counters: ICounter[];
  selectedCounterId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  counters: [],
  selectedCounterId: null,
  isLoading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setCounters: (state, action: PayloadAction<ICounter[]>) => {
      state.counters = action.payload;
    },

    addCounterToState: (state, action: PayloadAction<ICounter>) => {
      state.counters.push(action.payload);
    },

    updateCounter: (state, action: PayloadAction<ICounter>) => {
      const index = state.counters.findIndex((counter) => counter.id === action.payload.id);
      if (index !== -1) {
        state.counters[index] = action.payload;
      }
    },

    removeCounter: (state, action: PayloadAction<string | number>) => {
      state.counters = state.counters.filter(
        (counter) => String(counter.id) !== String(action.payload),
      );

      if (state.selectedCounterId === String(action.payload)) {
        state.selectedCounterId = null;
      }
    },

    setSelectedCounterId: (state, action: PayloadAction<string | null>) => {
      state.selectedCounterId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCounters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.counters = action.payload;
      })
      .addCase(fetchCounters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to load counters';
      });
  },
});

export const {
  setLoading,
  setError,
  setCounters,
  addCounterToState,
  updateCounter,
  removeCounter,
  setSelectedCounterId,
} = counterSlice.actions;

export default counterSlice.reducer;
