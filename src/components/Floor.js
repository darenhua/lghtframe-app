import { useContext, useLayoutEffect } from "react";
import Stairs from "./Stairs.js";
import Room from "./Room.js";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";

export default function Floor({
    floorNum,
    position,
    positionStairShaft,
    floors,
}) {
    const { stairsSize } = useContext(StairsContext);
    const color = Math.floor(Math.random() * 16777215).toString(16);
    //not enough overlap
    return (
        <group>
            <Stairs position={position} />;
            <mesh position={position}>
                <boxGeometry args={[15, stairsSize.y, stairsSize.x]} />
                <meshStandardMaterial
                    transparent={true}
                    opacity={0.3}
                    // color="#fff"
                    color={`#${color}`}
                    roughness={0.1}
                    // map={revealFrame ? lghtframeTexture : houseTexture}
                />
            </mesh>
            {floors && (
                <group>
                    <Room
                        floorNum={floorNum * 2}
                        stairsNum={floorNum}
                        position={[position[0], position[1] * 1.5, position[2]]}
                    />
                    <Room
                        floorNum={floorNum * 2 + 1}
                        stairsNum={floorNum + 1}
                        position={[
                            position[0],
                            position[1] * 1.5 + stairsSize.y,
                            position[2],
                        ]}
                    />
                </group>
            )}
        </group>
    );
}
