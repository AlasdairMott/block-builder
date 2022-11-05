import styles from "./MobileSelector.module.css";
import "../App.css";
import Preview from "../3d/Preview";
import Model from "../Grid/Model";
import { Canvas, Vector3 } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Plane } from "@react-three/drei";
import { AddHexagon, CropRotateTr, Palette, SmartphoneDevice, Cancel, Camera } from "iconoir-react";
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
                    <color attach="background" args={[1, 1, 1]} />
                    <OrbitControls />
                    <ambientLight intensity={1.0} />
                    <Model {...nextModel} />
                </Canvas>
            </div>
            <div className={`${styles.previwButtons} glass`}>
                <ToolbarCommandButton onClick={() => { console.log(props.cam); dispatch(modelActions.nextBlock()) }} title={"next-shape"}><AddHexagon {...ICONPROPS} />
                </ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { dispatch(modelActions.rotateBlock('right')) }} title={"change-color"}><CropRotateTr {...ICONPROPS} />
                </ToolbarCommandButton>
                <ToolbarCommandButton onClick={() => { dispatch(modelActions.nextColor()) }} title={"rotate"}><Palette {...ICONPROPS} />
                </ToolbarCommandButton>
            </div>
            <div className={styles.close} onClick={props.onClose}><Cancel /></div>
        </div>
    );
};

export { MobileButton, MobileSelector };