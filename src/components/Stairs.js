import React, { useLayoutEffect, useRef, useContext, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { StairsContext } from "./Viewer";

export default function Stairs({ position }) {
    const { handleStairs } = useContext(StairsContext);
    const group = useRef();
    const { nodes, materials } = useGLTF("/models/stairs.glb");
    // const boundingBox = useMemo(() => new THREE.Box3(), []);
    useLayoutEffect(() => {
        // compute bounding box
        const box = new THREE.Box3();
        group.current.geometry.computeBoundingBox();
        box.copy(group.current.geometry.boundingBox).applyMatrix4(
            group.current.matrixWorld
        );
        // set bounding box size and center position
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        //send to parent
        handleStairs(size, center);
    }, []);

    return (
        <group position={position} dispose={null}>
            <mesh
                rotation-y={Math.PI / 2}
                ref={group}
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials.Plastic}
                // geometry={nodes.Cube.geometry}
                // material={materials.Material}
            ></mesh>
        </group>
    );
}

useGLTF.preload("/models/stairs.glb");
// useGLTF.preload("/models/stairs_old.glb");
