import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements, ThreeEvent, Vector3 } from '@react-three/fiber'
import { Block } from './Block';
import { Model } from './Model';


type InteractiveProps = ThreeElements['mesh'] & {
    geo: JSX.Element;
    color?: string | THREE.Color;
    locked: boolean;
    blockClicked: (e: {blockId: string; position: Vector3}) => void;
    blockId: string;
}

export function InteractiveGeometry(props: InteractiveProps) {

    const ref = useRef<THREE.Mesh>(null!)

    const [locked, setLocked] = useState(props.locked);
    const [active, setActive] = useState(false);
    const [hovered, setHover] = useState(false);

    const clickHandler = (e: ThreeEvent<MouseEvent>) => {
        setActive(!active);
        // props.blockClicked({
        //     blockId:props.blockId?.toString()!,
        //     position: props.position!
        // });
    }

    const pointerOverHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(true);
    }

    const pointerOutHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(false);
    }

    let color;
    if (locked) {
        color = '#D3D3D3'
    } else if (hovered) {
        color = 'yellow'
    } else if (active) {
        color = 'cyan'
    } else {
        color = props.color;
    };

    // const opacity = hovered ? 1.0 : 0.0;
    const opacity =0.6;
    return (
        <mesh
            {...props}
            visible={hovered || active}
            position={props.position}
            ref={ref}
            onClick={clickHandler}
            onPointerOver={pointerOverHandler}
            onPointerOut={pointerOutHandler}>
                {!locked && !active && props.geo}
                {/* {active && <Block id={props.blockId} position={p} rotation={0} />} */}
                {active && <Model/>}
                <meshStandardMaterial attach="material" color={color} transparent={true} opacity={opacity}/>
        </mesh>
    );
};