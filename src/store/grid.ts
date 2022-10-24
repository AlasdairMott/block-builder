import { createSlice } from '@reduxjs/toolkit';
import { CellProps, Direction } from '../Grid/Cell';

type cellMap = { [k: string]: CellProps };

export type GridState = {
    cells: cellMap;
}

const cells: cellMap = {};

const [xSize, ySize, zSize] = [9, 9, 9];

for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
        for (let z = 0; z < zSize; z++) {
            const id = `${x}-${y}-${z}`;
            const position: [x: number, y: number, z: number] = [x, y, z];
            cells[id] = {
                blockId: id,
                position: position,
                locked: (y != 0),
                active: (x === Math.floor(xSize/2) && y === 0 && z === Math.floor(zSize/2)),
            };
        }
    }
}

const initialState: GridState = {
    cells: cells
}

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        addBlock: (state, action) => {
            
            const position = action.payload.blockId.split('-').map(Number) as [x: number, y: number, z: number];

            switch (action.payload.faceId){
                case (Direction.xPos): position[0] += 1; break;
                case (Direction.xNeg): position[0] -= 1; break;
                case (Direction.yPos): position[1] += 1; break;
                case (Direction.yNeg): position[1] -= 1; break;
                case (Direction.zPos): position[2] += 1; break;
                case (Direction.zNeg): position[2] -= 1; break;
            }

            const neighbourId = position.join('-');

            if (state.cells[neighbourId] && !state.cells[neighbourId].active) {
                state.cells[neighbourId].locked = false;
                state.cells[neighbourId].active = true;
            }
        }
    }
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;