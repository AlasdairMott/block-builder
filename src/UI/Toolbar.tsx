import { ActiveTool } from "../store/ui";
import styles from "./Toolbar.module.css";
import ToolbarToolButton, { ToolbarCommandButton } from "./ToolbarButton";

export enum Command {
    ZoomExtents,
    Undo,
    Redo
}

const Toolbar: React.FC = () => {
    return (
        <>
            <div className={styles.toolbar}>
                <ToolbarToolButton mode={ActiveTool.Add} />
                <ToolbarToolButton mode={ActiveTool.Subtract} />
                <ToolbarToolButton mode={ActiveTool.Select} />
                <ToolbarCommandButton command={Command.ZoomExtents} />
            </div>
        </>
    );
};

export default Toolbar;