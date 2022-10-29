export type CellProps = {
    blockId: string;
    position: [x: number, y: number, z: number],
    active: boolean;
    model: ModelProps | null;
}

export type ModelProps = {
    name: string;
    rotation: number;
    color: string;
}

export { };
