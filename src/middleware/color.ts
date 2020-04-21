import * as express from "express";
import ColorUtils from "../utils/color";

export default function(req: express.Request, res: express.Response, next){
    try {
        let query = req.query;
        let name: string = < string > query.name;
        
        if(!name){
            res.status(503).json({
                error: "Please specify name parameter"
            }).end();
        }
        else if(name.length > 16){
            res.status(503).json({
                error: "Name parameter must not exceed 16 characters"
            }).end();
        }
        else {
            next();
        }
    }
    catch(ex){
        res.json({
            error: ex.message
        }).end();
    }
}