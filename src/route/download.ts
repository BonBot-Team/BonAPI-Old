import * as express from "express";
import { PassThrough } from "stream";
import GeneratorManager from "../generator/manager";
import IGenerator from "../generator/generator";

export default function (genMgr: GeneratorManager) {
    let router: express.Router = express.Router();

    router.get("/:generator", function (req: express.Request, res: express.Response) {
        try {
            let query = req.query;
            let gen: IGenerator | undefined = genMgr.getGenerator(req.params.generator);

            if (!gen) {
                res.status(503).json({
                    error: "Generator not found."
                }).end();

                return;
            }

            gen.generate(query)
                .then(function (buffer: Buffer) {
                    let name: string = < string > query.name;
                    let stream: PassThrough = new PassThrough();
                    
                    stream.end(buffer);
                    
                    res.set("Content-disposition", "attachment; filename=bon_" + name.toLowerCase().replace(" ", "_") + ".png");
                    res.contentType("image/png");
                    
                    stream.pipe(res);
                })
                .catch(function (ex) {
                    res.status(503).json({
                        error: ex.message
                    }).end();
                });
        }
        catch (ex) {
            res.status(503).json({
                error: ex.message
            }).end();
        }
    });

    return router;
}