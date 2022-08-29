import { useState } from "react";
import Viewer from "./Viewer";
import Controls from "./Controls";

export default function Result() {
    // Result function is a wrapper around the Canvas function
    const settings = {
        autoRotate: true,
        contactShadow: true,
        intensity: 0.6, // 0 to 1
        preset: "rembrandt", // ['rembrandt', 'portrait', 'upfront', 'soft']
        environment: "city", // ['', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby']
    };
    const [numFloors, setNumFloors] = useState(1);
    const [revealFrame, setRevealFrame] = useState(false);
    const [floorInfo, setFloorInfo] = useState({
        xSize: { 0: 0, 1: 0 },
        windowsFreq: {},
        balcony: {
            value: { 2: false, 3: false },
        },
    });
    const controlsValue = {
        numFloors: numFloors,
        revealFrame: revealFrame,
        floorInfo: floorInfo,
        setFloorInfo: setFloorInfo,
    };
    return (
        <div className="flex h-full overflow-hidden">
            <div className="w-4/12 h-full overflow-auto bg-indigo-300">
                <Controls
                    numFloors={numFloors}
                    floorInfo={floorInfo}
                    revealFrame={revealFrame}
                    handleNumFloors={(data) => setNumFloors(data)}
                    handleFloorInfo={(data) => setFloorInfo(data)}
                    handleRevealFrame={(data) => setRevealFrame(data)}
                />
            </div>
            <div className="w-8/12 h-full">
                <Viewer value={controlsValue} {...settings} />
            </div>
        </div>
    );
}
