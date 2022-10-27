import { Canvas } from "@react-three/fiber";
import "../App.css";
import Model from "../Grid/Model";
import { useAppSelector } from "../store/hooks";
import styles from "./Preview.module.css";

const Preview = () => {
    const nextModel = useAppSelector(state => state.grid.present.nextModel);

    return (
        <div className={`${styles.preview} glass`}>
            <Canvas camera={{ position: [1, 1, 1] }} shadows={true}>
                <ambientLight intensity={1.0}/>
                <Model {...nextModel}/>
            </Canvas>
        </div>
    )
};

export default Preview;