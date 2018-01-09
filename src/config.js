function config() {
    switch (process.env.NODE_ENV) {
        case 'development':

            return {
                port: 8080,
                staticLocation: "./react-build",
                indexLocation: "./react-build/index.html",
            };

        case 'production':
            return {
                port: 8080,
                staticLocation: ".",
                indexLocation: "./index.html",
            };

        default:
            throw new Error("configuration environment must be set to either [development] or [production]")
    }
}

export default config();
