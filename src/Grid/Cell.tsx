import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements, ThreeEvent, useFrame, Vector3 } from '@react-three/fiber'
import { Model } from './Model';
import { gridActions } from '../store/grid';
import { useSelector, useDispatch } from 'react-redux';
import Face from './Face';
import { Euler } from 'three';

export type CellProps = {
    blockId: string;
    position: [x: number, y: number, z: number],
    color?: string;
    locked: boolean;
    active: boolean;
}

type Face = {
    position: Vector3,
    rotation: Euler
}

export function Cell(props: CellProps) {

    const dispatch = useDispatch();
    const grid = useSelector((state: any) => state.grid);

    // const [locked, setLocked] = useState(props.locked);
    const [active, setActive] = useState(false);
    //const [hovered, setHover] = useState(grid.selectedBlock.id === props.blockId);
    const hovered = grid.selectedBlock.id === props.blockId;

    // const opacity = hovered ? 1.0 : 0.0;
    const opacity = 0.6;
    const position = new THREE.Vector3(props.position[0], props.position[1], props.position[2]);
    const faceOffset = 0.2;

    const faces: Face[] = [
        { position: new THREE.Vector3(0, 0, faceOffset), rotation: new THREE.Euler(0, 0, 0) },
        { position: new THREE.Vector3(0, 0, -faceOffset), rotation: new THREE.Euler(0, Math.PI, 0) },
        { position: new THREE.Vector3(0, faceOffset, 0), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },
        { position: new THREE.Vector3(0, -faceOffset, 0), rotation: new THREE.Euler(Math.PI / 2, 0, 0) },
        { position: new THREE.Vector3(faceOffset, 0, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0) },
        { position: new THREE.Vector3(-faceOffset, 0, 0), rotation: new THREE.Euler(0, -Math.PI / 2, 0) },
    ]

    return (
        <group position={props.position}>
            <mesh visible={false}>
                <boxGeometry />
                <meshStandardMaterial attach="material" color={"yellow"} transparent={true} opacity={opacity} />
            </mesh>
            <Faces faces={faces} />
        </group>

    );
};

const Faces = (props: any) => {

    const refs = useRef<THREE.Mesh[]>([]);

    useFrame((state) => {
        const intersections = state.raycaster.intersectObjects(refs, true);
    });

    return (<>{
        props.faces.map((face: Face, index: number) => {return (
            <Face
                ref={(element: THREE.Mesh) => refs.current.push(element)}
                key={index}
                position={face.position}
                rotation={face.rotation}
            />)
    })}</>)
}