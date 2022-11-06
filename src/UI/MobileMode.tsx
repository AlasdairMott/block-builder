import styles from "./MobileMode.module.css";
import "../App.css";
import Preview from "../3d/Preview";
import Model from "../Grid/Model";
import { Canvas, Vector3 } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Plane } from "@react-three/drei";
import { AddHexagon, RefreshDouble, Palette, SmartphoneDevice, Cancel, Camera } from "iconoir-react";
import ToolbarToolButton, { ICONPROPS, ToolbarCommandButton } from "./ToolbarButton";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { modelActions } from "../store/model";
import RoundButton from "./RoundButton";

const MobileButton = (props: { onActivate: () => void }) => {

    return (
        <div className={styles.mobileModeButton}>
            <RoundButton onClick={props.onActivate}>
                <SmartphoneDevice {...ICONPROPS} />
            </RoundButton>
        </div>
    )
}

const MobileSelector = (props: { onClose: () => void, cam: any }) => {
    const nextModel = useAppSelector(state => state.model.model);
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
            </div>
        </div>
    );
};

export { MobileButton, MobileSelector };