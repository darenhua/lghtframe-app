import { useContext } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";
import Frame from "./Frame";

export default function Room({ position, floorNum, stairsNum }) {
    const defaultSize = 0;
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const { stairsSize, stairsCenter } = useContext(StairsContext);
    const { floorInfo, revealFrame } = useContext(ControlsContext);
    const houseTexture = useLoader(TextureLoader, "/TemplateGrid_orm.png");
    const lghtframeTexture = useLoader(
        TextureLoader,
        "/TemplateGrid_normal.png"
    );

    const balcSize =
        floorInfo.balcony.value[floorNum - 2] &&
        floorInfo.balcony.balcSize[floorNum - 2];
    const size = floorInfo["xSize"][floorNum - 2] ?? defaultSize;
    const yTemp = position[1] - (stairsSize.y * 0.938 * (stairsNum - 1)) / 2;
    const roomY = floorNum % 2 ? yTemp - 0.6 : yTemp;
    const roomZ =
        floorNum % 2
            ? stairsCenter.z - (stairsSize.z + size) / 2 - stairsSize.z / 2 + 3
            : (stairsSize.z + size) / 2 - stairsCenter.z + stairsSize.z / 2 - 3;
    // const roomZ =
    //     floorNum % 2
    //         ? stairsCenter.z - (stairsSize.z + size) / 2 + 0.975
    //         : (stairsSize.z + size) / 2 - stairsCenter.z - 0.5075;
    const balcZ =
        floorNum % 2 ? stairsSize.z : 3.6 + stairsSize.z + size + balcSize / 2;

    const allocateWindows = (windowSize = 2) => {
        const windowZStart =
            floorNum % 2
                ? stairsCenter.z + 1.1 - windowSize / 2
                : windowSize / 2 + 0.4925;
        const windowSpace = stairsSize.z + size - Math.abs(windowZStart);
        const windowCount = Math.ceil(windowSpace / windowSize);
        let windowPositions = [];
        //might want to make i=1
        for (let i = 0; i < windowCount; i++) {
            let windowZMiddle;
            if (floorNum % 2) {
                windowZMiddle = windowZStart - i * windowSize;
            } else {
                windowZMiddle = windowZStart + i * windowSize;
            }

            // windowPositions.push([stairsCenter.x + 7.5, roomY, windowZMiddle]);
            windowPositions.push([stairsCenter.x - 7.5, roomY, windowZMiddle]);
        }
        return windowPositions;
    };
    // console.log(floorInfo["xSize"][floorNum - 2], floorInfo["xSize"][floorNum]);
    const windowSize = 4;
    const windowPositions = allocateWindows(windowSize);

    return (
        <group>
            <Frame
                center={[stairsCenter.x, roomY, roomZ]}
                size={[15, stairsSize.y, stairsSize.z + size]}
            />
            <mesh position={[stairsCenter.x, roomY, roomZ]}>
                <boxGeometry args={[15, stairsSize.y, stairsSize.z + size]} />
                <meshStandardMaterial
                    transparent={true}
                    opacity={0.3}
                    // color="#fff"
                    color={`#${color}`}
                    roughness={0.1}
                    // map={revealFrame ? lghtframeTexture : houseTexture}
                />
            </mesh>
            {floorInfo.balcony.value[floorNum - 2] && (
                <mesh position={[stairsCenter.x, roomY, balcZ]}>
                    <boxGeometry args={[15, stairsSize.y, balcSize]} />
                    <meshBasicMaterial color="green" />
                </mesh>
            )}
            {/* {windowPositions.map((wPos, index) => {
                // console.log(wPos);
                return (
                    <mesh position={wPos} key={index}>
                        <boxGeometry
                            args={[0.3, stairsSize.y - 1.5, windowSize - 0.2]}
                        />
                        <meshBasicMaterial color="blue" />
                    </mesh>
                );
            })} */}
        </group>
    );
}
