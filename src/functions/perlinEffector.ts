import { GetRandomModel } from '../store/model';
import { cellMap, gridState } from '../store/types';
import perlinNoise3d from 'perlin-noise-3d'

class perlinEffector {

    addNoise3d(gridState: gridState, scale: number, threshold: number): cellMap {    
        return this.modifyGrid(gridState, (cellMap: cellMap, noise: any, x: number, y: number, z: number) => {
            if (noise.get(x/scale, y/scale, z/scale) > threshold) {
                const id = `${x}_${y}_${z}`;
                const cell = gridState.cells[id];
                cell.model = GetRandomModel();
            }
        });
    }

    addNoise2d(gridState: gridState, scale: number, yScale: number): cellMap {
        return this.modifyGrid(gridState, (cellMap: cellMap, noise: any, x: number, y: number, z: number) => {
            if (noise.get(x/scale, 0, z/scale) > y * yScale) {
                const id = `${x}_${y}_${z}`;
                const cell = gridState.cells[id];
                cell.model = GetRandomModel();
            }
        });
    }

    modifyGrid(gridState: gridState, method: (cellMap: cellMap, noise: any, x: number, y: number, z: number) => void): cellMap {
        const [xSize, ySize, zSize] = gridState.size;
        const noise = new perlinNoise3d();
    
        for (let x = 0; x < xSize; x++) {
            for (let z = 0; z < zSize; z++) {
                for (let y = ySize - 1; y >= 0; y--) {
                    method(gridState.cells, noise, x, y, z);
                }
            }
        }
    
        return gridState.cells;
    }
}

export { perlinEffector }