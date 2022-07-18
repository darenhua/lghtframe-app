import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";
import { useContext } from "react";
export default function Room({ position, floorNum }) {
    const defaultSize = 0;
    const color = Math.floor(Math.random() * 16777215).toString(16);

    const { stairsSize, stairsCenter } = useContext(StairsContext);
    const { floorInfo } = useContext(ControlsContext);
    const size = floorInfo["xSize"][floorNum - 1] ?? defaultSize;
    const roomY =
        stairsCenter.y + position[1] - (stairsSize.y * (floorNum - 1)) / 2;
    const roomZ =
        floorNum % 2 === 0
            ? stairsCenter.z - (stairsSize.z + size) / 2
            : size / 2 - stairsCenter.z;

    return (
        <mesh position={[stairsCenter.x, roomY, roomZ]}>
            <boxGeometry args={[5, stairsSize.y, stairsSize.z + size]} />
            <meshBasicMaterial
                transparent={true}
                opacity={0.2}
                color={`#${color}`}
            />
        </mesh>
    );
}
