import { Suspense, useContext } from "react";
import Floor from "./Floor";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";
export default function StairGroup({ floors, numFloors }) {
    const { stairsSize, stairsCenter } = useContext(StairsContext);
    const { floorInfo } = useContext(ControlsContext);
    const arr = Array(numFloors).fill(0);
    return (
        <group>
            {arr.map((value, index) => {
                return (
                    <Suspense key={index} fallback={null}>
                        <Floor
                            floorNum={index + 1}
                            position={[0, index * stairsSize.y, 0]}
                            floors={floors}
                        />
                    </Suspense>
                );
            })}
            <mesh position={[-3, stairsCenter.y / 2 - 0.05, 0]}>
                <boxGeometry args={[0.2, 1, 1]}></boxGeometry>
                <meshBasicMaterial color="red"></meshBasicMaterial>
            </mesh>
        </group>
    );
}
