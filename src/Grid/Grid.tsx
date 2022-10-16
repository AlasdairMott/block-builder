import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from 'three';
import { ThreeElements, Vector3 } from '@react-three/fiber'
import { Plane, Box } from "@react-three/drei";
import { InteractiveGeometry } from "./InteractiveGeometry";

export function Grid(props: any) {
    const [x, setX] = React.useState(10);
    const [y, setY] = React.useState(10);
    const [z, setZ] = React.useState(10);

    const blockClickHandler = (e: {blockId: string; position: Vector3}) => {
        console.log(e.blockId);
        console.log(e.position);
    };

    return (
        <group>
            {/* <InteractiveGeometry geo={box} position={new THREE.Vector3(0,1.2,0)}/> */}
            {Array.from(Array(x).keys()).map((i) => {
                return Array.from(Array(y).keys()).map((j) => {
                    return Array.from(Array(z).keys()).map((k) => {
                        return (
                            <InteractiveGeometry
                                key={`${i}-${j}-${k}`}
                                geo={<boxGeometry />}
                                color={new THREE.Color(Math.random(), Math.random(), Math.random())}
                                position={new THREE.Vector3(i, j, k)}
                                locked={(j != 0)}
                                blockId={`${i}-${j}-${k}`}
                                blockClicked={blockClickHandler}
                            />
                        );
                    });
                });
            })}
        </group>
    );
}

