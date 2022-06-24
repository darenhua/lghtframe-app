import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide } from "three";
import StairGroup from "./StairGroup";

export default function Viewer() {
    // we want the camera function to reposition when more levels are added if out frame
    //height of my stairs model is 2 units, but use THREE.box3 to find out size of any other mesh
    const { numFloors } = useControls({
        numFloors: {
            value: 1,
            min: 1,
            max: 5,
            step: 1,
        },
    });
    return (
        <Canvas camera={{ position: [0, 10, 10] }}>
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <hemisphereLight
                intensity={0.125}
                color="#8040df"
                groundColor="red"
            />
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeBufferGeometry args={[10, 10]} />
                <meshBasicMaterial
                    polygonOffset={true}
                    polygonOffsetFactor={-0.1}
                    color="green"
                    side={DoubleSide}
                />
            </mesh>
            <StairGroup numFloors={numFloors} />
        </Canvas>
    );
}
