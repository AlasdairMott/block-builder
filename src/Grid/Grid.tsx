import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import * as THREE from 'three';
import { ThreeElements, Vector3, ThreeEvent, useFrame } from '@react-three/fiber'
import { Plane, Box, CycleRaycast } from "@react-three/drei";
import { Cell, CellProps } from "./Cell";
import { useSelector, useDispatch } from 'react-redux';
import { gridActions, GridState } from '../store/grid';
import Face from "./Face";
import { AnyARecord } from "dns";
import { Raycaster, Intersection, Object3D, Mesh } from "three";
// import useRefs from 'react-use-refs'

export function Grid() {


    // const [x, setX] = React.useState(10);
    // const [y, setY] = React.useState(10);
    // const [z, setZ] = React.useState(10);
    const dispatch = useDispatch();
    const grid = useSelector((state: any) => state.grid);

    // get values from map as an array

    const cells: CellProps[] = [];
    for (let key in grid.cells) {
        cells.push(grid.cells[key]);
    }
    // // for each value in grid.cells, push a new cell to the cell array
    // // for (let [key, value] of grid.cells) {
    // //     // console.log(value)
    // //     cells.push(value as CellProps);
    // // };

    // for (let 

    //console.log(cells)
    // console.log(grid.cells)

    const [hovered, setHoveredFace] = useState<string>("");

    // useFrame((state) => {
    //     console.log(state.raycaster)
    //     })

    // function cycleRaycastHandler(hits: any, cycle: any) : null {
    //     console.log(hits)
    //     console.log(cycle)
    //     return null;
    // }

    const raycastHandler = (e: any) => {
        console.log(e)
    }

    // const raycaster = new THREE.Raycaster();
    useFrame((state) => {
        const intersections = state.raycaster.intersectObjects(state.scene.children, true);
        
        // highlight the first object that the raycaster intersects
        if (intersections.length > 0) {
            const intersection = intersections[0];
            // setHoveredFace();
        }
    });

    return (
        <>
            {cells.map((cell: CellProps) => {
                return (
                    <Cell
                        {...cell}
                        key={cell.blockId}
                    />
                );
            })}
            {/* <RayCaster /> */}
        </>
    );
}

// function RayCaster() {
//     const [box1Ref, box2Ref, box3Ref] = useRefs()
//     const raycaster = useMemo(() => new THREE.Raycaster(new THREE.Vector3(-3, 0, 0), new THREE.Vector3(1, 0, 0)), [])
//     useFrame(() => {
//       const intersections = raycaster.intersectObjects([box1Ref.current, box2Ref.current, box3Ref.current])
//       ;[box1Ref, box2Ref, box3Ref].forEach((ref) => ref.current.material.color.set('red'))
//       for (const intersect of intersections) {
//         // (intersect.object as Mesh).material.color.set('#0000ff')
//     }
//     })
//     return (
//       <>
//         <Box ref={box1Ref} position={[-2, 0, 0]} />
//         <Box ref={box2Ref} />
//         <Box ref={box3Ref} position={[2, 0, 0]} />
//       </>
//     )
//   }
