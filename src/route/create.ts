import * as express from "express";
import GeneratorManager from "../generator/manager";
import IGenerator from "../generator/generator";
import ColorMiddleware from "../middleware/color";

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
                    res.contentType("image/png");
                    res.status(200).send(buffer).end();
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