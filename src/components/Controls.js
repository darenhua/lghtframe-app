import { useEffect, useState } from "react";

const Slider = ({ children, value, hFor, handleChange, id, ...props }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input {...props} id={id} value={value} onInput={handleChange} />
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
                className={` ${isCollapsed ? "hidden" : "block"}`}
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
    handleNumFloors,
    handleFloorInfo,
}) {
    const floorsArr = new Array(numFloors).fill();
    let possibleBalconies = {};
    for (let i = 0; i < numFloors * 2; i += 2) {
        let floor1 = i;
        let floor2 = i + 1;
        console.log(
            floor1,
            floorInfo["xSize"][floor1 + 2],
            floorInfo["xSize"][floor1]
        );
        if (floorInfo["xSize"][floor1 + 2] + 2 < floorInfo["xSize"][floor1]) {
            possibleBalconies[floor1 + 2] = true;
        } else {
            possibleBalconies[floor1 + 2] = false;
        }
        if (floorInfo["xSize"][floor2 + 2] + 2 < floorInfo["xSize"][floor2]) {
            possibleBalconies[floor2 + 2] = true;
        } else {
            possibleBalconies[floor2 + 2] = false;
        }
    }

    //PUT THAT USEEFFECT BULLSHIT INTO A CALLBACK. WHEN YOU CHANGE THE SLIDER THATS WHEN THE EFFECT TRIGGERS???
    return (
        <div className="flex flex-col p-12">
            <div>
                {floorInfo.balcony ? "true" : "false"}
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
                        handleNumFloors(parseInt(e.target.value, 10));
                        let key = "xSize";
                        let tempObj = floorInfo[key];
                        let defaultVal = floorInfo[key][numFloors];

                        handleFloorInfo({
                            ...floorInfo,
                            [key]: {
                                ...tempObj,
                                [numFloors * 2]: 0,
                                [numFloors * 2 + 1]: 0,
                            },
                            balcony: possibleBalconies,
                        });
                    }}
                >
                    <p className="select-none">Number of Floors {numFloors}</p>
                </Slider>
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
                            step=".1"
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

                        <label htmlFor="balcony">Balcony?</label>
                        <input
                            type="checkbox"
                            id="balcony"
                            name="balcony"
                        ></input>
                    </CollapsedDiv>
                </div>
            ))}
        </div>
    );
}
