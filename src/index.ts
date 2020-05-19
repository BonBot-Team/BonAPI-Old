import * as express from "express";
import * as bp from "body-parser";
import { join } from "path";
import GeneratorManager from "./generator/manager";

// Routes
import DocsRoute from "./route/docs";
import CreateRoute from "./route/create";
import DownloadRoute from "./route/download";

class App {
    
    public app: express.Application;
    public genMgr: GeneratorManager = new GeneratorManager;
    
    constructor(){
        this.app = express();
        this.config();
        this.run();
    }
    
    public config() : void {
        let genMgr = this.genMgr;
        
        this.getApp().set("views", join(__dirname, "views"));
        this.getApp().set("view engine", "ejs");
        
        this.getApp().use(bp.json());
        this.getApp().use(bp.urlencoded({ extended: true }));
        this.getApp().use("/docs", DocsRoute());
        this.getApp().use("/api/create", CreateRoute(genMgr));
        this.getApp().use("/api/download", DownloadRoute(genMgr));
    }
    
    public run() : void {
        this.getApp().listen(8089, function(){
            console.log("Web server is running.");
        });
    }
    
    public getApp() : express.Application {
        return this.app;
    }
}

export default new App();