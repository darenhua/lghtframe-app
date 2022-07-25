import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";
import { useContext, useLayoutEffect } from "react";
export default function Room({ position, floorNum, stairsNum }) {
    const defaultSize = 0;
    // const color = Math.floor(Math.random() * 16777215).toString(16);
    const { stairsSize, stairsCenter } = useContext(StairsContext);
    const { floorInfo, setFloorInfo } = useContext(ControlsContext);
    const size = floorInfo["xSize"][floorNum - 2] ?? defaultSize;
    const roomY =
        stairsCenter.y + position[1] - (stairsSize.y * (stairsNum - 1)) / 2;
    const roomZ =
        floorNum % 2
            ? stairsCenter.z - (stairsSize.z + size) / 2
            : size / 2 - stairsCenter.z;
    const balcZ =
        floorNum % 2
            ? stairsCenter.z - stairsSize.z - size - 1
            : -stairsCenter.z + stairsSize.z / 2 + size + 1;

    const allocateWindows = (windowSize = 2) => {
        const windowZStart = floorNum % 2 ? -4 : 4 - stairsSize.z / 2;
        const windowSpace = stairsSize.z + size - Math.abs(windowZStart);
        const windowCount = Math.floor(windowSpace / windowSize);
        let windowPositions = [];
        //might want to make i=1
        windowPositions.push([stairsCenter.x + 2.5, roomY, windowZStart]);
        windowPositions.push([stairsCenter.x - 2.5, roomY, windowZStart]);

        for (let i = 1; i < windowCount; i++) {
            let windowZMiddle;
            if (floorNum % 2) {
                windowZMiddle = windowZStart - i * windowSize;
            } else {
                windowZMiddle = windowZStart + i * windowSize;
            }

            windowPositions.push([stairsCenter.x + 2.5, roomY, windowZMiddle]);
            windowPositions.push([stairsCenter.x - 2.5, roomY, windowZMiddle]);
        }
        return windowPositions;
    };
    // console.log(floorInfo["xSize"][floorNum - 2], floorInfo["xSize"][floorNum]);
    const windowPositions = allocateWindows(3.2);

    return (
        <group>
            <mesh position={[stairsCenter.x, roomY, roomZ]}>
                <boxGeometry args={[5, stairsSize.y, stairsSize.z + size]} />
                <meshBasicMaterial
                    transparent={true}
                    opacity={1}
                    color={`#111`}
                />
            </mesh>
            {floorInfo.balcony[floorNum - 2] && (
                <mesh position={[stairsCenter.x, roomY, balcZ]}>
                    <boxGeometry args={[3, 1, 2]} />
                    <meshBasicMaterial color="green" />
                </mesh>
            )}
            {windowPositions.map((wPos, index) => {
                // console.log(wPos);
                return (
                    <mesh position={wPos} key={index}>
                        <boxGeometry args={[0.3, 1, 1]} />
                        <meshBasicMaterial color="blue" />
                    </mesh>
                );
            })}
        </group>
    );
}
