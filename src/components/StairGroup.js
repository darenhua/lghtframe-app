import { Suspense, useContext, useEffect } from "react";
import Floor from "./Floor";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";
import { Html, useProgress } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function Loader() {
    const { progress } = useProgress();
    console.log(progress);
    return <Html center>{progress} % loaded</Html>;
}
export default function StairGroup({ numFloors, setCanvas }) {
    const { stairsSize, stairsCenter } = useContext(StairsContext);
    const { floorInfo } = useContext(ControlsContext);
    const arr = Array(numFloors).fill(0);
    const { gl } = useThree();

    useEffect(() => {
        setCanvas(gl);
    }, []);
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
                            // position={[0, index * (stairsSize.y - 0.565), 0]}
                            position={[stairsCenter.x, index * stairsSize.y, 0]}
                        />
                    </Suspense>
                );
            })}
        </group>
    );
}
