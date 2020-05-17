interface IGenerator {
    
    getName(): string;
    
    generate(args): Promise<Buffer>;
    
}

export default IGenerator;