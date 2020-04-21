import * as canvas from "canvas";
import * as fs from "fs";
import * as path from "path";

import IGenerator from "../generator";
import ColorUtils from "../../utils/color";

let bpath = path.join(__dirname, "..", "..", "assets");
let font = path.join(bpath, "fonts", "bontoutou.ttf");
let imgPath = path.join(bpath, "imgs", "bontoutou.png");

canvas.registerFont(font, {
    family: "Impact"
});

class BonToutou implements IGenerator {
    
    public getName(): String {
        return "bontoutou";
    }
    
    public generate(name: string, colors: string[]): Promise<Buffer> {
        return new Promise(async function(resolve, reject){
            try {
                name = name.toUpperCase();
                colors = ColorUtils.convert(colors);
                
                let x, y: number;
                let can: canvas.Canvas = canvas.createCanvas(256, 256);
                let ctx: canvas.CanvasRenderingContext2D = can.getContext("2d");
                let imgData: canvas.Image = await canvas.loadImage(imgPath);
                
                ctx.drawImage(imgData, 30, 15, can.width, can.height);
                ctx.font = "italic 60px Impact";
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.lineWidth = 3;
                
                x = 10;
                y = can.height - 50;
                
                ctx.fillText("BON", x, y);
                ctx.strokeText("BON", x, y);
                
                let fontAspect: number = 60;
                
                ctx.font = `italic ${fontAspect}px Impact`;
                
                while(ctx.measureText(name).width > can.width){
                    fontAspect--;
                    ctx.font = `italic ${fontAspect}px Impact`;
                }
                
                ctx.strokeStyle = "black";
                ctx.lineWidth = 3;
                ctx.textBaseline = "middle";
                
                
                x = 1;
                y = (can.height / 1.10) - name.length;
                
                if(colors.length <= 2){
                    let gradient: canvas.CanvasGradient = ctx.createLinearGradient(0, 0, colors.length * 100 + 50, colors.length * 100);
                    let offset: number = 0;
                    
                    colors.forEach(function(color: string){
                        gradient.addColorStop(offset, color);
                        offset++;
                    });
                    
                    ctx.fillStyle = gradient;
                    
                    ctx.fillText(name, x, y);
                    ctx.strokeText(name, x, y);
                }
                else {
                    // Azy j'go dodo mdr
                }
                
                ctx.fill();
                ctx.stroke();
                
                resolve(can.toBuffer());
            }
            catch(ex){
                reject(ex);
            }
        });
    }
}

export default BonToutou;