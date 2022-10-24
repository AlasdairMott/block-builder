import { useAppSelector } from '../store/hooks';
import { Cell, CellProps } from "./Cell";

export function Grid() {
    const grid = useAppSelector(state => state.grid);

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