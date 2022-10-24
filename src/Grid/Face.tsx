import { Plane } from "@react-three/drei";
import { ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gridActions } from '../store/grid';


export default function Face(props: any) {
    const dispatch = useDispatch();

    const [hovered, setHover] = useState(false);

    const enterHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(true);
        e.stopPropagation();
    };

    const leaveHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(false);
        e.stopPropagation();
    };

    const clickHandler = (e: ThreeEvent<PointerEvent>) => {
        dispatch(gridActions.addBlock({
            faceId: props.faceId,
            blockId: props.blockId
        }));

        e.stopPropagation();
    };

    return (
        <Plane {...props} onPointerEnter={enterHandler} onPointerLeave={leaveHandler} onClick={clickHandler} visible={hovered}>
            <meshStandardMaterial attach="material" color={'yellow'} transparent={true} opacity={0.5} />
        </Plane>
    )
};