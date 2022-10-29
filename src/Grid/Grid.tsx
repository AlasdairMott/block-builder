import { useAppSelector } from '../store/hooks';
import { CellProps } from '../store/types';
import { Cell } from "./Cell";

export function Grid() {
    const grid = useAppSelector(state => state.grid.present);

    return (
        <>
            {Object.values<CellProps>(grid.cells).map((cell: CellProps) => {
                return (
                    <Cell
                        {...cell}
                        key={cell.blockId}
                    />
                );
            })}
        </>
    );
}