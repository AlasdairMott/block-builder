import { clearAllListeners, createSlice } from '@reduxjs/toolkit';
import { Vector3 } from 'three';
import { addLayer, subtractLayer } from '../functions/addLayer';
import { perlinEffector } from '../functions/perlinEffector';
import { Direction } from '../Grid/Cell';
import { compress } from '../utils/compresser';
import { GetRandomModel } from './model';
import { cellMap } from './types';

export function getGridCentroid(cells: cellMap): Vector3 {
    let min: Vector3 = new Vector3(Infinity, Infinity, Infinity);
    let max: Vector3 = new Vector3(-Infinity, -Infinity, -Infinity);

    //find the min x, y, z and max x, y, z
    for (const cell of Object.values(cells)) {
        if (cell.model !== null) {
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

export function createCellMap(xSize: number, ySize: number, zSize: number): cellMap {
    const cells: cellMap = {};

    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            for (let z = 0; z < zSize; z++) {
                const id = `${x}_${y}_${z}`;
                const position: [x: number, y: number, z: number] = [x, y, z];
                const active = (x === Math.floor(xSize / 2) && y === 0 && z === Math.floor(zSize / 2));
                cells[id] = {
                    blockId: id,
                    position: position,
                    model: active ? GetRandomModel() : null
                };
            }
        }
    }

    return cells;
}

export function getNeighbourId(cellId: string, direction: Direction): string {
    const [x, y, z] = cellId.split('_').map(x => parseInt(x));
    switch (direction) {
        case Direction.xPos: return `${x + 1}_${y}_${z}`;
        case Direction.xNeg: return `${x - 1}_${y}_${z}`;
        case Direction.yPos: return `${x}_${y + 1}_${z}`;
        case Direction.yNeg: return `${x}_${y - 1}_${z}`;
        case Direction.zPos: return `${x}_${y}_${z + 1}`;
        case Direction.zNeg: return `${x}_${y}_${z - 1}`;
    }
}

export const sound = new Audio('/sounds/place.wav');

const size: [number, number, number] = [9, 9, 9];

const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        cells: createCellMap(...size),
        size: size
    },
    reducers: {
        readFile: (state, action) => {
            const { cells, size } = action.payload;
            state.cells = cells;
            state.size = size;
        },
        newFile: (state) => {
            state.cells = createCellMap(...size);
        },
        addBlock: (state, action) => {
            const neighbourId = getNeighbourId(action.payload.blockId, action.payload.faceId);

            if (state.cells[neighbourId] && !state.cells[neighbourId].model) {
                // window.history.replaceState(null, '', compress({cells: state.cells, size: state.size}));

                state.cells[neighbourId].model = action.payload.model;

                sound.play();
            }
        },
        subtractBlock: (state, action) => {
            const blockId = action.payload.blockId;
            if (state.cells[blockId] && state.cells[blockId].model) {
                state.cells[blockId].model = null;
            }
        },
        addLayer: (state) => {
            state.cells = addLayer(state);
        },
        subtractLayer: (state) => {
            state.cells = subtractLayer(state);
        },
        addNoise3d: (state, action) => {
            state.cells = new perlinEffector().addNoise3d(state, action.payload.size, action.payload.threshold);
        },
        addNoise2d: (state, action) => {
            state.cells = new perlinEffector().addNoise2d(state, action.payload.size, action.payload.threshold);
        }
    }
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;