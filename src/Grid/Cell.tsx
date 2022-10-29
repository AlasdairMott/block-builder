import { Box } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';
import { gridActions } from '../store/grid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { modelActions } from '../store/model';
import { CellProps } from '../store/types';
import { ActiveTool } from '../store/ui';
import Face from './Face';
import { ModelAnimated } from './Model';

export type FaceProps = {
    faceId: Direction;
    position: THREE.Vector3,
    rotation: Euler
}

export enum Direction {
    zPos = 'zPos',
    zNeg = 'zNeg',
    xPos = 'xPos',
    xNeg = 'xNeg',
    yPos = 'yPos',
    yNeg = 'yNeg'
}

export function Cell(props: CellProps) {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(state => state.ui.mode);
    const model = useAppSelector(state => state.grid.present.cells[props.blockId].model!);
    
    const [hovered, setHover] = useState(false);

    const F = 0.5; // face size

    const faces: FaceProps[] = [
        { faceId: Direction.xPos, position: new THREE.Vector3(F, 0, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0) }, //right
        { faceId: Direction.xNeg, position: new THREE.Vector3(-F, 0, 0), rotation: new THREE.Euler(0, -Math.PI / 2, 0) }, //left
        { faceId: Direction.yPos, position: new THREE.Vector3(0, F, 0), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) }, //up
        { faceId: Direction.yNeg, position: new THREE.Vector3(0, -F, 0), rotation: new THREE.Euler(Math.PI / 2, 0, 0) }, //down
        { faceId: Direction.zPos, position: new THREE.Vector3(0, 0, F), rotation: new THREE.Euler(0, 0, 0) }, //front
        { faceId: Direction.zNeg, position: new THREE.Vector3(0, 0, -F), rotation: new THREE.Euler(0, Math.PI, 0) }, //back
    ]

    const enterHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(true);
        e.stopPropagation();
    };

    const leaveHandler = (e: ThreeEvent<PointerEvent>) => {
        setHover(false);
        e.stopPropagation();
    };

    const subtractHandler = (e: ThreeEvent<MouseEvent>) => {
        setHover(false);
        dispatch(gridActions.subtractBlock({
            blockId: props.blockId
        }));

        e.stopPropagation();
    };

    const selectHandler = (e: ThreeEvent<MouseEvent>) => {
        dispatch(modelActions.selectBlock({
            model: model
        }));

        e.stopPropagation();
    };

    const opacity = 0.5;

    return (
        <group position={props.position}>
            <mesh visible={props.active}>
                {props.active && <ModelAnimated {...model}/>}
            </mesh>
            {props.active && mode === ActiveTool.Add &&
                faces.map((face: FaceProps, index: number) => {
                    return (<Face
                        key={index}
                        faceId={face.faceId}
                        blockId={props.blockId}
                        scale={F * 2}
                        position={face.position}
                        rotation={face.rotation}/>
                    )
                })
            }
            {props.active && mode === ActiveTool.Subtract &&
                <Box scale={1.1} visible={hovered} onPointerEnter={enterHandler} onPointerLeave={leaveHandler} onClick={subtractHandler}>
                    <meshLambertMaterial color="red" transparent={true} opacity={opacity} />
                </Box>
            }
            {props.active && mode === ActiveTool.Select &&
                <Box scale={1.1} visible={hovered} onPointerEnter={enterHandler} onPointerLeave={leaveHandler} onClick={selectHandler}>
                    <meshLambertMaterial color="yellow" transparent={true} opacity={opacity} />
                </Box>
            }
        </group>

    );
};