"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportHandler = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function ImportHandler() {
    (function () {
        const CH_PERIOD = 46;
        const baseUrl = (0, path_1.dirname)(process['mainModule'].filename);
        const existsCache = { d: 0 };
        delete existsCache.d;
        const moduleProto = Object.getPrototypeOf(module);
        const origRequire = moduleProto.require;
        moduleProto.require = function (request) {
            let existsPath = existsCache[request];
            if (existsPath === undefined) {
                existsPath = '';
                if (!(0, path_1.isAbsolute)(request) && request.charCodeAt(0) !== CH_PERIOD) {
                    const ext = (0, path_1.extname)(request);
                    const basedRequest = (0, path_1.join)(baseUrl, ext ? request : request + '.js');
                    if ((0, fs_1.existsSync)(basedRequest))
                        existsPath = basedRequest;
                    else {
                        const basedIndexRequest = (0, path_1.join)(baseUrl, request, 'index.js');
                        existsPath = (0, fs_1.existsSync)(basedIndexRequest) ? basedIndexRequest : '';
                    }
                }
                existsCache[request] = existsPath;
            }
            return origRequire.call(this, existsPath || request);
        };
    })();
}
exports.ImportHandler = ImportHandler;
