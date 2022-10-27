import { Color } from '@react-three/fiber';
import { createSlice } from '@reduxjs/toolkit';
import { Vector3 } from 'three';
import { Direction } from '../Grid/Cell';

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

export type CellProps = {
    blockId: string;
    position: [x: number, y: number, z: number],
    active: boolean;
    model: ModelProps | null;
}

export type ModelProps = {
    name: string;
    rotation: number;
    color: string | Color;
}

type cellMap = { [k: string]: CellProps };

export type GridState = {
    cells: cellMap;
    nextModel: ModelProps;
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

function GetRandomModel(): ModelProps {
    return {
        name: MODELS[Math.floor(Math.random() * MODELS.length)],
        rotation: Math.PI * 0.5 * Math.floor(Math.random() * 4),
        color: COLOR[Math.floor(Math.random() * COLOR.length)]
    }
}

const initialState = {
    cells: createCellMap(),
    nextModel: GetRandomModel()
};

const gridSlice = createSlice({
    name: 'grid',
    initialState: initialState, //(initialState as any) as StateWithHistory<typeof initialState>,
    reducers: {
        newFile: (state) => {
            state.cells = createCellMap();
        },
        addBlock: (state, action) => {

            const position = action.payload.blockId.split('-').map(Number) as [x: number, y: number, z: number];

            switch (action.payload.faceId) {
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
                state.cells[neighbourId].model = state.nextModel;
            }

            state.nextModel = GetRandomModel();
        },
        subtractBlock: (state, action) => {
            const blockId = action.payload.blockId;
            if (state.cells[blockId] && state.cells[blockId].active) {
                state.cells[blockId].active = false;
            }
        },
        selectBlock: (state, action) => {
            const blockId = action.payload.blockId;
            state.nextModel = state.cells[blockId].model ?? GetRandomModel();
        }
    }
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;