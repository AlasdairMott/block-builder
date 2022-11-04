import { Cancel, EmptyPage, Erase, Home, PerspectiveView, QuestionMark, Redo, SoundHigh, SoundOff, Svg3DSelectSolid, Undo } from "iconoir-react";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSound } from "../store/ui";
import RoundButton from "../UI/RoundButton";
import { ICONPROPS } from "../UI/ToolbarButton";
import styles from "./HelpAndSound.module.css";

const HelpAndSoundButtons = (props: { onShowHelp: () => void }) => {
    const muted = useAppSelector(state => state.ui.muted);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.helpAndSound}>
            <RoundButton onClick={() => dispatch(toggleSound())}>
                {muted ? <SoundOff {...ICONPROPS} /> : <SoundHigh {...ICONPROPS} />}
            </RoundButton>
            <RoundButton onClick={props.onShowHelp}>
                <QuestionMark {...{ ...ICONPROPS, strokeWidth: "2.5px" }} />
            </RoundButton>
        </div>
    );
}

const HelpModal = (props: { onClose: () => void }) => {

    const handleKeyPress = useCallback((event: any) => {
        if (event.key === 'Escape') {
            props.onClose();
        }
    }, [props]);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div className={styles.helpModal} onClick={props.onClose}>
            <div className={styles.helpModal__content}>
                <table>
                    <tbody>
                        <tr>
                            <td><Svg3DSelectSolid {...ICONPROPS} /></td>
                            <td>Add (A)</td>
                        </tr>
                        <tr>
                            <td><Erase {...ICONPROPS} /></td>
                            <td>Subtract (S)</td>
                        </tr>
                        <tr>
                            <td><Home {...ICONPROPS} /></td>
                            <td>Recenter view (F)</td>
                        </tr>
                        <tr>
                            <td><PerspectiveView {...ICONPROPS} /></td>
                            <td>Toggle Perspective</td>
                        </tr>
                        <tr>
                            <td><EmptyPage {...ICONPROPS} /></td>
                            <td>New File (N)</td>
                        </tr>
                        <tr>
                            <td><Undo {...ICONPROPS} /></td>
                            <td>Undo</td>
                        </tr>
                        <tr>
                            <td><Redo {...ICONPROPS} /></td>
                            <td>Redo</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <p>Left and right arrow keys rotate the block.</p>
                <p>Up arrow changes the block.</p>
                <p>Down arrow changes the block colour.</p>
                <button className={styles.helpModalButton} onClick={props.onClose} title={"Close"}>
                    <Cancel {...ICONPROPS} />
                </button>
            </div>
        </div>
    );
}

export { HelpAndSoundButtons, HelpModal };
