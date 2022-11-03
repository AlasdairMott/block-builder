import { GetRandomModel } from '../store/model';
import { cellMap } from './../store/types';

function addLayer(cellMap: cellMap, dimensions: [number, number, number]): cellMap {

    const [xSize, ySize, zSize] = dimensions;

    // working from the top down, find the first active cell
    // and add a cell above it

    for (let x = 0; x < xSize; x++) {
        for (let z = 0; z < zSize; z++) {
            for (let y = ySize - 1; y >= 0; y--) {
                const id = `${x}-${y}-${z}`;
                const cell = cellMap[id];

                let idNext: string;

                if (cell.active) {
                    idNext = `${x}-${y + 1}-${z}`;

                } else if (y === 0) {
                    idNext = `${x}-${y}-${z}`;
                } else {
                    continue;
                }

                if (cellMap[idNext]) {
                    cellMap[idNext].active = true;
                    cellMap[idNext].model = GetRandomModel();
                }

                break;
            }
        }
    }

    return cellMap;
}

export default addLayer;