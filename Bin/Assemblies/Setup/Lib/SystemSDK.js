"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSDK = void 0;
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const fs_1 = require("fs");
const Directories_1 = require("Assemblies/Directories");
const Walkers_1 = require("Assemblies/Setup/Walkers");
const LoggingUtility_1 = require("Assemblies/Util/LoggingUtility");
class SystemSDK {
    static SetBaseRoutesPath(path) {
        SystemSDK.BaseRoutesPath = path;
    }
    static ConfigureServer(options) {
        try {
            options.Application.disable('case sensitive routing');
            options.Application.enable('trust proxy');
            options.Application.disable('x-powered-by');
            options.Application.disable('strict routing');
            options.Application.disable('etag');
            options.Application.use((0, express_1.json)({ strict: false }));
            options.Application.use((0, body_parser_1.urlencoded)({ extended: true }));
            SystemSDK.UseExpressRouter(options.Application, options.RoutingOpts);
            if (options.AllowRoutes) {
                SystemSDK.MapRoutesInternal(options.Application, options.RouteConfiguration);
            }
        }
        catch (e) {
            LoggingUtility_1.Logger.Error(`Error occurred when configuring a site! Stack: %s`, e.stack);
        }
    }
    static MetadataBuilder(application, routeDirectory, siteName) {
        return {
            Application: application,
            UseRouting: true,
            RouteConfiguration: {
                RouteStorePath: `${Directories_1.__baseDirName}/Bin/${SystemSDK.BaseRoutesPath}/${routeDirectory}`,
                LogRouteSetup: true,
                SiteName: siteName,
            },
            AllowRoutes: !!routeDirectory,
        };
    }
    static StartServer(options) {
        try {
            options.SslPort = options.SslPort || 443;
            options.InsecurePort = options.InsecurePort || 80;
            let baselineSslServer;
            let baseLineServer;
            if (options.UseInsecure)
                baseLineServer = options.Application.listen(options.InsecurePort, options.SiteName, () => LoggingUtility_1.Logger.Info(`BaseLineServer '%s' started on port %d.`, options.SiteName, options.InsecurePort));
            return [baseLineServer, baselineSslServer];
        }
        catch (err) {
            throw new Error(err);
        }
    }
    static MapRoutesInternal(application, options) {
        const directory = (options !== undefined ? options.RouteStorePath : Directories_1.__baseDirName + '/Routing') || Directories_1.__baseDirName + '/Routing';
        if (!(0, fs_1.existsSync)(directory)) {
            LoggingUtility_1.Logger.Warn(`The directory '%s' for the site '%s' was not found, make sure you configured your directory correctly.`, directory, options.SiteName);
            return;
        }
        const files = Walkers_1.Walkers.WalkDirectory(directory);
        let count = 0;
        files.forEach((file) => {
            let route = file.split('\\').join('/');
            route = route.replace(directory, '');
            if (route.match(/.+\.js/)) {
                route = route.replace('.js', '');
                route = route.split('_P-').join(':');
                route = route.split('\\').join('/');
                let isMiddleware = false;
                if (route === '/__all')
                    isMiddleware = true;
                if (route === '/__pageIndex')
                    route = '/';
                route = route.toLowerCase();
                let map;
                try {
                    map = require(file);
                }
                catch (error) {
                    return LoggingUtility_1.Logger.Error("An error occurred when requiring the file '%s' for the site '%s'. Stack: %s", file, options.SiteName, error.stack);
                }
                let callback;
                let requestMethod;
                if (map) {
                    if (map.Callback)
                        callback = map.Callback;
                    else
                        return;
                    if (map.RequestMethod)
                        requestMethod = map.RequestMethod.toLowerCase();
                    else
                        return;
                    count++;
                    try {
                        if (requestMethod === 'get' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'GET' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.get(route, callback);
                        }
                        else if (requestMethod === 'head' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'HEAD' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.head(route, callback);
                        }
                        else if (requestMethod === 'post' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'POST' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.post(route, callback);
                        }
                        else if (requestMethod === 'put' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'PUT' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.put(route, callback);
                        }
                        else if (requestMethod === 'delete' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'DELETE' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.delete(route, callback);
                        }
                        else if (requestMethod === 'connect' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'CONNECT' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.connect(route, callback);
                        }
                        else if (requestMethod === 'options' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'OPTIONS' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.options(route, callback);
                        }
                        else if (requestMethod === 'trace' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'TRACE' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.trace(route, callback);
                        }
                        else if (requestMethod === 'patch' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'PATCH' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.patch(route, callback);
                        }
                        else if (requestMethod === 'all' && !isMiddleware) {
                            if (options.LogRouteSetup)
                                LoggingUtility_1.Logger.Debug(`Mapping 'ALL' '%s' for site '%s'`, (options.SiteName ? 'https://' + options.SiteName : '') + route, options.SiteName);
                            application.all(route, callback);
                        }
                        else {
                            if (isMiddleware) {
                                LoggingUtility_1.Logger.Debug(`Mapping 'ALL ROUTE CATCHER' for the site '%s'`, options.SiteName);
                                application.use(callback);
                                return;
                            }
                            return LoggingUtility_1.Logger.Error("Error requesting the route '%s'. The method '%s' is not supported.", options.SiteName, requestMethod.toUpperCase());
                        }
                    }
                    catch (error) {
                        return LoggingUtility_1.Logger.Error("An error occurred while mapping the route '%s' for the site '%s'. Stack: %s", route, options.SiteName, error.stack);
                    }
                }
                else {
                    return LoggingUtility_1.Logger.Warn("The route '%s' for the site '%s' had no default export.", file, options.SiteName);
                }
            }
        });
        LoggingUtility_1.Logger.Info(`The site '%s' has %d route(s)`, options.SiteName, count);
    }
    static UseExpressRouter(app, opts) {
        app.use((0, express_1.Router)(opts));
    }
}
exports.SystemSDK = SystemSDK;
SystemSDK.BaseRoutesPath = 'Routes';
