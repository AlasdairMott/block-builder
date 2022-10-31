import { useDispatch } from "react-redux";
import { ActionCreators } from 'redux-undo';
import "../App.css";
import { ActiveTool } from "../store/ui";
import styles from "./Toolbar.module.css";
import ToolbarToolButton, { ToolbarCommandButton } from "./ToolbarButton";
import { togglePerspective } from "../store/ui";

export enum Command {
    ZoomExtents,
    New,
    Undo,
    Redo,
    TogglePerspective
}

type undoRedoProps = { canUndo?: boolean, canRedo?: boolean, onUndo?: boolean, onRedo?: boolean }

const  Toolbar: React.FC<{ onZoomExtents: () => void, onNewFile: () => void, onTogglePerspective: () => void } & undoRedoProps> = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className={`${styles.toolbar} glass`}>
                <ToolbarToolButton mode={ActiveTool.Add} />
                <ToolbarToolButton mode={ActiveTool.Subtract} />
                <ToolbarCommandButton command={Command.ZoomExtents} onClick={props.onZoomExtents} />
                <ToolbarCommandButton command={Command.TogglePerspective} onClick={props.onTogglePerspective} />
                <ToolbarCommandButton command={Command.New} onClick={props.onNewFile} />
                <ToolbarCommandButton command={Command.Undo} onClick={() => dispatch(ActionCreators.undo())} />
                <ToolbarCommandButton command={Command.Redo} onClick={() => dispatch(ActionCreators.redo())} />
            </div>
        </>
    );
};

export default Toolbar;