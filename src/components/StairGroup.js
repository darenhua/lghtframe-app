import { Suspense } from "react";
import Stairs from "./Stairs";

export default function StairGroup({ numFloors }) {
    const arr = Array(numFloors).fill(0);
    return (
        <group>
            {arr.map((value, index) => {
                return (
                    <Suspense fallback={null}>
                        <Stairs
                            floorNum={index + 1}
                            position={[0, index * 2, 0]}
                        />
                    </Suspense>
                );
            })}
        </group>
    );
}
