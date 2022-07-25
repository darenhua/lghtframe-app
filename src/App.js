import Result from "./components/Result";

function App() {
    return (
        <div className="h-screen">
            <main style={{ height: "calc(100vh - 2.75rem)" }}>
                <Result />
            </main>
            <div className="w-screen font-bold h-11 border-t-2 flex items-center justify-between">
                <p className="mx-8">LGHTFrame &copy;</p>
                <p className="mx-8">Link</p>
            </div>
        </div>
    );
}

export default App;
