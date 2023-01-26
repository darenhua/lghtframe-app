import { useContext, useState } from "react";
import Stairs from "./Stairs.js";
import Room from "./Room.js";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";

export default function Floor({ floorNum, position }) {
    const { stairsSize } = useContext(StairsContext);
    const { revealFrame } = useContext(ControlsContext);
    const [reveal, setReveal] = useState(false);

    //not enough overlap
    return (
        <group>
            <Stairs position={position} />;
            {!revealFrame && (
                <mesh
                    position={position}
                    onPointerOver={(e) => setReveal(true)}
                    onPointerOut={(e) => setReveal(false)}
                >
                    <boxGeometry
                        args={[15.6, stairsSize.y, stairsSize.x + 0.6]}
                    />
                    <meshStandardMaterial
                        transparent={true}
                        opacity={reveal ? 0.3 : 1}
                        // color="#fff"
                        color={`#fff`}
                        roughness={0.1}
                        // map={revealFrame ? lghtframeTexture : houseTexture}
                    />
                </mesh>
            )}
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
        </group>
    );
}
