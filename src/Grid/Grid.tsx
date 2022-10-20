import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from 'three';
import { ThreeElements, Vector3 } from '@react-three/fiber'
import { Plane, Box } from "@react-three/drei";
import { Cell, CellProps } from "./Cell";
import { useSelector, useDispatch } from 'react-redux';
import { gridActions, GridState } from '../store/grid';

export function Grid() {
    // const [x, setX] = React.useState(10);
    // const [y, setY] = React.useState(10);
    // const [z, setZ] = React.useState(10);
    const dispatch = useDispatch();
    const grid = useSelector((state: any) => state.grid);

    // get values from map as an array

    const cells: CellProps[] = [];
    for (let key in grid.cells){
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


    return (
        <group>
            {/* <InteractiveGeometry geo={box} position={new THREE.Vector3(0,1.2,0)}/> */}
            {/* {Array.from(Array(x).keys()).map((i) => {
                return Array.from(Array(y).keys()).map((j) => {
                    return Array.from(Array(z).keys()).map((k) => {
                        return (
                            <Cell
                                key={`${i}-${j}-${k}`}
                                blockId={`${i}-${j}-${k}`}
                                color={new THREE.Color(Math.random(), Math.random(), Math.random())}
                                position={new THREE.Vector3(i, j, k)}
                                locked={(j != 0)}
                                active={false}
                            />
                        );
                    });
                });
            })} */}
            {cells.map((cell: CellProps) => {
                return (
                    <Cell
                        {...cell}
                        key={cell.blockId}
                    />
                );
            })}

        </group>
    );
}

