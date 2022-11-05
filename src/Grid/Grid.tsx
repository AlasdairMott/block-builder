import { useAppSelector } from '../store/hooks';
import { CellProps } from '../store/types';
import { Cell } from "./Cell";
import Floor from './Floor';

const Grid = () => {
    const grid = useAppSelector(state => state.grid.present);

    return (
        <>
            {Object.values<CellProps>(grid.cells).map((cell: CellProps) => {
                return cell.model ? (
                    <Cell
                        {...cell}
                        key={cell.blockId}
                    />
                ) : null;;
            })}
            <Floor size={grid.size} />
        </>
    );
}

export default Grid;