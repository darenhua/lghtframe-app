import { Suspense, useContext } from "react";
import Floor from "./Floor";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";
import { Html, useProgress } from "@react-three/drei";

function Loader() {
    const { progress } = useProgress();
    console.log(progress);
    return <Html center>{progress} % loaded</Html>;
}
export default function StairGroup({ floors, numFloors }) {
    const { stairsSize, stairsCenter } = useContext(StairsContext);
    const { floorInfo } = useContext(ControlsContext);
    const arr = Array(numFloors).fill(0);
    //  positionStairShaft={[
    //     0,
    //     index * (stairsSize.y - 0.86),
    //     0,
    // ]}

    return (
        <group>
            {arr.map((value, index) => {
                return (
                    <Suspense key={index} fallback={<Loader />}>
                        <Floor
                            floorNum={index + 1}
                            position={[0, index * (stairsSize.y - 0.565), 0]}
                            floors={floors}
                        />
                    </Suspense>
                );
            })}
            {floors && (
                <mesh position={[-3, stairsCenter.y / 2 - 0.05, 0]}>
                    <boxGeometry args={[0.2, 1, 1]}></boxGeometry>
                    <meshBasicMaterial color="red"></meshBasicMaterial>
                </mesh>
            )}
        </group>
    );
}
