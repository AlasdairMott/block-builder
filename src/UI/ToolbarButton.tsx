import { Erase, Svg3DSelectSolid } from "iconoir-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActiveTool, changeMode, togglePlacedPreview } from "../store/ui";
import styles from "./ToolbarButton.module.css";


export const ICONPROPS = {
    strokeWidth: "2px",
    color: "black"
}

const ToolbarToolButton = (props: { mode: ActiveTool; }) => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.ui.mode);
    const placedPreview = useAppSelector(state => state.ui.placedPreview);

    const active = mode === props.mode;

    const handleClick = () => {
        dispatch(changeMode({ mode: props.mode }));
        if (placedPreview) { dispatch(togglePlacedPreview()) };
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

export const ToolbarCommandButton = (props: { title: string; onClick: React.MouseEventHandler, children: React.ReactNode; }) => {
    const style = `${styles.toolbarButton}`
    return (
        <button className={style} onClick={props.onClick} title={props.title}>
            {props.children}
        </button>
    );
}

export default ToolbarToolButton;