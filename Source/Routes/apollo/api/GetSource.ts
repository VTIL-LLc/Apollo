import { __baseDirName } from 'Assemblies/Directories';
import { IRoutingController } from 'Assemblies/Setup/Interfaces/IRoutingController';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs'

// this will get routed to {siteName}/GetSource, it will read the path of the file from the routes root, and have that as the path of the route
// __pageIndex.ts -> {siteName}/ (This can only be at the routes root, e.g. {siteName}/test => /routes/test/__pageIndex.ts will literally route to /test/__pageIndex, you'd use /routes/test.ts instead)
// __all.ts => {siteName}{url} (Captures ALL routes, this will only work if it's at the routes root, e.g. /routes/test/__all.ts will literally route to /test/__all, you'd use /routes/__all.ts instead)
// _P-paramName.ts => {siteName}/:paramName (For URI parameters)

// ApiKey
const apiKey = process.env.apiKey

class GetSource implements IRoutingController {
    public RequestMethod = 'ALL';
    public Callback(_request: Request, response: Response, _resumeFunction: NextFunction) {
        if (_request.body.apiKey == apiKey) {
            var fileName = _request.body.fileName || "default"

            return response.send(fs.readFileSync(__baseDirName + `/ROBLOX/${fileName}.lua`))
        }

        return response.send({
            data: [
                "Nil"
            ]
        });
    }
}

export = new GetSource();