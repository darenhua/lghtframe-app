import { Canvas } from "@react-three/fiber";
import { useRef, createContext, useState, useContext } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { useControls } from "leva";
import StairGroup from "./StairGroup";

export const StairsContext = createContext({
    stairsCenter: 100,
    stairsSize: 100,
    handleStairs: () => {},
});

export const ControlsContext = createContext({
    numFloors: 99,
    floorInfo: {
        xSize: { 99: 99 },
        ySize: { 99: 99 },
    },
});
export default function Viewer({
    value,
    shadows,
    contactShadow,
    autoRotate,
    environment,
    preset,
    intensity,
}) {
    const [stairsCenter, setStairsCenter] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [stairsSize, setStairsSize] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    // const [loading, setLoading] = useState(true);

    const handleStairs = (size, center) => {
        setStairsSize(size);
        setStairsCenter(center);
    };

    const stairsValue = {
        stairsCenter: stairsCenter,
        stairsSize: stairsSize,
        handleStairs: handleStairs,
    };

    const controlsRef = useRef();

    // const { numFloors } = useControls({
    //     numFloors: {
    //         value: 1,
    //         min: 1,
    //         max: 8,
    //         step: 1,
    //     },
    // });

    const { floors } = useControls({
        floors: true,
    });

    return (
        <Canvas
            // gl={{ preserveDrawingBuffer: true }}
            shadows
            camera={{ position: [0, 1, 1], fov: 80 }}
        >
            <ambientLight intensity={0.5} />
            <OrbitControls ref={controlsRef} />
            <Stage
                controls={controlsRef}
                preset={preset}
                intensity={intensity}
                contactShadow={contactShadow}
                shadows
                adjustCamera
                environment={environment}
            >
                <StairsContext.Provider value={stairsValue}>
                    <ControlsContext.Provider value={value}>
                        <StairGroup
                            floors={floors}
                            numFloors={value.numFloors}
                        />
                    </ControlsContext.Provider>
                </StairsContext.Provider>
            </Stage>
        </Canvas>
    );
}
