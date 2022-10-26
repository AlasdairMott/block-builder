import { createSlice } from '@reduxjs/toolkit';
import { Vector3 } from 'three';
import { CellProps, Direction } from '../Grid/Cell';

type cellMap = { [k: string]: CellProps };

export type GridState = {
    cells: cellMap;
}

export function getGridCentroid(cells: cellMap): Vector3 {
    let min: Vector3 = new Vector3(Infinity, Infinity, Infinity);
    let max: Vector3 = new Vector3(-Infinity, -Infinity, -Infinity);

    //find the min x, y, z and max x, y, z
    for (const cell of Object.values(cells)) {
        if (cell.active) {
            const { position } = cell;
    
            // could be simplified in an extension method for Vector3
            min.x = Math.min(min.x, position[0]);
            min.y = Math.min(min.y, position[1]);
            min.z = Math.min(min.z, position[2]);
    
            max.x = Math.max(max.x, position[0]);
            max.y = Math.max(max.y, position[1]);
            max.z = Math.max(max.z, position[2]);
        }
    }

    //find the center of the grid
    return new Vector3(
        (min.x + max.x) / 2,
        (min.y + max.y) / 2,
        (min.z + max.z) / 2
    );
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
                state.cells[neighbourId].active = true;
            }
        },
        subtractBlock: (state, action) => {
            const blockId = action.payload.blockId;
            if (state.cells[blockId] && state.cells[blockId].active) {
                state.cells[blockId].active = false;
            }
        }
    }
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;