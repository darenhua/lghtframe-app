import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Slider = ({ children, value, hFor, handleChange, id, ...props }) => {
    const endgreen = value * 10;

    const sliderGradient = {
        backgroundImage: `linear-gradient(to right, #fff 0%, #fff ${endgreen}%, rgba(255, 255,255, 0) ${endgreen}%, rgba(255, 255,255, 0) 100%)`,
    };

    return (
        <>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor={id}
            >
                {children}
            </label>
            <input
                className="slider-style mb-6 transition-all slider-thumb cursor-pointer"
                style={sliderGradient}
                {...props}
                id={id}
                value={value}
                onInput={handleChange}
            />
        </>
    );
};

const FloorSlider = ({ children, numFloors, handleChange }) => {
    return (
        <Slider
            value={numFloors}
            type="range"
            id="numFloors"
            name="numFloors"
            min="0"
            max="10"
            step="1"
            handleChange={handleChange}
        >
            {children}
        </Slider>
    );
};

const SliderDisplay = ({ numFloors, className, children }) => {
    return (
        <div className="select-none flex items-center justify-between">
            <h3 className={`font-medium text-lg ${className}`}>{children}</h3>
            <h3 className="w-20 pr-4 text-right bg-slate-700 rounded-md">
                {numFloors}
            </h3>
        </div>
    );
};

const CollapsedDiv = ({ collapsed, children, count }) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    return (
        <div className="control-container relative select-none">
            <button
                className={`absolute ${
                    isCollapsed || "rotate-0"
                } top-1 rotate-90 text-black transition-all hover:text-gray-300 right-4 block`}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <h2 className="absolute top-1 left-4 block text-white font-medium">
                Floor {count + 1}
            </h2>

            <div
                className={`transition-all pt-6 ${
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
    canvas,
    revealFrame,
    handleNumFloors,
    handleFloorInfo,
    handleRevealFrame,
}) {
    const floorsArr = new Array(numFloors).fill();
    const findPossibleBalconies = (newFloorInfo) => {
        console.log("logging balconies sizes");
        let possibleBalconies = { value: {}, balcSize: {} };
        for (let i = 0; i < numFloors * 2; i += 2) {
            let floor1 = i;
            let floor2 = i + 1;

            if (
                newFloorInfo["xSize"][floor1 + 2] + 2 <
                newFloorInfo["xSize"][floor1]
            ) {
                possibleBalconies.value[floor1 + 2] = true;
                possibleBalconies.balcSize[floor1 + 2] =
                    newFloorInfo["xSize"][floor1] -
                    newFloorInfo["xSize"][floor1 + 2];
            } else {
                possibleBalconies.value[floor1 + 2] = false;
            }
            if (
                newFloorInfo["xSize"][floor2 + 2] + 2 <
                newFloorInfo["xSize"][floor2]
            ) {
                possibleBalconies.value[floor2 + 2] = true;
                possibleBalconies.balcSize[floor2 + 2] =
                    newFloorInfo["xSize"][floor2] -
                    newFloorInfo["xSize"][floor2 + 2];
            } else {
                possibleBalconies.value[floor2 + 2] = false;
            }
            console.log(
                "bsize2",
                newFloorInfo["xSize"][floor2] -
                    newFloorInfo["xSize"][floor2 + 2]
            );
        }
        return possibleBalconies;
    };

    return (
        <div className="flex flex-col p-6">
            <div className="control-container">
                <FloorSlider
                    numFloors={numFloors}
                    handleChange={(e) => {
                        //for key in keys -> keys: [xSize, ySize, floors?, ...]
                        const val = parseInt(e.target.value, 10);
                        handleNumFloors(val);
                        const possibleBalconies =
                            findPossibleBalconies(floorInfo);
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
                    <SliderDisplay className="text-white" numFloors={numFloors}>
                        Number of Floors:
                    </SliderDisplay>
                </FloorSlider>
                <div>
                    <div
                        className=""
                        onClick={() => handleRevealFrame(!revealFrame)}
                    >
                        <label className="text-base font-bold mr-3 text-white select-none">
                            See the LGHTFrame!
                        </label>

                        <FontAwesomeIcon
                            className={`transition-color text-black hover:text-gray-300 ${
                                revealFrame && "text-white"
                            }`}
                            icon={revealFrame ? faEye : faEyeSlash}
                        />
                    </div>
                </div>
                <div className="flex mt-2 items-center">
                    <h2 className="text-base font-bold mr-3 text-white select-none">
                        Take a screenshot:
                    </h2>

                    <button
                        onClick={() => {
                            const link = document.createElement("a");
                            link.setAttribute("download", "canvas.png");
                            link.setAttribute(
                                "href",
                                canvas.domElement
                                    .toDataURL("image/png")
                                    .replace("image/png", "image/octet-stream")
                            );
                            link.click();
                        }}
                        className="rounded-md border px-4 py-1 border-white text-white"
                    >
                        Download
                    </button>
                </div>
            </div>
            {floorsArr.map((item, count) => (
                <div className="w-full my-6 relative" key={count}>
                    <CollapsedDiv count={count} collapsed={false}>
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
                                const newFloorInfo = {
                                    ...floorInfo,
                                    [key]: {
                                        ...tempObj,
                                        [count * 2]: parseInt(
                                            event.target.value,
                                            10
                                        ),
                                    },
                                };
                                const possibleBalconies =
                                    findPossibleBalconies(newFloorInfo);
                                handleFloorInfo({
                                    ...newFloorInfo,
                                    balcony: possibleBalconies,
                                });
                            }}
                        >
                            <SliderDisplay
                                numFloors={JSON.stringify(
                                    floorInfo["xSize"]?.[count * 2] ?? 0
                                )}
                                className="text-base"
                            >
                                Room {count * 2} Size:
                            </SliderDisplay>
                        </Slider>

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
                                const newFloorInfo = {
                                    ...floorInfo,
                                    [key]: {
                                        ...tempObj,
                                        [count * 2 + 1]: parseInt(
                                            event.target.value,
                                            10
                                        ),
                                    },
                                };
                                const possibleBalconies =
                                    findPossibleBalconies(newFloorInfo);

                                handleFloorInfo({
                                    ...newFloorInfo,
                                    balcony: possibleBalconies,
                                });
                            }}
                        >
                            <SliderDisplay
                                numFloors={JSON.stringify(
                                    floorInfo["xSize"]?.[count * 2 + 1] ?? 0
                                )}
                                className="text-base"
                            >
                                Room {count * 2 + 1} Size:
                            </SliderDisplay>{" "}
                        </Slider>

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
