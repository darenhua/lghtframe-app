export default function Slider({ children, value, handleChange }) {
    return (
        <>
            <label htmlFor="numFloors">{children}</label>
            <input
                type="range"
                id="numFloors"
                name="numFloors"
                min="0"
                max="10"
                step="1"
                value={value}
                onChange={handleChange}
            />
        </>
    );
}
