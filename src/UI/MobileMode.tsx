import { Canvas } from "@react-three/fiber";
import { AddHexagon, Check, Palette, RefreshDouble, SmartphoneDevice, Cancel } from "iconoir-react";
import { useDispatch } from "react-redux";
import "../App.css";
import Model from "../Grid/Model";
import { useAppSelector } from "../store/hooks";
import { modelActions } from "../store/model";
import styles from "./MobileMode.module.css";
import RoundButton from "./RoundButton";
import { ICONPROPS, ToolbarCommandButton } from "./ToolbarButton";
import { gridActions } from '../store/grid';
import { togglePlacedPreview } from "../store/ui";


const MobileButton = (props: { onActivate: () => void }) => {
    const dispatch = useDispatch();
    const placedPreview = useAppSelector(state => state.ui.placedPreview);
    return (
        <div className={styles.mobileModeButton} onClick={() => { if (placedPreview) { dispatch(togglePlacedPreview()) } }}>
            <RoundButton onClick={props.onActivate}>
                <SmartphoneDevice {...ICONPROPS} />
            </RoundButton>
        </div >
    )
}

const MobileSelector = (props: { onClose: () => void, cam: any }) => {
    const nextModel = useAppSelector(state => state.model.model);
    const placedPreview = useAppSelector(state => state.ui.placedPreview);
    const previewBlockIds = useAppSelector(state => state.ui.previewBlockIds);

    const dispatch = useDispatch();
    return (
        <div className={styles.mobileSelector}>
            <div className={styles.canvasContainer}>
                <Canvas shadows={true} camera={{ position: [1, 1, 1] }}>
                    <ambientLight intensity={1.0} />
                    <Model {...nextModel} />
                </Canvas>
            </div>
            <div className={`${styles.previewButtons} glass`}>
                <ToolbarCommandButton onClick={() => { dispatch(modelActions.nextBlock()) }} title={"next-shape"}><AddHexagon {...ICONPROPS} />
                </ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { dispatch(modelActions.rotateBlock('right')) }} title={"change-color"}><RefreshDouble {...ICONPROPS} />
                </ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { dispatch(modelActions.nextColor()) }} title={"rotate"}><Palette {...ICONPROPS} />
                </ToolbarCommandButton>
                {placedPreview
                    ?
                    <div className={styles.confirmPreview}>
                        <div onClick={() => {
                            dispatch(togglePlacedPreview());
                            dispatch(gridActions.addBlock({ faceId: previewBlockIds.faceId, blockId: previewBlockIds.blockId, model: nextModel }));
                            dispatch(modelActions.randomBlock());
                        }} title={""}>
                            <Check />
                        </div>
                        <div onClick={() => {
                            dispatch(togglePlacedPreview());
                        }} title={""}><Cancel />
                        </div>
                    </div>
                    : null
                }
            </div>

        </div>
    );
};

export { MobileButton, MobileSelector };
