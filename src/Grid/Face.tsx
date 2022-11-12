import { Plane } from "@react-three/drei";
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Group } from "three";
import { getNeighbourId, gridActions } from '../store/grid';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { modelActions } from "../store/model";
import { setCurrentPreviewIds, togglePlacedPreview } from "../store/ui";
import { FaceProps } from "./Cell";
import Model from "./Model";


export default function Face(props: FaceProps & { blockId: string, scale: number }) {
    const dispatch = useAppDispatch();
    const model = useAppSelector(state => state.model.model);
    const mobileModeActive = useAppSelector(state => state.ui.mobileMode);
    const placedPreview = useAppSelector(state => state.ui.placedPreview);
    const previewBlockIds = useAppSelector(state => state.ui.previewBlockIds);
    const orbiting = useAppSelector(state => state.ui.orbiting);


    const hoverPreview = useRef<Group>(null!);

    const [hovered, setHover] = useState(false);

    const enterHandler = (e: ThreeEvent<PointerEvent>) => {
        if (orbiting) {
            setHover(false);
        }
        else {
            setHover(true);
        }

        e.stopPropagation();
    };

    const leaveHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(false);
        e.stopPropagation();
    };

    const clickHandler = (e: ThreeEvent<MouseEvent>) => {
        if (!mobileModeActive) {
            setHover(false);
            dispatch(gridActions.addBlock({
                faceId: props.faceId,
                blockId: props.blockId,
                model: model
            }));
            dispatch(modelActions.randomBlock());
            e.stopPropagation();
        }
        else {
            if (placedPreview) {
                setHover(false)
                if (props.faceId === previewBlockIds.faceId && props.blockId === previewBlockIds.blockId) {
                    setHover(true)
                }
            }
            else {
                setHover(true)
                dispatch(togglePlacedPreview())
                dispatch(setCurrentPreviewIds({
                    faceId: props.faceId,
                    blockId: props.blockId,
                    model: model
                }))
            }
            e.stopPropagation();
        }
    };

    useFrame(({ clock }) => {
        hoverPreview.current.position.y = props.position.y * 2 + Math.sin(clock.getElapsedTime() * 2) * 0.08
    })

    useEffect(() => {
        if (!placedPreview) {
            setHover(false)
        }
    }, [placedPreview]);

    // check if the block can be placed - is there an entry in the cells dictionary?
    const neighbourId = getNeighbourId(props.blockId, props.faceId);
    const canPlace = useAppSelector(state => state.grid.present.cells[neighbourId] !== undefined);

    return (
        <>
            {!mobileModeActive
                ? <Plane {...props} onPointerEnter={enterHandler} onPointerLeave={leaveHandler} onClick={clickHandler} visible={false} />
                : <Plane {...props} onClick={clickHandler} visible={false} />
            }
            <group position={props.position.clone().multiplyScalar(2)} scale={0.8} ref={hoverPreview}>
                {hovered && <Model {...model} wireframe={!canPlace} />}
                {hovered && mobileModeActive && placedPreview && <Model {...model} wireframe={!canPlace} />}
            </group>

        </>
    )
};