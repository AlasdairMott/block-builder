import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements, ThreeEvent, Vector3 } from '@react-three/fiber'
import { Model } from './Model';
import { gridActions } from '../store/grid';
import { useSelector, useDispatch } from 'react-redux';
import { Plane } from "@react-three/drei";

function randomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random())
}

export default function Face(props: any) {
    return (
        <Plane {...props} scale={0.5}>
            <meshBasicMaterial attach="material" color={randomColor()} />
        </Plane>
    )
};