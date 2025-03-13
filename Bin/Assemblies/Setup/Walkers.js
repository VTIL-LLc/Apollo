"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Walkers = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Walkers {
    static WalkDirectory(directoryName, paths) {
        const directory = (0, fs_1.readdirSync)(directoryName);
        paths = paths || [];
        directory.forEach((directoryOrFile) => {
            const directoryNameV2 = directoryName + '/' + directoryOrFile;
            if ((0, fs_1.statSync)(directoryNameV2).isDirectory()) {
                paths = Walkers.WalkDirectory(directoryNameV2, paths);
            }
            else {
                paths.push((0, path_1.join)(directoryName, '/', directoryOrFile));
            }
        });
        return paths;
    }
    static WalkClassMap(data) {
        if (!(data instanceof Object))
            return null;
        const classMap = new Map(Object.entries(data));
        let hasFound = false;
        classMap.forEach((newClass) => {
            if (hasFound)
                return;
            if ((!newClass || !newClass.IsController) && newClass.length !== 0) {
                data = Walkers.WalkClassMap(newClass);
            }
            else {
                hasFound = true;
                data = newClass;
            }
        });
        return data;
    }
}
exports.Walkers = Walkers;
