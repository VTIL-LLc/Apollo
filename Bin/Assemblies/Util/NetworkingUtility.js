"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetUtil = void 0;
const os_1 = require("os");
class NetUtil {
    static GenerateUUIDV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    static GetLocalIP() {
        if (process.env.VTIL_LOCAL_IP !== undefined)
            return process.env.VTIL_LOCAL_IP;
        var netInterfaces = (0, os_1.networkInterfaces)();
        for (var devName in netInterfaces) {
            var netInterface = netInterfaces[devName];
            for (var i = 0; i < netInterface.length; i++) {
                var alias = netInterface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                    return alias.address;
            }
        }
        return '0.0.0.0';
    }
    static GetMachineID() {
        return process.env.VTIL_MACHINE_ID || (0, os_1.hostname)();
    }
}
exports.NetUtil = NetUtil;
