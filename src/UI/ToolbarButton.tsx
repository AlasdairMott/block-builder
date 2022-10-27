import { CursorPointer, EmptyPage, Erase, Home, Svg3DSelectSolid } from "iconoir-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActiveTool, changeMode } from "../store/ui";
import { Command } from "./Toolbar";
import styles from "./ToolbarButton.module.css";

const ICONPROPS = {
    strokeWidth: "2px",
    height: 18,
    width: 22
}

const ToolbarToolButton = (props: { mode: ActiveTool; }) => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.ui.mode);

    const active = mode === props.mode;

    const handleClick = () => {
        dispatch(changeMode({ mode: props.mode }));
    }

    const iconProps = {
        color: active ? "white" : "black",
        ...ICONPROPS
    }

    const style = active ? `${styles.toolbarButton} ${styles.toolbarButton__active}` : styles.toolbarButton;

    return (
        <button className={style} onClick={handleClick} title={ActiveTool[props.mode]}>
            {props.mode === ActiveTool.Add && <Svg3DSelectSolid {...iconProps} />}
            {props.mode === ActiveTool.Subtract && <Erase {...iconProps} />}
            {props.mode === ActiveTool.Select && <CursorPointer {...iconProps} />}
        </button>
    );
}

export const ToolbarCommandButton = (props: { command: Command; onClick: React.MouseEventHandler}) => {
    const style = `${styles.toolbarButton}`
    return (
        <button className={style} onClick={props.onClick} title={Command[props.command]}>
            {props.command === Command.ZoomExtents && <Home {...ICONPROPS}/>}
            {props.command === Command.New && <EmptyPage {...ICONPROPS}/>}
        </button>
    );
}

export default ToolbarToolButton;