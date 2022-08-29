export default function WireBox() {
    const center = [0, 0, 0];
    const boxdims = [10, 10, 10];
    const ycs = [center[1] + boxdims[1] / 2, center[1] - boxdims[1] / 2];
    const xcs = [center[0] + boxdims[0] / 2, center[0] - boxdims[0] / 2];
    const zcs = [center[2] + boxdims[2] / 2, center[2] - boxdims[2] / 2];
    const frameCenters = [];
    for (let i = 0; i < 2; i++) {
        const yc = ycs[i];
        for (let j = 0; j < 2; j++) {
            const xc = xcs[j];
            let meshInfo = {};
            meshInfo.position = [xc, yc, 0];
            meshInfo.size = [1, 1, boxdims[2]];
            frameCenters.push(meshInfo);
        }
        for (let k = 0; k < 2; k++) {
            const zc = zcs[k];
            let meshInfo = {};
            meshInfo.position = [0, yc, zc];
            meshInfo.size = [boxdims[2], 1, 1];
            frameCenters.push(meshInfo);
        }
    }
    for (let i = 0; i < 2; i++) {
        const xc = xcs[i];
        for (let j = 0; j < 2; j++) {
            const zc = zcs[j];
            let meshInfo = {};
            meshInfo.position = [xc, center[1], zc];
            meshInfo.size = [1, boxdims[1], 1];
            frameCenters.push(meshInfo);
        }
    }
    return (
        <group>
            {frameCenters.map((center, count) => (
                <mesh position={center.position}>
                    <meshBasicMaterial color="red" />
                    <boxGeometry args={center.size} />
                </mesh>
            ))}
        </group>
    );
}
