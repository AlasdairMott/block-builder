import { createSlice } from '@reduxjs/toolkit';

export enum ActiveTool {
    Add,
    Subtract
}

export type uiState = {
    mode: ActiveTool
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: ActiveTool.Add,
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload.mode;
        }
    }
});

export default uiSlice.reducer;
export const { changeMode } = uiSlice.actions;