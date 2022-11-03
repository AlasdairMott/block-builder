export type ModelProps = {
    name: string;
    rotation: number;
    color: string;
}

export type CellProps = {
    blockId: string;
    position: [x: number, y: number, z: number],
    model: ModelProps | null;
}

export type cellMap = { [k: string]: CellProps };

export type gridState = {
    cells: cellMap;
    size: [number, number, number];
}