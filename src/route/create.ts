import * as express from "express";
import GeneratorManager from "../generator/manager";
import IGenerator from "../generator/generator";
//import ColorMiddleware from "../middleware/color";

export default function (genMgr: GeneratorManager) {
    let router: express.Router = express.Router();

    router.get("/:generator", function (req: express.Request, res: express.Response) {
        try {
            let query = req.query;
            let name: string = < string > query.name;
            let qColors = < string > query.colors;
            let colors: string[];
            let gen: IGenerator | undefined = genMgr.getGenerator(req.params.generator);

            if (!gen) {
                res.status(200).json({
                    error: "Generator not found."
                }).end();

                return;
            }

            try {
                colors = qColors.split("|").filter(n => n !== "");
            }
            catch(ex) {
                colors = ["#4287f5"];
            }

            name = name.replace("/_/g", " ");

            gen.generate(name, colors)
                .then(function (buffer: Buffer) {
                    res.contentType("image/png");
                    res.send(buffer).end();
                })
                .catch(function (ex) {
                    res.json({
                        error: ex.stack
                    }).end();
                });
        }
        catch (ex) {
            res.json({
                error: ex.message
            }).end();
        }
    });

    return router;
}