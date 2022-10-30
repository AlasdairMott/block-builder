import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SoundHigh, SoundOff } from "iconoir-react";
import { useCallback, useEffect, useRef } from "react";
import { ActionCreators } from 'redux-undo';
import { OrbitControls as Orbit } from 'three-stdlib';
import { Grid } from '../Grid/Grid';
import { getGridCentroid, gridActions, sound } from "../store/grid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { modelActions } from "../store/model";
import { ActiveTool, changeMode, toggleSound } from '../store/ui';
import RoundButton from "../UI/RoundButton";
import Toolbar from '../UI/Toolbar';

const Viewport3d = () => {
    const dispatch = useAppDispatch();
    const orbitControls = useRef<Orbit>(null);
    const grid = useAppSelector(state => state.grid.present);

    const muted = useAppSelector(state => state.ui.muted);

    const zoomExtents = useCallback(() => {
        const centroid = getGridCentroid(grid.cells);
        orbitControls.current?.target.set(centroid.x, centroid.y, centroid.z);
    }, [grid]);

    const handleKeyPress = useCallback((event: any) => {
        switch (event.key) {
            case 'a': dispatch(changeMode({ mode: ActiveTool.Add })); break;
            case 'e':
            case 's': dispatch(changeMode({ mode: ActiveTool.Subtract })); break;
            case 'f': zoomExtents(); break;
            case "n": dispatch(gridActions.newFile()); break;
            case 'z':
            case 'Z':
                if (event.metaKey || event.ctrlKey) {
                    if (event.shiftKey) {
                        dispatch(ActionCreators.redo());
                    } else {
                        dispatch(ActionCreators.undo());
                    }
                } break;
            case 'ArrowLeft': dispatch(modelActions.rotateBlock('left')); break;
            case 'ArrowRight': dispatch(modelActions.rotateBlock('right')); break;
            case 'ArrowUp': dispatch(modelActions.nextBlock()); break;
            case 'ArrowDown': dispatch(modelActions.nextColor()); break;
        }
    }, [zoomExtents, dispatch]);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const handleNewFile = () => {
        dispatch(gridActions.newFile());
    };

    return (
        <>
            <Canvas camera={{ position: [10, 10, 10] }} shadows={true} onKeyDown={handleKeyPress}>
                <color attach="background" args={[0.9, 0.9, 0.9]} />
                <OrbitControls target={[0, 0, 0]} ref={orbitControls} />
                <ambientLight intensity={0.2} />
                <directionalLight
                    position={[100, 200, 100]}
                    castShadow={true}
                    shadow-camera-right={10}
                    shadow-camera-left={-10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10} intensity={0.8} />
                <Grid />
                <Plane receiveShadow={true} scale={100} rotation-x={-Math.PI * 0.5} position-y={-0.5}>
                    <shadowMaterial opacity={0.1} />
                </Plane>
            </Canvas>
            <Toolbar onZoomExtents={zoomExtents} onNewFile={handleNewFile}></Toolbar>
            <RoundButton onClick={() => dispatch(toggleSound())}>
                {muted ? <SoundOff strokeWidth={"2px"}></SoundOff> : <SoundHigh strokeWidth={"2px"}></SoundHigh>}
            </RoundButton>
        </>
    );
};

export default Viewport3d;