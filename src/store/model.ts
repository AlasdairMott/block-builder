import { createSlice } from "@reduxjs/toolkit";
import { ModelProps } from "./types";

const MODELS = [
    "1x1_Arch",
    "1x1_Cylinder",
    "1x1_HalfArch",
    "1x1_Slope"
]

const COLOR = [
    "rgb(255,0,0)",
    "rgb(255,190,20)",
    "rgb(0,0,255)",
    "rgb(255,255,255)"
]

export function GetRandomModel(): ModelProps {
    return {
        name: MODELS[Math.floor(Math.random() * MODELS.length)],
        rotation: Math.PI * 0.5 * Math.floor(Math.random() * 4),
        color: COLOR[Math.floor(Math.random() * COLOR.length)]
    }
}

const modelSlice = createSlice({
    name: 'model',
    initialState: {
        model: GetRandomModel(),
    },
    reducers: {
        selectBlock: (state, action) => {
            state.model = action.payload.model ?? GetRandomModel();
        },
        rotateBlock: (state, action) => {
            switch (action.payload) {
                case 'left': state.model.rotation -= Math.PI * 0.5; break;
                case 'right': state.model.rotation += Math.PI * 0.5; break;
            }
        },
        nextBlock: (state) => {
            state.model = GetRandomModel();
        },
        nextColor: (state) => {
            state.model.color = COLOR[Math.floor(Math.random() * COLOR.length)];
        }
    }
});

export const modelActions = modelSlice.actions;
export default modelSlice.reducer;