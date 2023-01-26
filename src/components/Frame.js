import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function Frame({ center, size }) {
    const houseTexture = useLoader(TextureLoader, "/TemplateGrid_orm.png");
    // const lghtframeTexture = useLoader(
    //     TextureLoader,
    //     "/TemplateGrid_normal.png"
    // );

    const [centerX, centerY, centerZ] = center;
    const [sizeX, sizeY, sizeZ] = size;
    const frontFaceBars = [
        [-sizeX / 2, 0, -sizeZ / 2],
        [sizeX / 2, 0, -sizeZ / 2],
        [0, -sizeY / 2, -sizeZ / 2],
        [0, sizeY / 2, -sizeZ / 2],
        [-sizeX / 2, 0, sizeZ / 2],
        [sizeX / 2, 0, sizeZ / 2],
        [0, -sizeY / 2, sizeZ / 2],
        [0, sizeY / 2, sizeZ / 2],
    ];
    const longBars = [
        [-sizeX / 2, -sizeY / 2, 0],
        [sizeX / 2, -sizeY / 2, 0],
        [-sizeX / 2, sizeY / 2, 0],
        [sizeX / 2, sizeY / 2, 0],
    ];

    const cornerConnectors = [
        [-sizeX / 2, -sizeY / 2, -sizeZ / 2],
        [sizeX / 2, -sizeY / 2, -sizeZ / 2],
        [-sizeX / 2, sizeY / 2, -sizeZ / 2],
        [sizeX / 2, sizeY / 2, -sizeZ / 2],
        [-sizeX / 2, -sizeY / 2, sizeZ / 2],
        [sizeX / 2, -sizeY / 2, sizeZ / 2],
        [-sizeX / 2, sizeY / 2, sizeZ / 2],
        [sizeX / 2, sizeY / 2, sizeZ / 2],
    ];

    const floorPanels = [
        [0, -sizeY / 2, 0],
        [0, sizeY / 2, 0],
    ];

    const renderFramePiece = (centers, color, order) => {
        const pos = [
            centerX + centers[0],
            centerY + centers[1],
            centerZ + centers[2],
        ];
        const newSizeX = centers[0] === 0 ? sizeX - 0.5 : 0.5;
        const newSizeY = centers[1] === 0 ? sizeY - 0.5 : 0.5;
        const newSizeZ = centers[2] === 0 ? sizeZ - 0.5 : 0.5;
        const size = [newSizeX, newSizeY, newSizeZ];
        return (
            <mesh position={pos} renderOrder={order}>
                <boxGeometry args={size} />
                <meshBasicMaterial
                    // map={houseTexture}
                    // depthTest={false}
                    color={color}
                />
            </mesh>
        );
    };
    const generateBarCenters = (start, end, numPoints) => {
        const totalDistance = end - start - 4;

        // Calculate the spacing between points
        const spacing = totalDistance / (numPoints - 1);

        // Initialize the list of points
        const points = [];

        // Iterate over the number of points
        for (let i = 0; i < numPoints; i++) {
            // Calculate the value of the point
            const point = start + 2 + i * spacing;
            // Append the point to the list
            points.push(point);
        }

        return points;
    };

    const barCenters = generateBarCenters(
        centerZ - sizeZ / 2,
        centerZ + sizeZ / 2,
        5
    );

    return (
        <group>
            {frontFaceBars.map((frontFaceBar) =>
                renderFramePiece(frontFaceBar, "green", 0)
            )}
            {longBars.map((longBar) => renderFramePiece(longBar, "blue", 1))}
            {cornerConnectors.map((cornerConnector) =>
                renderFramePiece(cornerConnector, "red", 2)
            )}
            {floorPanels.map((floorPanel) =>
                renderFramePiece(floorPanel, "yellow", 3)
            )}
            {barCenters.map((barZ) => {
                const barCenter = [centerX - sizeX / 2, centerY, barZ];
                const barSize = [0.5, sizeY - 0.5, 0.5];
                return (
                    <mesh position={barCenter}>
                        <boxGeometry args={barSize} />
                        <meshBasicMaterial
                            // map={houseTexture}
                            // depthTest={false}
                            color="purple"
                        />
                    </mesh>
                );
            })}
            {barCenters.map((barZ) => {
                const barCenter = [centerX + sizeX / 2, centerY, barZ];
                const barSize = [0.5, sizeY - 0.5, 0.5];
                return (
                    <mesh position={barCenter}>
                        <boxGeometry args={barSize} />
                        <meshBasicMaterial
                            // map={houseTexture}
                            // depthTest={false}
                            color="purple"
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
