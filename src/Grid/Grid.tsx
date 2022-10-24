import { useSelector } from 'react-redux';
import { Cell, CellProps } from "./Cell";

export function Grid() {

    const grid = useSelector((state: any) => state.grid);

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