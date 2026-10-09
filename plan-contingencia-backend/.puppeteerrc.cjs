const { join } = require("path");

// Chrome se guarda dentro del proyecto: en Render la carpeta /opt/render/.cache solo existe durante el build
module.exports = {
    cacheDirectory: join(__dirname, ".cache", "puppeteer")
};
