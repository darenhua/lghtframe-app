import Slider from "./Slider.js";
/* <label htmlFor="numFloors">Number of Floors</label>
<input
    type="range"
    id="numFloors"
    name="numFloors"
    min="0"
    max="10"
    step="1"
    value={numFloors}
    onChange={(event) => handleNumFloors(event.target.value)}
    (0,firstfloor,floorname)=>{ Index=0,value=firstfloor,key=floorname Let tempObj=f_det[key] update_f_det(prestate=>({... prestate,[key]:{...tempObj,[index]:value}}) }


/> */

export default function Controls({
    numFloors,
    floorInfo,
    handleNumFloors,
    handleFloorInfo,
}) {
    const floorsArr = new Array(+numFloors).fill();
    return (
        <div className="flex flex-col p-12">
            <div>
                <Slider
                    value={numFloors}
                    handleChange={(e) =>
                        handleNumFloors(parseInt(e.target.value, 10))
                    }
                >
                    Number of Floors
                </Slider>
            </div>
            {floorsArr.map((item, count) => (
                <div key={count}>
                    <label htmlFor="floor">Floor {count} </label>
                    <input
                        type="range"
                        id="floor"
                        name="floor"
                        min="0"
                        max="10"
                        step="1"
                        value={floorInfo["xSize"]?.[count]}
                        onChange={(event) => {
                            let key = "xSize";
                            let tempObj = floorInfo[key];
                            handleFloorInfo({
                                ...floorInfo,
                                [key]: {
                                    ...tempObj,
                                    [count]: parseInt(event.target.value, 10),
                                },
                            });
                        }}
                    />
                    {JSON.stringify(floorInfo["xSize"]?.[count])}
                </div>
            ))}
        </div>
    );
}
