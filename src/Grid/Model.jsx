/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { animated, useTransition } from '@react-spring/three';
import { useGLTF } from "@react-three/drei";
import { useRef } from 'react';

const Model = ({ name, rotation, color, ...props }) => {
    const { nodes } = useGLTF("./models/model_0.gltf");
    const useWireframe = !props.wireframe;

    return (
        <group name="1x1" scale={[1, 0.8, 1]} position={[-0.5, 0.5, -0.5]}>
            {useWireframe && <mesh
                castShadow
                receiveShadow
                name={name}
                geometry={nodes[name].geometry}
                position={[0.5, -1.25, 0.5]}
                rotation={[0, rotation, 0]}
            >
                <meshLambertMaterial color={color} />
            </mesh>}
            <lineSegments name="wire" position={[0.5, -1.25, 0.5]} rotation={[0, rotation, 0]}>
                <edgesGeometry attach="geometry" args={[nodes[name].geometry, 30]} />
                <lineBasicMaterial attach="material" color="black" />
            </lineSegments>
        </group>
    );
};

const ModelAnimated = ({ name, rotation, color, ...props }) => {
    const ref = useRef(null);

    const transition = useTransition(true, {
        from: { scale: [0.8, 0.8, 0.8] },
        enter: { scale: [1, 1, 1] },
        leave: () => { console.log("leaving"); return {scale: [0.1, 0.1, 0.1]} },
        config: { mass: 1, tension: 2000, friction: 80 },
    });

    return (
        <>
            {transition((props, item) => item &&
                <>
                    <animated.group dispose={null} scale={props.scale} ref={ref}>
                        <Model name={name} rotation={rotation} color={color} wireframe={props.wireframe} {...props}></Model>
                    </animated.group>
                </>
            )}
        </>
    );
}

export default Model;
export { ModelAnimated };
