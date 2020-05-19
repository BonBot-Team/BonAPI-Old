import * as express from "express";
import { join } from "path";
import { readFileSync } from "fs";

export default function () {
    let router: express.Router = express.Router();

    router.get("/*", function (req: express.Request, res: express.Response) {
        try {
            let json = JSON.parse(readFileSync(join(__dirname, "..", "assets", "docs.json")).toString());
            
            res.render("docs", {
                endpoints: json
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