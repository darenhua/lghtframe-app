import { Suspense, useContext } from "react";
import Floor from "./Floor";
import { StairsContext } from "./Viewer";

export default function StairGroup({ floors, numFloors }) {
    const { stairsSize } = useContext(StairsContext);
    // useEffect(() => {
    //     if (stairsCenter && stairsSize) {
    //         setLoading(false);
    //     }
    // }, [loading, stairsCenter, stairsSize]);
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
        </group>
    );
}
