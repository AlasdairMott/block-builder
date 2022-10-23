import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements, ThreeEvent, Vector3 } from '@react-three/fiber'
import { Model } from './Model';
import { gridActions } from '../store/grid';
import { useSelector, useDispatch } from 'react-redux';
import { Plane } from "@react-three/drei";

function randomColor () {
  return new THREE.Color(Math.random(), Math.random(), Math.random())
}

export default function Face(props: any) {
    const [id, setId] = useState(Math.random().toString());

    const faceIsHovered = props.hoveredFace?.id === id;
    const color = faceIsHovered ? '#FFFF00' : 'red';

    const PointerEnterHandler = (e: ThreeEvent<PointerEvent>) => {
        props.onPointerEnterFace({
            id: id,
            distance: e.distance
        });
    };

    return (
        <Plane {...props} onPointerEnter={PointerEnterHandler}>
            <meshBasicMaterial attach="material" color={color} />
        </Plane>
    )
};