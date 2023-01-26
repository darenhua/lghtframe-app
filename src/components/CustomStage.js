import { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ContactShadows } from "@react-three/drei";

const presets = {
    rembrandt: {
        main: [1, 2, 1],
        fill: [-2, -0.5, -2],
    },
    portrait: {
        main: [-1, 2, 0.5],
        fill: [-1, 0.5, -1.5],
    },
    upfront: {
        main: [0, 2, 1],
        fill: [-1, 0.5, -1.5],
    },
    soft: {
        main: [-2, 4, 4],
        fill: [-1, 0.5, -1.5],
    },
};

export default function Stage({
    children,
    controls,
    shadows = true,
    adjustCamera = true,
    environment = "city",
    intensity = 1,
    preset = "rembrandt",
    shadowBias = 0,
    contactShadow = {
        blur: 2,
        opacity: 0.5,
        position: [0, 0, 0],
    },
    ...props
}) {
    const config = presets[preset];
    const camera = useThree((state) => state.camera);
    // @ts-expect-error new in @react-three/fiber@7.0.5
    const defaultControls = useThree((state) => state.controls);
    const outer = useRef(null);
    const inner = useRef(null);
    const [{ radius, width, height }, set] = useState({
        radius: 0,
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        outer.current.position.set(0, 0, 0);
        outer.current.updateWorldMatrix(true, true);
        const box3 = new THREE.Box3().setFromObject(inner.current);
        const center = new THREE.Vector3();
        const sphere = new THREE.Sphere();
        const height = box3.max.y - box3.min.y;
        const width = box3.max.x - box3.min.x;
        box3.getCenter(center);
        box3.getBoundingSphere(sphere);
        set({ radius: sphere.radius, width, height });
        outer.current.position.set(
            -center.x,
            -center.y + height / 2,
            -center.z
        );
    }, [children]);

    useLayoutEffect(() => {
        if (adjustCamera) {
            const y = radius / (height > width ? 1.18 : 2.5);
            camera.position.set(0, radius * 0.8, radius * 1.8);
            camera.near = 0.1;
            camera.far = Math.max(5000, radius * 4);
            camera.lookAt(y, y, y);
            const ctrl = defaultControls || controls?.current;
            if (ctrl) {
                ctrl.target.set(0, y, 0);
                ctrl.update();
            }
        }
    }, [defaultControls, height, width, adjustCamera]);

    return (
        <group {...props}>
            <group ref={outer}>
                <group ref={inner}>{children}</group>
            </group>
            {contactShadow && (
                <ContactShadows
                    scale={radius * 2}
                    far={radius / 2}
                    {...contactShadow}
                />
            )}
            {environment && <Environment preset={environment} />}
            <ambientLight intensity={intensity / 3} />
            <spotLight
                penumbra={1}
                position={[
                    config.main[0] * radius,
                    config.main[1] * radius,
                    config.main[2] * radius,
                ]}
                intensity={intensity * 2}
                castShadow={shadows}
                shadow-bias={shadowBias}
            />
            <pointLight
                position={[
                    config.fill[0] * radius,
                    config.fill[1] * radius,
                    config.fill[2] * radius,
                ]}
                intensity={intensity}
            />
        </group>
    );
}
