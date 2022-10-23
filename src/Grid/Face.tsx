import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements, ThreeEvent, useFrame, Vector3 } from '@react-three/fiber'
import { Model } from './Model';
import { gridActions } from '../store/grid';
import { useSelector, useDispatch } from 'react-redux';
import { Plane } from "@react-three/drei";

function randomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random())
}

export default function Face(props: any) {

    const [color, setColor] = useState(randomColor());

    // useFrame((state) => {

    //     //const intersections = state.raycaster.intersectObjects(state.scene.children, true);
    // });

    const raycastHandler = (e: any) => {
    }

    const enterHandler = (e: ThreeEvent<PointerEvent>) => {
        // if (e.eventObject === e.object){

        // }
        setColor(randomColor());
    };

    return (
        <Plane {...props} scale={0.5} onPointerEnter={enterHandler}>
            <meshBasicMaterial attach="material" color={color} />
        </Plane>
    )
};