const fs = require("fs");
const path = require("path");

;(async() => {
    try {
        copyFolderSync(
            path.join(__dirname, "..", "src", "assets"),
            path.join(__dirname, "..", "dist")
        );
        
        copyFolderSync(
            path.join(__dirname, "..", "src", "views"),
            path.join(__dirname, "..", "dist")
        );
    }
    catch(ex) { 
        return;
    }
})();

function copyFileSync(source, target){
    let targetFile = target;

    if (fs.existsSync(target)){
        if(fs.lstatSync(target).isDirectory()){
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderSync(source, target) {
    let files = [];
    let targetFolder = path.join(target, path.basename(source));
    
    if(!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder);
    }
    
    if(fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function(file){
            let curSource = path.join(source, file);
            
            if (fs.lstatSync(curSource).isDirectory()){
                copyFolderSync(curSource, targetFolder);
            }
            else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}