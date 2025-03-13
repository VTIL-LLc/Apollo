"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotENV = void 0;
const Directories_1 = require("Assemblies/Directories");
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
class DotENV {
    static GlobalConfigure() {
        try {
            const data = (0, dotenv_1.parse)((0, fs_1.readFileSync)(Directories_1.__baseDirName + '/.env'));
            for (const k in data) {
                process.env[k] = data[k];
            }
        }
        catch (e) { }
    }
}
exports.DotENV = DotENV;
