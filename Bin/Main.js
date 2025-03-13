"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImportHandler_1 = require("./ImportHandler");
(0, ImportHandler_1.ImportHandler)();
const express_1 = __importDefault(require("express"));
const Logger_1 = require("./Assemblies/Middleware/Logger");
const StandardInHandler_1 = require("./StandardInHandler");
const SystemSDK_1 = require("Assemblies/Setup/Lib/SystemSDK");
const DotENV_1 = require("Assemblies/Util/DotENV");
(async () => {
    DotENV_1.DotENV.GlobalConfigure();
    const ExampleApplication = (0, express_1.default)();
    ExampleApplication.use(Logger_1.LoggingHandler);
    SystemSDK_1.SystemSDK.ConfigureServer(SystemSDK_1.SystemSDK.MetadataBuilder(ExampleApplication, 'apollo', 'apollo.vtilserver.com'));
    SystemSDK_1.SystemSDK.StartServer({
        Application: ExampleApplication,
        SiteName: 'localhost',
        UseSsl: false,
        UseSslV2: false,
        UseInsecure: true,
        InsecurePort: 80,
        SslPort: 443,
        UseSslDirectoryName: false,
        CertificateFileName: 'example-ssl.crt',
        CertificateKeyPassword: 'password',
        RootCertificateFileName: 'example-root-ca.crt',
        CertificateKeyFileName: 'example-ssl.key',
    });
})();
(0, StandardInHandler_1.StandardInHandler)();
