import { createSlice } from '@reduxjs/toolkit';
import { sound } from './grid';

export enum ActiveTool {
    Add,
    Subtract
}

export type uiState = {
    mode: ActiveTool,
    muted: boolean,
    perspective: boolean,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: ActiveTool.Add,
        muted: false,
        perspective: false,
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload.mode;
        },
        toggleSound: (state) => {
            sound.muted = !sound.muted;
            state.muted = sound.muted;
        },
        togglePerspective: (state) => {
            state.perspective = !state.perspective;
        }
    }
});

export default uiSlice.reducer;
export const { changeMode, toggleSound, togglePerspective } = uiSlice.actions;