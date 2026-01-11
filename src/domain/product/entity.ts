export class ProductEntity {
    constructor(
        public readonly id: number | null,
        public readonly categoryId: number,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly stock: number,
        public readonly imageUrl: string,
        public readonly weight: number,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    public static create(params: {
        id: number | null;
        categoryId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageUrl: string;
        weight: number;
        createdAt?: Date;
        updatedAt?: Date;
    }): ProductEntity {
        return new ProductEntity(
            null,
            params.categoryId,
            params.name,
            params.description,
            params.price,
            params.stock,
            params.imageUrl,
            params.weight,
        );
    }
}