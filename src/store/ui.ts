import { createSlice } from '@reduxjs/toolkit';
import { sound } from './grid';

export enum ActiveTool {
    Add,
    Subtract
}

export type uiState = {
    mode: ActiveTool,
    muted: boolean
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: ActiveTool.Add,
        muted: false
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload.mode;
        },
        toggleSound: (state) => {
            sound.muted = !sound.muted;
            state.muted = sound.muted;
        }
    }
});

export default uiSlice.reducer;
export const { changeMode, toggleSound } = uiSlice.actions;