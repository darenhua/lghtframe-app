import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export default function Model({ floorNum, ...props }) {
    const group = useRef();
    const { size } = useControls(
        `Floor ${floorNum}`,
        {
            size: {
                value: "medium",
                options: ["small", "medium", "large"],
            },
        },
        { collapsed: true }
    );
    const { nodes, materials } = useGLTF("/models/stairs.glb");
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                geometry={nodes.Cube.geometry}
                material={materials.Material}
            ></mesh>
        </group>
    );
}

useGLTF.preload("/models/stairs.glb");
