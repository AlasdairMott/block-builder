import { CursorPointer, Minus, Plus } from 'iconoir-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ActiveTool, changeMode } from "../store/ui";
import styles from "./Toolbar.module.css";
import ToolbarButton from "./ToolbarButton";

const Toolbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.ui.mode)

    const addModeButtonHandler = () => {
        dispatch(changeMode({
            mode: ActiveTool.Add
        }));
    }

    const subtractModeButtonHandler = () => {
        //setActiveTool(ActiveTool.Subtract);
        dispatch(changeMode({
            mode: ActiveTool.Subtract
        }));
    }

    const selectModeButtonHandler = () => {
        //setActiveTool(ActiveTool.Select);
        dispatch(changeMode({
            mode: ActiveTool.Select
        }));
    }

    return (
        <>
            <div className={styles.toolbar}>
                <ToolbarButton title="Add" active={mode === ActiveTool.Add} disabled={false} onClick={addModeButtonHandler}>
                    <Plus color={mode === ActiveTool.Add ? "white" : "black"} strokeWidth={"2px"} height={18} width={22}/>
                </ToolbarButton>
                <ToolbarButton title="Subtract" active={mode === ActiveTool.Subtract} disabled={true} onClick={subtractModeButtonHandler}>
                    <Minus color={mode === ActiveTool.Subtract ? "white" : "black"} strokeWidth={"2px"} height={18} width={22}/>
                </ToolbarButton>
                <ToolbarButton title="Select" active={mode === ActiveTool.Select} disabled={true} onClick={selectModeButtonHandler}>
                    <CursorPointer color={mode === ActiveTool.Select ? "white" : "black"} strokeWidth={"2px"} height={18} width={22}/>
                </ToolbarButton>
            </div>
        </>
    );
};

export default Toolbar;