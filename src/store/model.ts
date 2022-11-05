import { createSlice } from "@reduxjs/toolkit";
import { ModelProps } from "./types";

export const MODELS = [
    "1x1_Arch",
    "1x1_Cylinder",
    "1x1_HalfArch",
    "1x1_Slope"
]

const COLOR = [
    "#FFB9B9",
    "#FFDDD2",
    "#FFACC7",
    "#FF8DC7",
    "#ed4b11",
    "#ff7b63",
    "#FBBEB7",
    "#FC9E5E",
    "#EACDD2",
    "#D41B00"
]

export function GetRandomModel(): ModelProps {
    return {
        name: MODELS[Math.floor(Math.random() * MODELS.length)],
        rotation: Math.PI * 0.5 * Math.floor(Math.random() * 4),
        color: GetRandomColor(),
    }
}

export function GetRandomColor(): string { return COLOR[Math.floor(Math.random() * COLOR.length)]; }

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
            state.model.name = MODELS[(MODELS.indexOf(state.model.name) + 1) % MODELS.length];
        },
        nextColor: (state) => {
            state.model.color = COLOR[(COLOR.indexOf(state.model.color) + 1) % COLOR.length];
        },
        randomBlock: (state) => {
            state.model = GetRandomModel();
        }
    }
});

export const modelActions = modelSlice.actions;
export default modelSlice.reducer;