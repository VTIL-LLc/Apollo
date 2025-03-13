"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingHandler = void 0;
const LoggingUtility_1 = require("Assemblies/Util/LoggingUtility");
exports.LoggingHandler = ((request, _response, resumeFunction) => {
    LoggingUtility_1.Logger.Log(`%s REQUEST ON %s://%s%s FROM '%s' (%s)`, request.method.toUpperCase(), request.protocol, request.headers['host'] || request.hostname, request.url, request.headers['user-agent'] || 'No User Agent', request.ip);
    resumeFunction();
});
