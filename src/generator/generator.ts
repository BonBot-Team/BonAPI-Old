interface IGenerator {
    
    getName(): String;
    
    generate(name: string, colors: string[]): Promise<Buffer>;
    
}

export default IGenerator;