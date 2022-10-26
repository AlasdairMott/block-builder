import { ActiveTool } from "../store/ui";
import styles from "./Toolbar.module.css";
import "../App.css";
import ToolbarToolButton, { ToolbarCommandButton } from "./ToolbarButton";

export enum Command {
    ZoomExtents,
    New,
    Undo,
    Redo
}

const Toolbar: React.FC<{onZoomExtents: () => void, onNewFile: () => void}> = (props) => {
    return (
        <>
            <div className={`${styles.toolbar} glass`}>
                <ToolbarToolButton mode={ActiveTool.Add} />
                <ToolbarToolButton mode={ActiveTool.Subtract} />
                <ToolbarToolButton mode={ActiveTool.Select} />
                <ToolbarCommandButton command={Command.ZoomExtents} onClick={props.onZoomExtents}/>
                <ToolbarCommandButton command={Command.New} onClick={props.onNewFile}/>
            </div>
        </>
    );
};

export default Toolbar;