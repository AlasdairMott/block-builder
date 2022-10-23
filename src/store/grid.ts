import { Vector3 } from 'three';
import { createSlice } from '@reduxjs/toolkit';
import { CellProps } from '../Grid/Cell';

export type HoverPayload = {
    id: string;
    distance: number;
}

type cellMap = { [k: string]: CellProps };

export type GridState = {
    cells: cellMap;
    selectedBlock: HoverPayload
    mouseOvers: HoverPayload[];
}

const cells: cellMap = {};
// c['0,0,0'] = [1,2,3];

const [xSize, ySize, zSize] = [5, 5, 5];
// const cells = new Map<string, CellProps>();
// for (let x = 0; x < xSize; x++) {
//     for (let y = 0; y < ySize; y++) {
//         for (let z = 0; z < zSize; z++) {
//             const id = `${x}-${y}-${z}`;
//             const position: [x: number, y: number, z: number] = [x, y, z];
//             cells.set(id, {
//                 blockId: id,
//                 position: position,
//                 locked: (y != 0),
//                 active: false,
//             });
//         }
//     }
// }

for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
        for (let z = 0; z < zSize; z++) {
            const id = `${x}-${y}-${z}`;
            const position: [x: number, y: number, z: number] = [x, y, z];
            cells[id] = {
                blockId: id,
                position: position,
                locked: (y != 0),
                active: false,
            };
        }
    }
}

const initialState: GridState = {
    cells: cells,
    selectedBlock: {
        id: '',
        distance: Infinity
    },
    mouseOvers: []
}

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        addBlock: (state, action) => {
            const position = action.payload.position as [x: number, y: number, z: number];
            
            const neighbours = {
                up: `${position[0]}-${position[1] + 1}-${position[2]}`,
                down: `${position[0]}-${position[1] - 1}-${position[2]}`,
                left: `${position[0] - 1}-${position[1]}-${position[2]}`,
                right: `${position[0] + 1}-${position[1]}-${position[2]}`,
                front: `${position[0]}-${position[1]}-${position[2] + 1}`,
                back: `${position[0]}-${position[1]}-${position[2] - 1}`,
            };

            for (const neighbour of Object.values(neighbours)) {
                if (state.cells[neighbour] && !state.cells[neighbour].active) {
                    console.log('adding block for neighbour', neighbour);
                    state.cells[neighbour].locked = false;
                    state.cells[neighbour].active = true;
                }
            }
        },
        hoverEnter: (state, action) => {
            state.mouseOvers.push(action.payload);
            if (action.payload.distance < state.selectedBlock.distance) {
                state.selectedBlock = action.payload;
            }
        },
        hoverExit: (state, action) => {
            // remove the block from the mouseOvers array
            state.mouseOvers = state.mouseOvers.filter(block => block.id !== action.payload.id);

            // are there any blocks left in the mouseOvers array?
            if (state.mouseOvers.length > 0) {
                state.selectedBlock = state.mouseOvers.reduce((prev, current) => (prev.distance < current.distance) ? prev : current);

            }

            // the selected block is the one with the smallest distance
        },
    }
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;