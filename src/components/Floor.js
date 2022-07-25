import { useContext, useLayoutEffect } from "react";
import Stairs from "./Stairs.js";
import Room from "./Room.js";
import { StairsContext } from "./Viewer";
import { ControlsContext } from "./Viewer";

export default function Floor({ floorNum, position, floors }) {
    const { stairsSize } = useContext(StairsContext);
    return (
        <group>
            <Stairs position={position} />;
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
