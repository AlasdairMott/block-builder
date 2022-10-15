import React from 'react';
import './App.css';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three';
import { InteractiveGeometry } from './Grid/InteractiveGeometry'
import { Grid } from './Grid/Grid'
import { Block } from './Grid/Block';

function App() {

  const box = <boxGeometry args={[1, 1, 1]}/>;

  // starting camera location
  const [cameraPosition, setCameraPosition] = React.useState(new Vector3(10, 10, 10));
  const [cameraTarget, setCameraTarget] = React.useState(new Vector3(0, 0, 0));

  return (
    <div className="App">
      <Canvas camera={{position:cameraPosition}}>
        <OrbitControls target={cameraTarget}/>
        <ambientLight/>
        <pointLight position={[10, 10, 10]}/>
        {/* <InteractiveGeometry geo={box} position={new Vector3(-1.2,0,0)} color={'cyan'}/>
        <InteractiveGeometry geo={box} position={new Vector3(1.2,0,0)}/> */}
        <Grid/>
        {/* <Block
          id={'1'}
          position={new Vector3(0,1,4)}
          rotation={90}
        /> */}
      </Canvas>
    </div>
  );
}

export default App;
