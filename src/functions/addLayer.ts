import { GetRandomModel } from '../store/model';
import { cellMap, gridState } from './../store/types';

/**
 * Working from the top down, find the first active cell and add a cell above it.
 * @param gridState the grid state to modify.
 * @returns cellMap with new cells added.
 */
function addLayer(gridState: gridState): cellMap {

    return modifyCellMap(gridState, (cellMap: cellMap, x: number, y: number, z: number): boolean => {
        const id = `${x}-${y}-${z}`;
        const cell = gridState.cells[id];

        let idNext: string;

        if (cell.model) {
            idNext = `${x}-${y + 1}-${z}`;
        } else if (y === 0) {
            idNext = `${x}-${y}-${z}`;
        } else {
            return false;
        }

        if (gridState.cells[idNext]) {
            gridState.cells[idNext].model = GetRandomModel();
        }

        return true;
    });
}

/**
 * Working from the top down, find the first active cell and remove it.
 * @param gridState the grid state to modify.
 * @returns cellMap with new cells added.
 */
function subtractLayer(gridState: gridState): cellMap {
    return modifyCellMap(gridState, (cellMap: cellMap, x: number, y: number, z: number): boolean => {
        const id = `${x}-${y}-${z}`;
        const cell = gridState.cells[id];

        if (cell.model) {
            cell.model = null;
            return true;
        }

        return false;
    });
}

function modifyCellMap(gridState: gridState, method: (cellMap: cellMap, x: number, y: number, z: number) => boolean): cellMap {
    const [xSize, ySize, zSize] = gridState.size;

    for (let x = 0; x < xSize; x++) {
        for (let z = 0; z < zSize; z++) {
            for (let y = ySize - 1; y >= 0; y--) {
                if (method(gridState.cells, x, y, z)) { break; };
            }
        }
    }

    return gridState.cells;
}

export { addLayer, subtractLayer };
