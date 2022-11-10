import { EmptyPage, Home, PerspectiveView, Redo, ShareIos, Undo } from "iconoir-react";
import { useDispatch } from "react-redux";
import { ActionCreators } from 'redux-undo';
import { useState } from "react";
import "../App.css";
import { useAppSelector } from "../store/hooks";
import { ActiveTool, togglePlacedPreview } from "../store/ui";
import { encodeGridState } from "../utils/compresser";
import styles from "./Toolbar.module.css";
import ToolbarToolButton, { ICONPROPS, ToolbarCommandButton } from "./ToolbarButton";
import { ShareModal } from "./ShareModal";

export enum Command {
    ZoomExtents,
    New,
    Undo,
    Redo,
    TogglePerspective,
    Share
}

type undoRedoProps = { canUndo?: boolean, canRedo?: boolean, onUndo?: boolean, onRedo?: boolean }

const Toolbar: React.FC<{ onZoomExtents: () => void, onNewFile: () => void, onTogglePerspective: () => void } & undoRedoProps> = (props) => {
    const dispatch = useDispatch();
    const grid = useAppSelector(state => state.grid.present);
    const placedPreview = useAppSelector(state => state.ui.placedPreview);
    const [showShare, setShowShare] = useState(false);

    return (
        <div>
            <div className={`${styles.toolbar} glass`}>
                <ToolbarToolButton mode={ActiveTool.Add} />
                <ToolbarToolButton mode={ActiveTool.Subtract} />
                <ToolbarCommandButton onClick={props.onZoomExtents} title={Command[Command.ZoomExtents]}><Home {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={props.onTogglePerspective} title={Command[Command.TogglePerspective]} ><PerspectiveView {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={props.onNewFile} title={Command[Command.New]}><EmptyPage {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { placedPreview ? dispatch(togglePlacedPreview()) : dispatch(ActionCreators.undo()); }} title={Command[Command.Undo]}><Undo {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { placedPreview ? dispatch(togglePlacedPreview()) : dispatch(ActionCreators.redo()); }} title={Command[Command.Redo]}><Redo {...ICONPROPS} /></ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { setShowShare(!showShare); if (placedPreview) { dispatch(togglePlacedPreview()) }; }} title={Command[Command.Share]}><ShareIos {...ICONPROPS} /></ToolbarCommandButton>
            </div>
            {showShare ? <ShareModal onClose={() => setShowShare(!showShare)} /> : null}
        </div>
    );
};

export default Toolbar;
