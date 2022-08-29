/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],

    theme: {
        extend: {
            keyframes: {
                circle: {
                    from: {
                        transform: "rotate(0deg) translateX(1rem) rotate(0deg)",
                    },
                    to: {
                        transform:
                            "rotate(360deg) translateX(1rem) rotate(-360deg)",
                    },
                },
                fadein: {
                    from: {
                        opacity: 0.5,
                    },
                    to: {
                        opacity: 1,
                    },
                },
            },
            animation: {
                "mouse-circle": "circle 3s linear infinite",
                "fade-in": "fadein .5s ease-in",
            },
        },
    },
    plugins: [],
};
