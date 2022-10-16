import React, { useEffect } from 'react';
import './App.css';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3, VectorKeyframeTrack } from 'three';
import { InteractiveGeometry } from './Grid/InteractiveGeometry'
import { Grid } from './Grid/Grid'
import { Block } from './Grid/Block';
import { Plane } from '@react-three/drei';

function App() {

  // const ref = React.useRef

  // useEffect(() => {
  //   console.log(ref.current);

  //   // const plane = ref.current as THREE.Mesh;
  //   // plane.rotateX(-Math.PI / 2);
  // }, []);

  const box = <boxGeometry args={[1, 1, 1]}/>;

  // starting camera location
  const [cameraPosition, setCameraPosition] = React.useState(new Vector3(10, 10, 10));
  const [cameraTarget, setCameraTarget] = React.useState(new Vector3(0, 0, 0));

  return (
    <div className="App">
      <Canvas camera={{position:cameraPosition}} shadows={true}>
        <OrbitControls target={cameraTarget}/>
        <ambientLight/>

        <directionalLight position={[100, 100, 100]} castShadow={true} shadow-camera-right={10} shadow-camera-left={-10}/>
        {/* <InteractiveGeometry geo={box} position={new Vector3(-1.2,0,0)} color={'cyan'}/>
        <InteractiveGeometry geo={box} position={new Vector3(1.2,0,0)}/> */}
        <Grid/>
        {/* <Block
          id={'1'}
          position={new Vector3(0,1,4)}
          rotation={90}
        /> */}
        <Plane receiveShadow={true} scale={100} rotation-x={-Math.PI * 0.5} position-y={-0.5}>
          <shadowMaterial opacity={0.1}/>
          {/* <meshBasicMaterial color={'pink'}/> */}
        </Plane>
      </Canvas>
    </div>
  );
}

export default App;
