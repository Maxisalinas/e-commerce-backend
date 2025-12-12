export class CategoryEntity {

    constructor(
        public readonly id: number,
        public readonly name: string,
    ) {}
    
    public static fromObject(object: any): CategoryEntity {
        return new CategoryEntity( object.id, object.name );
    }

    public static fromObjectList(objects: any[]): CategoryEntity[] {
        return objects.map(obj => CategoryEntity.fromObject(obj));
    }

}
