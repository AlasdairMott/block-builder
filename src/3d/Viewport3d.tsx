import { OrbitControls as Orbit, OrthographicCamera, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { button, Leva, useControls } from 'leva';
import { useCallback, useEffect, useRef, useState } from "react";
import { ActionCreators } from 'redux-undo';
import { Camera } from "three";
import { OrbitControls } from 'three-stdlib';
import { Grid } from '../Grid/Grid';
import { getGridCentroid, gridActions } from "../store/grid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { modelActions } from "../store/model";
import { ActiveTool, changeMode, togglePerspective } from '../store/ui';
import { HelpAndSoundButtons, HelpModal } from "../UI/HelpAndSound";
import Toolbar from '../UI/Toolbar';
import { decodeGridState, encodeGridState } from "../utils/compresser";
import Serializer from "../utils/serialization";

const Viewport3d = () => {

    const grid = useAppSelector(state => state.grid.present);

    useControls("IO", {
        saveJson: button(() => {
            console.log('saveJson');
            Serializer.save(new Blob([JSON.stringify(grid, null, "\t")], { type: "application/json" }), "grid.json");
        }),
        readJson: button(() => {
            console.log('readJson');
            Serializer.readJson().then((json) => {
                dispatch(gridActions.readFile(json));
            });
        }),
        compress: button(() => {
            Serializer.save(new Blob([JSON.stringify(grid, null, "\t")], { type: "application/json" }), "before.json");
            const small = encodeGridState(grid);
            Serializer.save(new Blob([JSON.stringify(small, null, "\t")], { type: "application/json" }), "small.json");
            const large = decodeGridState(small);
            Serializer.save(new Blob([JSON.stringify(large, null, "\t")], { type: "application/json" }), "after.json");
        }),
    }, [grid]);

    let noiseSize = 10;
    let noiseThreshold = 0.5;
    useControls("modifiers", {
        addLayer: button(() => {
            console.log('addLayer');
            dispatch(gridActions.addLayer());
        }),
        subtractLayer: button(() => {
            console.log('subtractLayer');
            dispatch(gridActions.subtractLayer());
        }),
        addNoise3d: button(() => {
            console.log('addNoise3d');
            dispatch(gridActions.addNoise3d({ size: noiseSize, threshold: noiseThreshold }));
        }),
        addNoise2d: button(() => {
            console.log('addNoise2d');
            dispatch(gridActions.addNoise2d({ size: noiseSize, threshold: noiseThreshold }));
        }),
        noiseSize: {
            value: noiseSize,
            min: 0,
            onChange: (value) => {
                noiseSize = value;
            }
        },
        noiseThreshold: {
            value: noiseThreshold,
            min: 0,
            max: 1,
            onChange: (value) => {
                noiseThreshold = value;
            }
        },
    });

    const dispatch = useAppDispatch();

    const isPerspective = useAppSelector(state => state.ui.perspective);
    const [cameraLocation, setCameraLocation] = useState<[number, number, number]>([10, 10, 10]);
    const [cameraTarget, setCameraTarget] = useState<Vector3>(getGridCentroid(grid.cells));

    const [showHelp, setShowHelp] = useState(false);

    const perspectiveCamera = useRef<Camera>(null);
    const orthographicCamera = useRef<Camera>(null);
    const orbitControls = useRef<OrbitControls>(null);

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
            <Leva hidden={window.location.hash !== '#debug'} />
            <Canvas shadows={true} onKeyDown={handleKeyPress}>
                <color attach="background" args={[0.9, 0.9, 0.9]} />
                <Orbit target={cameraTarget} ref={orbitControls}/>
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

                <Grid orbitControls={orbitControls}/>
                <Plane receiveShadow={true} scale={100} rotation-x={-Math.PI * 0.5} position-y={-0.5}>
                    <shadowMaterial opacity={0.1} />
                </Plane>
            </Canvas>
            <Toolbar onZoomExtents={zoomExtents} onTogglePerspective={handleTogglePerspective} onNewFile={handleNewFile}></Toolbar>
            <HelpAndSoundButtons onShowHelp={() => setShowHelp(!showHelp)} />
            {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        </>
    );
};

export default Viewport3d;