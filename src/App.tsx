import { OrbitControls, Plane } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
import { Grid } from './Grid/Grid';

function App() {

  const box = <boxGeometry args={[1, 1, 1]}/>;

  

  return (
    <div className="App">
      <Canvas camera={{position:[10,10,10]}} shadows={true}>
        <OrbitControls target={[0,0,0]}/>
        <ambientLight/>
        <directionalLight position={[100, 100, 100]} castShadow={true} shadow-camera-right={10} shadow-camera-left={-10} shadow-camera-top={10} shadow-camera-bottom={-10}/>
        <Grid/>
        <Plane receiveShadow={true} scale={100} rotation-x={-Math.PI * 0.5} position-y={-0.5}>
          <shadowMaterial opacity={0.1}/>
        </Plane>
      </Canvas>
    </div>
  );
}

export default App;
