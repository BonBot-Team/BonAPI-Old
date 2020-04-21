import isColor = require("is-color");

class ColorUtils {
    
    public static isColor(color: any){
        if(Array.isArray(color)){
            for(let element of color){
                if(!isColor(element)){
                    return false;
                }
            }
            
            return true;
        }
        else {
            return isColor(color);
        }
    }
    
    public static convert(colors: string[]) : string[] {
        let res: string[] = [];
        
        for(let color of colors){
        console.log(this.isHex(color));
            if(this.isHex(color)){
                let rgb = this.hexToRgb(color);
                
                if(rgb){
                    color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            }
            
            res.push(color);
        }
        
        return res;
    }
    
    public static isHex(color: string) : RegExpMatchArray {
        return color.match(/^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/ig);
    }
    
    public static hexToRgb(hex: string) : any {
        let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : undefined;
    }
}

export default ColorUtils;