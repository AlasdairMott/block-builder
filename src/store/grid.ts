import { createSlice } from '@reduxjs/toolkit';
import { Vector3 } from 'three';
import { Direction } from '../Grid/Cell';
import { GetRandomModel } from './model';
import { CellProps } from './types';

type cellMap = { [k: string]: CellProps };

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

export function createCellMap(): cellMap {
    const cells: cellMap = {};
    const [xSize, ySize, zSize] = [9, 9, 9];
    
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            for (let z = 0; z < zSize; z++) {
                const id = `${x}-${y}-${z}`;
                const position: [x: number, y: number, z: number] = [x, y, z];
                const active = (x === Math.floor(xSize / 2) && y === 0 && z === Math.floor(zSize / 2));
                cells[id] = {
                    blockId: id,
                    position: position,
                    active: active,
                    model: active ? GetRandomModel() : null
                };
            }
        }
    }

    return cells;
}

export function getNeighbourId(cellId: string, direction: Direction): string {
    const [x, y, z] = cellId.split('-').map(x => parseInt(x));
    switch (direction) {
        case Direction.xPos: return `${x + 1}-${y}-${z}`;
        case Direction.xNeg: return `${x - 1}-${y}-${z}`;
        case Direction.yPos: return `${x}-${y + 1}-${z}`;
        case Direction.yNeg: return `${x}-${y - 1}-${z}`;
        case Direction.zPos: return `${x}-${y}-${z + 1}`;
        case Direction.zNeg: return `${x}-${y}-${z - 1}`;
    }
}

const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        cells: createCellMap(),
    }, //(initialState as any) as StateWithHistory<typeof initialState>,
    reducers: {
        newFile: (state) => {
            state.cells = createCellMap();
        },
        addBlock: (state, action) => {
            const neighbourId = getNeighbourId(action.payload.blockId, action.payload.faceId);

            if (state.cells[neighbourId] && !state.cells[neighbourId].active) {
                state.cells[neighbourId].active = true;
                state.cells[neighbourId].model = action.payload.model;

                // play sound
                const sound = new Audio('/sounds/place.wav');
                sound.play();
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