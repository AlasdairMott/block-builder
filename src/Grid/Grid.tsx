import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber'
import { Plane, Box } from "@react-three/drei";
import { InteractiveGeometry } from "./InteractiveGeometry";

export function Grid(props: any) {
    const [x, setX] = React.useState(10);
    const [z, setZ] = React.useState(10);

    return (
        <group>
            {/* <InteractiveGeometry geo={box} position={new THREE.Vector3(0,1.2,0)}/> */}
            {Array.from(Array(x).keys()).map((i) => {
                return Array.from(Array(z).keys()).map((j) => {
                    return (
                        <InteractiveGeometry
                            key={i * z + j}
                            geo={<planeGeometry/>}
                            color={new THREE.Color(Math.random(), Math.random(), Math.random())}
                            position={new THREE.Vector3(i,0,j)}
                            rotation={[-Math.PI / 2, 0, 0]}
                        />
                    );
                });
            })};
        </group>
    );
};