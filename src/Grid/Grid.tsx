import { RefObject } from 'react';
import { OrbitControls } from 'three-stdlib';
import { useAppSelector } from '../store/hooks';
import { CellProps } from '../store/types';
import { ActiveTool } from '../store/ui';
import { Cell } from "./Cell";
import Floor from './Floor';

export const Grid = (props: {orbitControls: RefObject<OrbitControls> }) => {
    const grid = useAppSelector(state => state.grid.present);
    const mode = useAppSelector(state => state.ui.mode);

    return (
        <>
            {Object.values<CellProps>(grid.cells).map((cell: CellProps) => {
                return cell.model ? (
                    <Cell
                        {...cell}
                        key={cell.blockId}
                        orbitControls={props.orbitControls}
                    />
                ) : null;;
            })}
            {mode === ActiveTool.Add && <Floor size={grid.size} orbitControls={props.orbitControls} />}
        </>
    );
}

export default Grid;