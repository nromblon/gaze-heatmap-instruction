import { Manual } from "@/types/manual-types";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ManualState {
  currentManual: Manual | null;
  manuals: Manual[];
}

const initialState: ManualState = {
  currentManual: null,
  manuals: [],
};

const manualSlice = createSlice({
  name: "manuals",
  initialState,
  reducers: {
    setCurrentManual: (state, action: PayloadAction<Manual | null>) => {
      state.currentManual = action.payload;
    },
    addManual: (state, action: PayloadAction<Manual>) => {
      state.manuals.push(action.payload);
    },
    updateManual: (state, action: PayloadAction<Manual>) => {
      const index = state.manuals.findIndex(
        (manual) => manual.name === action.payload.name
      );
      if (index !== -1) {
        state.manuals[index] = action.payload;
      }
    },
    deleteManual: (state, action: PayloadAction<string>) => {
      state.manuals = state.manuals.filter(
        (manual) => manual.name !== action.payload
      );
    },
    clearManuals: (state) => {
      state.manuals = [];
    },
  },
});

export const { setCurrentManual, addManual, updateManual, deleteManual, clearManuals } = manualSlice.actions;
export default manualSlice.reducer;