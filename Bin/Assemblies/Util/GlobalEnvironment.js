"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEnvironment = void 0;
const Convert_1 = require("./Convert");
const DotENV_1 = require("./DotENV");
class GlobalEnvironment {
    static get PersistLocalLogs() {
        DotENV_1.DotENV.GlobalConfigure();
        return Convert_1.Convert.ToBoolean(process.env.LOG_PERSIST, false);
    }
}
exports.GlobalEnvironment = GlobalEnvironment;
