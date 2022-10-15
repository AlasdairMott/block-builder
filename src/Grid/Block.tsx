import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3 } from 'three';

export type BlockProps = {
    id: string;
    position: Vector3;
    rotation: number;
}

export const Block: React.FC<BlockProps> = (props) => {

    const filename = './models/model_1.gltf';
    const gltf = useLoader(GLTFLoader, filename);

    return (
        <>
            <group position={props.position} rotation={[0, props.rotation * Math.PI / 180, 0]}>
                <primitive object={gltf.scene}/>     
            </group>       
        </>
    );
}