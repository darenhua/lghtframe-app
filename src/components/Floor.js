import { useContext } from "react";
import Stairs from "./Stairs.js";
import Room from "./Room.js";
import { StairsContext } from "./Viewer";

export default function Floor({ floorNum, position, floors }) {
    const { stairsSize } = useContext(StairsContext);
    console.log(floorNum);
    return (
        <group>
            <Stairs position={position} />;
            {floors && (
                <group>
                    <Room floorNum={floorNum} position={position} />
                    <Room
                        floorNum={floorNum + 1}
                        position={position.map((x) => x + stairsSize.y)}
                    />
                </group>
            )}
        </group>
    );
}
