import { useEffect, useState } from "react";

const Slider = ({ children, value, hFor, handleChange, id, ...props }) => {
    return (
        <>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor={id}
            >
                {children}
            </label>
            <input
                className="w-6/12 appearance-none h-0.5 bg-grey rounded outline-none slider-thumb cursor-pointer"
                {...props}
                id={id}
                value={value}
                onInput={handleChange}
            />
        </>
    );
};

const CollapsedDiv = ({ collapsed, children, count }) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    return (
        <div className="relative select-none">
            <button
                className="absolute top-0 right-0 block"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? "Show" : "Hide"} content
            </button>
            <h2 className="">Floor {count + 1}</h2>

            <div
                className={`transition-all  ${
                    isCollapsed ? "hidden" : "block"
                }`}
                aria-expanded={isCollapsed}
            >
                {children}
            </div>
        </div>
    );
};

export default function Controls({
    numFloors,
    floorInfo,
    revealFrame,
    handleNumFloors,
    handleFloorInfo,
    handleRevealFrame,
}) {
    const floorsArr = new Array(numFloors).fill();
    let possibleBalconies = { value: {}, balcSize: {} };
    for (let i = 0; i < numFloors * 2; i += 2) {
        let floor1 = i;
        let floor2 = i + 1;

        if (floorInfo["xSize"][floor1 + 2] + 2 < floorInfo["xSize"][floor1]) {
            possibleBalconies.value[floor1 + 2] = true;
            possibleBalconies.balcSize[floor1 + 2] =
                floorInfo["xSize"][floor1] - floorInfo["xSize"][floor1 + 2];
        } else {
            possibleBalconies.value[floor1 + 2] = false;
        }
        if (floorInfo["xSize"][floor2 + 2] + 2 < floorInfo["xSize"][floor2]) {
            possibleBalconies.value[floor2 + 2] = true;
            possibleBalconies.balcSize[floor2 + 2] =
                floorInfo["xSize"][floor2] - floorInfo["xSize"][floor2 + 2];
        } else {
            possibleBalconies.value[floor2 + 2] = false;
        }
    }
    return (
        <div className="flex flex-col p-12">
            <div>
                <Slider
                    value={numFloors}
                    type="range"
                    id="numFloors"
                    name="numFloors"
                    min="1"
                    max="10"
                    step="1"
                    handleChange={(e) => {
                        //for key in keys -> keys: [xSize, ySize, floors?, ...]
                        const val = parseInt(e.target.value, 10);
                        handleNumFloors(val);
                        let key = "xSize";
                        let xSizes = {};
                        for (let i = 0; i < val * 2; i += 2) {
                            xSizes[i] = floorInfo.xSize[i] ?? 0;
                            xSizes[i + 1] = floorInfo.xSize[i + 1] ?? 0;
                        }
                        handleFloorInfo({
                            ...floorInfo,
                            [key]: xSizes,
                            balcony: possibleBalconies,
                        });
                    }}
                >
                    <p className="select-none">Number of Floors {numFloors}</p>
                </Slider>
                <div>
                    <label htmlFor="balcony">See the LGHTFrame!</label>
                    <input
                        type="checkbox"
                        id="balcony"
                        name="balcony"
                        checked={revealFrame}
                        onChange={() => handleRevealFrame(!revealFrame)}
                    ></input>
                </div>
            </div>
            {floorsArr.map((item, count) => (
                <div className="w-full my-6 bg-red-300 relative" key={count}>
                    <CollapsedDiv count={count} collapsed={true}>
                        <Slider
                            type="range"
                            id="floorA"
                            name="floorA"
                            min="0"
                            max="10"
                            step="1"
                            value={floorInfo["xSize"]?.[count * 2] ?? 0}
                            handleChange={(event) => {
                                let key = "xSize";
                                let tempObj = floorInfo[key];
                                handleFloorInfo({
                                    ...floorInfo,
                                    [key]: {
                                        ...tempObj,
                                        [count * 2]: parseInt(
                                            event.target.value,
                                            10
                                        ),
                                    },
                                    balcony: possibleBalconies,
                                });
                            }}
                        >
                            Floor {count * 2}
                        </Slider>
                        {JSON.stringify(floorInfo["xSize"]?.[count * 2] ?? 0)}
                        <br />
                        <Slider
                            type="range"
                            id="floorB"
                            name="floorB"
                            min="0"
                            max="10"
                            step="1"
                            value={floorInfo["xSize"]?.[count * 2 + 1] ?? 0}
                            handleChange={(event) => {
                                let key = "xSize";
                                let tempObj = floorInfo[key];
                                handleFloorInfo({
                                    ...floorInfo,
                                    [key]: {
                                        ...tempObj,
                                        [count * 2 + 1]: parseInt(
                                            event.target.value,
                                            10
                                        ),
                                    },
                                    balcony: possibleBalconies,
                                });
                            }}
                        >
                            Floor {count * 2 + 1}
                        </Slider>
                        {JSON.stringify(
                            floorInfo["xSize"]?.[count * 2 + 1] ?? 0
                        )}
                        <Slider
                            type="range"
                            id="windowFreq"
                            name="windowFreq"
                            min="1"
                            max="10"
                            step="1"
                            // value={floorInfo["xSize"]?.[count * 2] ?? 0}
                            // handleChange={(event) => {
                            //     let key = "xSize";
                            //     let tempObj = floorInfo[key];
                            //     handleFloorInfo({
                            //         ...floorInfo,
                            //         [key]: {
                            //             ...tempObj,
                            //             [count * 2]: parseInt(
                            //                 event.target.value,
                            //                 10
                            //             ),
                            //         },
                            //     });
                            // }}
                        >
                            Window Freq
                        </Slider>
                    </CollapsedDiv>
                </div>
            ))}
        </div>
    );
}
