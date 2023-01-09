function GridItem({ src, alt, animate, children }) {
    return (
        <div className="flex flex-col w-full items-center justify-center transition-colors hover:bg-slate-100 rounded-lg group">
            <img
                className={`${
                    animate ? "group-hover:animate-mouse-circle" : ""
                } pt-12 h-auto w-10 sm:w-12 2xl:w-24 max-w-full`}
                src={src}
                alt={alt}
            />
            <p className="w-md 2xl:text-lg w-7/12 py-4 md:py-6 lg:py-8 text-center">
                {children}
            </p>
        </div>
    );
}

export default function Tutorial({ handleTutorial }) {
    const gridItems = [
        {
            src: "/leftclick.png",
            alt: "left click mouse image",
            txt: "Left click and drag to orbit.",
            animate: true,
        },
        {
            src: "/rightclick.png",
            alt: "right click mouse image",
            txt: "Right click and drag to pan.",
            animate: true,
        },
        {
            src: "/scroll.png",
            alt: "scroll mouse image",
            txt: "Scroll to zoom in and out.",
            animate: false,
        },
        {
            src: "/sliders-icon-27.jpg",
            alt: "left click image",
            txt: "Use the controls to build your house!",
            animate: false,
        },
    ];
    return (
        <div
            className={` h-full animate-fade-in w-screen cursor-pointer bg-slate-50`}
            onClick={() => handleTutorial(false)}
        >
            <div className="w-8/12 h-full mx-auto flex flex-col justify-center items-center">
                <h2 className="text-3xl mb-6 font-bold">
                    Build your own LGHTFrame House
                </h2>
                <div className="grid w-full max-w-4xl gap-2 grid-cols-4 2xl:grid-cols-2">
                    {gridItems.map((item, count) => (
                        <GridItem
                            key={count}
                            src={item.src}
                            alt={item.alt}
                            animate={item.animate}
                        >
                            {item.txt}
                        </GridItem>
                    ))}
                </div>
                <h3 className="mt-12 text-2xl font-semibold">
                    Click anywhere to start!
                </h3>
            </div>
        </div>
    );
}
