import { Cell, CellProps } from "./Cell";
import { useSelector, useDispatch } from 'react-redux';

export function Grid() {

    const dispatch = useDispatch();
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