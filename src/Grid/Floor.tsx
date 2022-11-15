import { RefObject } from "react";
import { Euler, Vector3 } from "three";
import { OrbitControls } from 'three-stdlib';
import { Direction } from "./Cell";
import Face from "./Face";

const Floor: React.FC<{ size: [number, number, number], orbitControls: RefObject<OrbitControls> }> = ({ size, orbitControls }) => {
    return (
        <>
            {Array.from(Array(size[0]), (_, x) => (
                Array.from(Array(size[2]), (_, z) => (
                    <group position={[x, -1, z]} key={`${x}-${z}`}>
                        <Face
                            faceId={Direction.yPos}
                            blockId={`${x}_-1_${z}`}
                            scale={1}
                            position={new Vector3(0, 0.5, 0)}
                            rotation={new Euler(-Math.PI / 2, 0, 0)}
                            orbitControls={orbitControls}
                        />
                    </group>
                ))
            ))}
        </>
    );
}

export default Floor;
