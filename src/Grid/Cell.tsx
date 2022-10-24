import { Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { Euler } from 'three';
import Face from './Face';
import { Model } from './Model';

export type CellProps = {
    blockId: string;
    position: [x: number, y: number, z: number],
    locked: boolean;
    active: boolean;
}

type FaceProps = {
    faceId: Direction;
    position: Vector3,
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

    const F = 0.51; // face size

    const faces: FaceProps[] = [
        { faceId:Direction.zPos, position: new THREE.Vector3(0, 0, F), rotation: new THREE.Euler(0, 0, 0) }, //front
        { faceId:Direction.zNeg, position: new THREE.Vector3(0, 0, -F), rotation: new THREE.Euler(0, Math.PI, 0) }, //back
        { faceId:Direction.yPos, position: new THREE.Vector3(0, F, 0), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) }, //up
        { faceId:Direction.yNeg, position: new THREE.Vector3(0, -F, 0), rotation: new THREE.Euler(Math.PI / 2, 0, 0) }, //down
        { faceId:Direction.xPos, position: new THREE.Vector3(F, 0, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0) }, //right
        { faceId:Direction.xNeg, position: new THREE.Vector3(-F, 0, 0), rotation: new THREE.Euler(0, -Math.PI / 2, 0) }, //left
    ]

    return (
        <group position={props.position}>
            <mesh visible={props.active}>
                {props.active && <Model />}
            </mesh>
            {!props.locked && props.active &&
                faces.map((face: FaceProps, index: number) => {
                    return (<Face
                        key={index}
                        faceId={face.faceId}
                        blockId={props.blockId}
                        scale={F * 2}
                        position={face.position}
                        rotation={face.rotation}/>
                    )
                })}
        </group>

    );
};