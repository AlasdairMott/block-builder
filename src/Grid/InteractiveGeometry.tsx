import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements } from '@react-three/fiber'

type InteractiveProps = ThreeElements['mesh'] & {
    geo: JSX.Element;
    color?: string | THREE.Color;
}

export function InteractiveGeometry(props: InteractiveProps) {

    const ref = useRef<THREE.Mesh>(null!)

    const [active, setActive] = useState(false)
    const [hovered, setHover] = useState(false)

    const clickHandler = (e: any) => {
        setActive(!active);
    }

    const pointerOverHandler = () => {
        setHover(true);
    }

    const pointerOutHandler = () => {
        setHover(false);
    }
    const color = hovered ? 'hotpink' : (props.color ? props.color : 'orange');

    let vector = new THREE.Vector3(0,0,0);
    vector.copy(props.position as THREE.Vector3);
    if (active) {
        vector.y += 1;
    }
    // const up = (props.position ? (props.position as THREE.Vector3).copy() : new THREE.Vector3(0,0,0));
    // if (active){
    //     up.y += 1.0;
    // }

    // console.log(up)

    return (
        <mesh
            {...props}
            position={vector}
            ref={ref}
            onClick={clickHandler}
            onPointerOver={pointerOverHandler}
            onPointerOut={pointerOutHandler}>
                {props.geo}
                <meshStandardMaterial attach="material" color={color}/>
        </mesh>
    );
};