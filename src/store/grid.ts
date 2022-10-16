import { BlockProps } from './../Grid/Block';
import { createSlice } from '@reduxjs/toolkit';

type GridState = {
    blocks: BlockProps[];
    selectedBlock: string;
}

const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        

    },
    reducers: {
        // add a block to the grid
        addBlock: (state, action) => {
            const block = action.payload;
            
        }
    }
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;