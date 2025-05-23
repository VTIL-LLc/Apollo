import { ImportHandler } from './ImportHandler';
ImportHandler();

import Application from 'express';
import { LoggingHandler } from './Assemblies/Middleware/Logger';
import { StandardInHandler } from './StandardInHandler';
import { SystemSDK } from 'Assemblies/Setup/Lib/SystemSDK';
import { __baseDirName } from 'Assemblies/Directories';

import { DotENV } from 'Assemblies/Util/DotENV';

(async () => {
    // Configure the environment for current server!
    DotENV.GlobalConfigure()

    const ExampleApplication = Application();

    // Add your middleware here that you want to execute before the routes (like static serve, pre-header, etc)

    // Access logs
    ExampleApplication.use(LoggingHandler);

    // Builds routes for an application
    SystemSDK.ConfigureServer(
        SystemSDK.MetadataBuilder(
            ExampleApplication,
            'apollo',
            'apollo.vtilserver.com' // The name of the site, this is actually only consumed by the logger for debugging possible issues
        )
    );

    // Add your middleware here that you want to execute after the routes (like error handling, not found handling, etc)

    SystemSDK.StartServer({
        Application: ExampleApplication, // The Express Application to inject into
        SiteName: 'localhost', // A hostname/ip address to bind to (it will resolve the IP if it's a hostname)
        UseSsl: false, // Whether or not to use SSL
        UseSslV2: false, // Whether or not to use HTTP/2.0
        UseInsecure: true, // Whether or not to use insecure HTTP
        InsecurePort: 80, // The port to use for insecure HTTP
        SslPort: 443, // The port to use for SSL
        UseSslDirectoryName: false, // Whether or not to use the directory that contains the SSL files, if false you will have to specify the full path to the SSL files
        CertificateFileName: 'example-ssl.crt', // The name of the certificate file
        CertificateKeyPassword: 'password', // The password for the certificate key (optional)
        RootCertificateFileName: 'example-root-ca.crt', // The name of the root certificate file (optional)
        CertificateKeyFileName: 'example-ssl.key', // The name of the certificate key file

    });
})();

StandardInHandler();
