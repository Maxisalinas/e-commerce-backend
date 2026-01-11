export class CategoryEntity {

    constructor(
        public readonly id: number | null,
        public readonly name: string,
    ){}
    
    public static create(params: {
        id: number | null;
        name: string;
    }): CategoryEntity {
        return new CategoryEntity(
            null,
            params.name 
        );
    }

}