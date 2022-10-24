import styles from "./ToolbarButton.module.css";

export type ToolbarButtonProps = {
    title: string;
    active: boolean;
    disabled: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

const ToolbarButton = (props: ToolbarButtonProps) => {
    const style = props.active ? `${styles.toolbarButton} ${styles.toolbarButton__active}` : styles.toolbarButton;
    return (
        <button className={style} onClick={props.onClick} title={props.title}>
            {props.children}
        </button>
    );
}

export default ToolbarButton;