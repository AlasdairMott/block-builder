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
    mobileMode: boolean,
    placedPreview: boolean,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mode: ActiveTool.Add,
        muted: false,
        perspective: false,
        mobileMode: false,
        placedPreview: false,
        previewBlockIds: {
            faceId: null,
            blockId: null,
            model: null
        },

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
        },
        toggleMobileMode: (state) => {
            state.mobileMode = !state.mobileMode;
        },
        togglePlacedPreview: (state) => {
            state.placedPreview = !state.placedPreview;
        },
        setCurrentPreviewIds: (state, action) => {
            state.previewBlockIds.faceId = action.payload.faceId
            state.previewBlockIds.blockId = action.payload.blockId
            state.previewBlockIds.model = action.payload.model
        },
    }
});

export default uiSlice.reducer;
export const { changeMode, toggleSound, togglePerspective, toggleMobileMode, togglePlacedPreview, setCurrentPreviewIds } = uiSlice.actions;