import { MeshProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, ShaderMaterial } from 'three';
import fragmentShader, { uniforms } from '../3d/shaders/fragmentShader';

const HoverCube = (props: MeshProps) => {
    const mesh = useRef<Mesh>(null!);

    useFrame(({ clock }) => {
        const material = mesh.current.material as ShaderMaterial;
        material.uniforms.u_time.value = clock.getElapsedTime();
    });

    return (
        <>
            <mesh {...props} ref={mesh} position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <shaderMaterial
                    uniforms={uniforms}
                    fragmentShader={fragmentShader}
                    transparent={true}
                />
            </mesh>
        </>
    );
};

export default HoverCube;