"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const util_1 = require("util");
const fs_1 = require("fs");
const NetworkingUtility_1 = require("./NetworkingUtility");
const GlobalEnvironment_1 = require("./GlobalEnvironment");
class Logger {
    static ConstructLoggerMessage(type, message, ...args) {
        return (0, util_1.format)(`[${new Date(Date.now()).toISOString()}][${process.uptime().toFixed(7)}][${process.pid.toString(16)}][${process.platform}-${process.arch}][${process.version}][${NetworkingUtility_1.NetUtil.GetLocalIP()}][${NetworkingUtility_1.NetUtil.GetMachineID()}][${process.env.appName || "Undefined"}][server][${type.toUpperCase()}] ${message}\n`, ...args);
    }
    static GetDirNameByOS() {
        switch (process.platform) {
            case 'win32':
                return `${process.env.LOCALAPPDATA}\\VTIL\\Web\\Logs`;
            case 'linux' || 'darwin':
                return `/opt/vtil/log`;
        }
    }
    static LogLocally(type, message, ...args) {
        const str = Logger.ConstructLoggerMessage(type, message, ...args);
        const dirName = Logger.GetDirNameByOS();
        if (!(0, fs_1.existsSync)(dirName))
            (0, fs_1.mkdirSync)(dirName, { recursive: true });
        (0, fs_1.appendFileSync)(dirName + `/log_${process.pid.toString(16).toUpperCase()}.log`, str);
    }
    static TryClearLogs(overrideGlobalConfig = false) {
        Logger.Log('Try clear logs.');
        if (GlobalEnvironment_1.GlobalEnvironment.PersistLocalLogs) {
            if (overrideGlobalConfig) {
                Logger.Warn('Overriding global config when clearing logs.');
            }
            else {
                Logger.Warn('The local log is set to persist. Please change ENVVAR LOG_PERSIST to change this.');
                return;
            }
        }
        Logger.Log('Clearing LocalLog...');
        const dirName = Logger.GetDirNameByOS();
        if ((0, fs_1.existsSync)(dirName)) {
            (0, fs_1.rmSync)(dirName, { recursive: true, force: true });
            return;
        }
    }
    static Log(message, ...args) {
        console.log(`${Logger.GetSharedColorString()}[\x1b[97mLOG\x1b[0m] \x1b[97m${message}\x1b[0m`, ...args);
        Logger.LogLocally('LOG', message, ...args);
    }
    static Warn(message, ...args) {
        console.log(`${Logger.GetSharedColorString()}[\x1b[93mWARN\x1b[0m] \x1b[93m${message}\x1b[0m`, ...args);
        Logger.LogLocally('WARN', message, ...args);
    }
    static Trace(message, ...args) {
        console.trace(`${Logger.GetSharedColorString()}[\x1b[91mTRACE\x1b[0m] \x1b[91m${message}\x1b[0m`, ...args);
        Logger.LogLocally('TRACE', message, ...args);
    }
    static Debug(message, ...args) {
        console.log(`${Logger.GetSharedColorString()}[\x1b[95mDEBUG\x1b[0m] \x1b[95m${message}\x1b[0m`, ...args);
        Logger.LogLocally('DEBUG', message, ...args);
    }
    static Info(message, ...args) {
        console.log(`${Logger.GetSharedColorString()}[\x1b[94mINFO\x1b[0m] \x1b[94m${message}\x1b[0m`, ...args);
        Logger.LogLocally('INFO', message, ...args);
    }
    static Error(message, ...args) {
        console.log(`${Logger.GetSharedColorString()}[\x1b[91mERROR\x1b[0m] \x1b[91m${message}\x1b[0m`, ...args);
        Logger.LogLocally('ERROR', message, ...args);
    }
    static GetSharedColorString() {
        return `[\x1b[90m${new Date(Date.now()).toISOString()}\x1b[0m][\x1b[90m${process
            .uptime()
            .toFixed(7)}\x1b[0m][\x1b[90m${process.pid.toString(16)}\x1b[0m][\x1b[90m${process.platform}-${process.arch}\x1b[0m][\x1b[90m${process.version}\x1b[0m][\x1b[90m${NetworkingUtility_1.NetUtil.GetLocalIP()}\x1b[0m][\x1b[90m${NetworkingUtility_1.NetUtil.GetMachineID()}\x1b[0m][\x1b[90m${process.env.appName || "Undefined"}\x1b[0m][server]`;
    }
}
exports.Logger = Logger;
