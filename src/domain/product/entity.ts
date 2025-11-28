import { Decimal } from "@prisma/client/runtime/library";

export class ProductEntity {
    constructor(
        public readonly id: number,
        public readonly categoryId: number,
        public readonly name: string,
        public readonly description: string,
        public readonly price: Decimal,
        public readonly stock: number,
        public readonly imageUrl: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    public static fromObject(object: any): ProductEntity {
        
        const { 
            id, 
            categoryId, 
            name,
            description, 
            price, 
            stock, 
            imageUrl, 
            createdAt, 
            updatedAt 
        } = object;

        return new ProductEntity(
            id,
            categoryId,
            name,
            description,
            price,
            stock,
            imageUrl,
            createdAt,
            updatedAt
        );
    }

    public static fromObjectList(objects: any[]): ProductEntity[] {
        return objects.map(obj => ProductEntity.fromObject(obj));
    }

}
