import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { ThreeElements, ThreeEvent, Vector3 } from '@react-three/fiber'
import { Model } from './Model';
import { gridActions } from '../store/grid';
import { useSelector, useDispatch } from 'react-redux';
import Face from './Face';

export type CellProps = {
    blockId: string;
    position: [x: number, y: number, z: number],
    color?: string;
    locked: boolean;
    active: boolean;
    onPointerOver?: (e: {id: string; distance: number}) => void;
    hoveredFace?: ({id: string; distance: number} | null);
}

export function Cell(props: CellProps) {

    const dispatch = useDispatch();
    const grid = useSelector((state: any) => state.grid);

    // const [locked, setLocked] = useState(props.locked);
    const [active, setActive] = useState(false);
    //const [hovered, setHover] = useState(grid.selectedBlock.id === props.blockId);
    const hovered = grid.selectedBlock.id === props.blockId;

    const clickHandler = (e: ThreeEvent<MouseEvent>) => {
        if (hovered) {
            setActive(!active);

            dispatch(gridActions.addBlock({
                id: props.blockId,
                position: props.position
            }));
        }
    }

    const pointerOverHandler = (e: ThreeEvent<PointerEvent>) => {
        // dispatch(gridActions.hoverEnter({
        //     id: props.blockId,
        //     distance: e.distance
        // }));
    }

    const pointerOutHandler = (e: ThreeEvent<PointerEvent>) => {
        // dispatch(gridActions.hoverExit({
        //     id: props.blockId,
        //     distance: e.distance
        // }));
    }

    const facePointerOverHandler = (e: {id: string; distance: number}) => {
        props.onPointerOver?.(e);
    }

    let color;
    if (props.locked) {
        color = '#D3D3D3'
    } else if (hovered) {
        color = 'yellow'
    } else if (active) {
        color = 'cyan'
    } else {
        color = props.color;
    };

    // const opacity = hovered ? 1.0 : 0.0;
    const opacity = 0.6;
    const position = new THREE.Vector3(props.position[0], props.position[1], props.position[2]);
    const faceOffset = 0.2;

    // const faces = [
    //     { id: Math.random().toString(), position: new THREE.Vector3(0, 0, faceOffset), rotation: new THREE.Euler(0, 0, 0)},
    //     { id: Math.random().toString(), position: new THREE.Vector3(0, 0, -faceOffset), rotation: new THREE.Euler(0, Math.PI, 0)},
    //     { id: Math.random().toString(), position: new THREE.Vector3(0, faceOffset, 0), rotation: new THREE.Euler(-Math.PI / 2, 0, 0)},
    //     { id: Math.random().toString(), position: new THREE.Vector3(0, -faceOffset, 0), rotation: new THREE.Euler(Math.PI / 2, 0, 0)},
    //     { id: Math.random().toString(), position: new THREE.Vector3(faceOffset, 0, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0)},
    //     { id: Math.random().toString(), position: new THREE.Vector3(-faceOffset, 0, 0), rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
    // ]

    return (
        <>
            <mesh
                {...props}
                visible={hovered || active}
                position={props.position}
                onClick={clickHandler}
                onPointerOver={pointerOverHandler}
                onPointerOut={pointerOutHandler}>
                {!props.locked && !active && <boxGeometry />}
                {active && <Model />}
                <meshStandardMaterial attach="material" color={color} transparent={true} opacity={opacity} />
            </mesh>
            <Face
                position={new THREE.Vector3(0, -faceOffset, 0).add(position)}
                rotation={[Math.PI / 2, 0, 0]}
                scale={faceOffset*2}
                onPointerEnterFace={facePointerOverHandler}
                hoveredFace={props.hoveredFace}
            />
            <Face
                position={new THREE.Vector3(0, 0, faceOffset).add(position)}
                rotation={[0, 0, Math.PI / 2]}
                scale={faceOffset*2}
                onPointerEnterFace={facePointerOverHandler}
                hoveredFace={props.hoveredFace}
            />
            <Face
                position={new THREE.Vector3(0, 0, -faceOffset).add(position)}
                rotation={[Math.PI, 0, 0]}
                scale={faceOffset*2}
                onPointerEnterFace={facePointerOverHandler}
                hoveredFace={props.hoveredFace}
            />
            <Face
                position={new THREE.Vector3(0, faceOffset, 0).add(position)}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={faceOffset*2}
                onPointerEnterFace={facePointerOverHandler}
                hoveredFace={props.hoveredFace}
            />
            <Face
                position={new THREE.Vector3(faceOffset, 0, 0).add(position)}
                rotation={[0, Math.PI / 2, 0]}
                scale={faceOffset*2}
                onPointerEnterFace={facePointerOverHandler}
                hoveredFace={props.hoveredFace}
            />
            <Face
                position={new THREE.Vector3(-faceOffset, 0, 0).add(position)}
                rotation={[0, -Math.PI / 2, 0]}
                scale={faceOffset*2}
                onPointerEnterFace={facePointerOverHandler}
                hoveredFace={props.hoveredFace}
            />

        </>

    );
};