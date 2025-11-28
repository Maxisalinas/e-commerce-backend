export class CategoryEntity {

    constructor(
        public readonly id: number,
        public readonly name: string
    ) {}
    
    public static fromObject(object: any): CategoryEntity {
        
        const { name, id } = object;
        return new CategoryEntity( name, id );

    }

    public static fromObjectList(objects: any[]): CategoryEntity[] {
        return objects.map(obj => CategoryEntity.fromObject(obj));
    }

}
