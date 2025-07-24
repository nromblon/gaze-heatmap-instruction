import { Page } from "@/types/manual-types";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ManualState {
  name: string;
  pages: Page[];
}

const initialState: ManualState = {
  name: "",
  pages: [],
};

const manualSlice = createSlice({
  name: "manual",
  initialState,
  reducers: {
    setManualName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addPage: (state, action: PayloadAction<Page>) => {
      state.pages.push(action.payload);
    },
    removePage: (state, action: PayloadAction<number>) => {
      state.pages.splice(action.payload, 1);
    },
    updatePage: (state, action: PayloadAction<{ index: number; page: Page }>) => {
      const { index, page } = action.payload;
      state.pages[index] = page;
    },
  },
});

export const { setManualName, addPage, removePage, updatePage } = manualSlice.actions;
export default manualSlice.reducer;