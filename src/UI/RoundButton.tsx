import styles from "./RoundButton.module.css";
import "../App.css";

const RoundButton = (props: any) => {
    return (
        <button className={`glass ${styles.roundButton}`} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default RoundButton;