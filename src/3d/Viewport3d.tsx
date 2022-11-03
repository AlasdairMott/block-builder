import { OrbitControls, OrthographicCamera, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { SoundHigh, SoundOff } from "iconoir-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActionCreators } from 'redux-undo';
import { Camera } from "three";
import { Grid } from '../Grid/Grid';
import { getGridCentroid, gridActions } from "../store/grid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { modelActions } from "../store/model";
import { ActiveTool, changeMode, togglePerspective, toggleSound } from '../store/ui';
import RoundButton from "../UI/RoundButton";
import Toolbar from '../UI/Toolbar';
import { ICONPROPS } from "../UI/ToolbarButton";
import { button, Leva, useControls } from 'leva';

const Viewport3d = () => {

    const controls = useControls({
        addLayer: button(() => { 
            console.log('addLayer');
            dispatch(gridActions.addLayer());  
        }),
    });

    const dispatch = useAppDispatch();

    const grid = useAppSelector(state => state.grid.present);

    const muted = useAppSelector(state => state.ui.muted);
    const isPerspective = useAppSelector(state => state.ui.perspective);

    const [cameraLocation, setCameraLocation] = useState<[number, number, number]>([10, 10, 10]);
    const [cameraTarget, setCameraTarget] = useState<Vector3>(getGridCentroid(grid.cells));

    const perspectiveCamera = useRef<Camera>(null);
    const orthographicCamera = useRef<Camera>(null);

    const zoomExtents = useCallback(() => {

        const centroid = getGridCentroid(grid.cells);
        setCameraTarget(centroid);
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
    }, [handleKeyPress, zoomExtents]);

    const handleNewFile = () => {
        dispatch(gridActions.newFile());
    };

    const handleTogglePerspective = () => {
        dispatch(togglePerspective());
        setCameraLocation(isPerspective ? perspectiveCamera.current!.position.toArray() : orthographicCamera.current!.position.toArray());
    };

    return (
        <>
            <Leva hidden={window.location.hash !== '#debug'}/>
            <Canvas shadows={true} onKeyDown={handleKeyPress}>
                <color attach="background" args={[0.9, 0.9, 0.9]} />

                <OrbitControls target={cameraTarget} />
                <PerspectiveCamera makeDefault={isPerspective} position={cameraLocation} fov={75} ref={perspectiveCamera} />
                <OrthographicCamera makeDefault={!isPerspective} position={cameraLocation} zoom={75} ref={orthographicCamera} />

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
            <Toolbar onZoomExtents={zoomExtents} onTogglePerspective={handleTogglePerspective} onNewFile={handleNewFile}></Toolbar>
            <RoundButton onClick={() => dispatch(toggleSound())}>
                {muted ? <SoundOff {...ICONPROPS} /> : <SoundHigh {...ICONPROPS} />}
            </RoundButton>
        </>
    );
};

export default Viewport3d;