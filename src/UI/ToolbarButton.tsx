import { EmptyPage, Erase, Home, Redo, Svg3DSelectSolid, Undo } from "iconoir-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActiveTool, changeMode } from "../store/ui";
import { Command } from "./Toolbar";
import styles from "./ToolbarButton.module.css";

export const ICONPROPS = {
    strokeWidth: "2px",
    color: "black"
}

const ToolbarToolButton = (props: { mode: ActiveTool; }) => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.ui.mode);

    const active = mode === props.mode;

    const handleClick = () => {
        dispatch(changeMode({ mode: props.mode }));
    }

    const iconProps = {
        ...ICONPROPS,
        color: active ? "white" : "black"
    }

    const style = active ? `${styles.toolbarButton} ${styles.toolbarButton__active}` : styles.toolbarButton;

    return (
        <button className={style} onClick={handleClick} title={ActiveTool[props.mode]}>
            {props.mode === ActiveTool.Add && <Svg3DSelectSolid {...iconProps} />}
            {props.mode === ActiveTool.Subtract && <Erase {...iconProps} />}
        </button>
    );
}

export const ToolbarCommandButton = (props: { command: Command; onClick: React.MouseEventHandler}) => {
    const style = `${styles.toolbarButton}`
    return (
        <button className={style} onClick={props.onClick} title={Command[props.command]}>
            {props.command === Command.ZoomExtents && <Home {...ICONPROPS}/>}
            {props.command === Command.New && <EmptyPage {...ICONPROPS}/>}
            {props.command === Command.Undo && <Undo {...ICONPROPS}/>}
            {props.command === Command.Redo && <Redo {...ICONPROPS}/>}
        </button>
    );
}

export default ToolbarToolButton;