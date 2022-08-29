import Result from "./components/Result";
import Tutorial from "./components/Tutorial";
import { useState } from "react";

function App() {
    const [tutorial, setTutorial] = useState(true);
    return (
        <div className="h-screen">
            <main className="" style={{ height: "calc(100vh - 2.75rem)" }}>
                {tutorial ? (
                    <Tutorial handleTutorial={(data) => setTutorial(data)} />
                ) : (
                    <Result />
                )}
            </main>
            <div className="w-screen font-bold h-11 border-t-2 flex items-center justify-between">
                <div className="flex">
                    <p className="mx-8">LGHTFrame &copy;</p>
                    <p
                        className="mx-8 select-none cursor-pointer"
                        onClick={() => {
                            setTutorial(true);
                        }}
                    >
                        Tutorial
                    </p>
                </div>
                <p className="mx-8">About Us</p>
            </div>
        </div>
    );
}

export default App;
