import { useAppSelector } from '../store/hooks';
import { CellProps } from '../store/types';
import { ActiveTool } from '../store/ui';
import { Cell } from "./Cell";
import Floor from './Floor';

const Grid = () => {
    const grid = useAppSelector(state => state.grid.present);
    const mode = useAppSelector(state => state.ui.mode);

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
            {mode === ActiveTool.Add && <Floor size={grid.size} />}
        </>
    );
}

export default Grid;