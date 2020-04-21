import IGenerator from "./generator";

// Gens
import BonToutou from "./generators/bontoutou";

class GeneratorManager {
    
    private generators: IGenerator[] = [];
    
    constructor(){
        this.init();
    }
    
    private init(): void {
        this.register([
            new BonToutou()
        ]);
    }
    
    public register(gens: Array<IGenerator>) : void {
        let self = this; // wtf array functions doesn't work
        gens.forEach(function(gen: IGenerator){
            self.generators.push(gen);
            console.log("[GENERATOR] Registered : " + gen.getName());
        });
    }
    
    public exists(name: String){
        name = name.toLowerCase();
        
        for(let gen of this.getGenerators()){
            if(gen.getName() == name){
                return true;
            }
        }
        
        return false;
    }
    
    public getGenerator(name: String) : IGenerator {
        name = name.toLowerCase();
        
        for(let gen of this.getGenerators()){
            if(gen.getName() == name){
                return gen;
            }
        }
        
        return undefined;
    }
    
    public getGenerators(): Array<IGenerator> {
        return this.generators;
    }
}

export default GeneratorManager;