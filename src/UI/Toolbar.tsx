import { EmptyPage, Home, PerspectiveView, Redo, Undo } from "iconoir-react";
import { useDispatch } from "react-redux";
import { ActionCreators } from 'redux-undo';
import "../App.css";
import { ActiveTool } from "../store/ui";
import styles from "./Toolbar.module.css";
import ToolbarToolButton, { ICONPROPS, ToolbarCommandButton } from "./ToolbarButton";

export enum Command {
    ZoomExtents,
    New,
    Undo,
    Redo,
    TogglePerspective
}

type undoRedoProps = { canUndo?: boolean, canRedo?: boolean, onUndo?: boolean, onRedo?: boolean }

const Toolbar: React.FC<{ onZoomExtents: () => void, onNewFile: () => void, onTogglePerspective: () => void } & undoRedoProps> = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className={`${styles.toolbar} glass`}>
                <ToolbarToolButton mode={ActiveTool.Add} />
                <ToolbarToolButton mode={ActiveTool.Subtract} />

                <ToolbarCommandButton onClick={props.onZoomExtents} title={Command[Command.ZoomExtents]}><Home {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={props.onTogglePerspective} title={Command[Command.TogglePerspective]} ><PerspectiveView {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={props.onNewFile} title={Command[Command.New]}><EmptyPage {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => dispatch(ActionCreators.undo())} title={Command[Command.Undo]}><Undo {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => dispatch(ActionCreators.redo())} title={Command[Command.Redo]}><Redo {...ICONPROPS} /></ToolbarCommandButton>
            </div>
        </>
    );
};

export default Toolbar;
