import { __baseDirName } from 'Assemblies/Directories';
import { IRoutingController } from 'Assemblies/Setup/Interfaces/IRoutingController';
import { NextFunction, Request, Response } from 'express';

class Index implements IRoutingController {
	public RequestMethod = 'ALL';
	public Callback(_request: Request, response: Response, _resumeFunction: NextFunction) {
		return response.sendStatus(200);
	}
}

export = new Index();