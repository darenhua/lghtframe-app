import Viewer from "./Viewer";

export default function Result() {
    // Result function is a wrapper around the Canvas function
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
            }}
        >
            <Viewer />;
        </div>
    );
}
