"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Directories_1 = require("Assemblies/Directories");
const fs_1 = __importDefault(require("fs"));
const apiKey = process.env.apiKey;
class GetSource {
    constructor() {
        this.RequestMethod = 'ALL';
    }
    Callback(_request, response, _resumeFunction) {
        if (_request.body.apiKey == apiKey) {
            var fileName = _request.body.fileName || "default";
            return response.send(fs_1.default.readFileSync(Directories_1.__baseDirName + `/ROBLOX/${fileName}.lua`));
        }
        return response.send({
            data: [
                "Nil"
            ]
        });
    }
}
module.exports = new GetSource();
