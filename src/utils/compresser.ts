import { GetRandomColor, MODELS } from '../store/model';
import { CellProps, gridState, ModelProps } from './../store/types';
import LZString from 'lz-string';

function encode(model: ModelProps): string {
    const modelIndex = MODELS.indexOf(model.name);
    const rotationIndex = Math.round(model.rotation / (Math.PI * 0.5));

    if (rotationIndex < 0 || rotationIndex > 3) {
        console.log('rotation', model.rotation)
        throw new Error(`Rotation index is not valid: ${rotationIndex}`);
    }

    const key = (modelIndex) * 4 + rotationIndex + 1;
    
    return key > 9 ? String.fromCharCode(key + 56) : key.toString();
}

function encodeGridState(gridState: gridState): string {

    //Loop through each cell
    //1. get index of model.
    //2. if the model is null, add a 0 to the string.
    //3. if the model is not null
    //3a. temp key is (model index + 1)*4 + rotation index
    //3b. if the number is > 9, use a letter instead. e.g a is 10, b is 11, etc.

    const [xSize, ySize, zSize] = gridState.size;
    let compressedString = "";

    for (let x = 0; x < xSize; x++) {
        for (let z = 0; z < zSize; z++) {
            for (let y = ySize - 1; y >= 0; y--) {
                const id = `${x}_${y}_${z}`;
                const cell = gridState.cells[id];
                
                compressedString += cell.model ? encode(cell.model) : "0";
            }
        }
    }

    return LZString.compressToEncodedURIComponent(compressedString);
}

function decode(char: string): ModelProps {
    let key = char.charCodeAt(0) > 65 ? char.charCodeAt(0) - 56 : parseInt(char);
    key--;
    const modelIndex = Math.floor(key / 4);
    const rotationIndex = key % 4;

    return {
        name: MODELS[modelIndex],
        rotation: rotationIndex * (Math.PI * 0.5),
        color: GetRandomColor()
    };
}

function decodeGridState(compressedString: string): gridState {

    let uncompressedString = LZString.decompressFromEncodedURIComponent(compressedString);

    const gridState: gridState = {
        cells: {},
        size: [9, 9, 9]
    };

    const [xSize, ySize, zSize] = gridState.size;

    for (let x = 0; x < xSize; x++) {
        for (let z = 0; z < zSize; z++) {
            for (let y = ySize - 1; y >= 0; y--) {
                const id = `${x}_${y}_${z}`;
                const cell: CellProps = {
                    blockId: id,
                    position: [x, y, z],
                    model: null,
                }

                const char = uncompressedString.charAt(0);
                uncompressedString = uncompressedString.substr(1);

                cell.model = char === "0" ? null : decode(char);

                gridState.cells[id] = cell;
            }
        }
    }

    return gridState;
}

export { encodeGridState, decodeGridState };
