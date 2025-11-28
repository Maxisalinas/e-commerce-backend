import { ProductRepository } from "../../../domain/product/repository.js";
import { GetManyProductsDTO } from "../../../presentation/product/dtos/input/getmany.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";
import type { ProductFilter } from "../interfaces/filter.js";
import type { GetManyProductsUseCase } from "../interfaces/getmany-use-case.js";


export class GetManyProducts implements GetManyProductsUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute(getManyProductsDTO: GetManyProductsDTO): Promise<ProductResponseDTO[]> {
        const productFilter: ProductFilter = {
            page: getManyProductsDTO.page,
            limit: getManyProductsDTO.limit,
            search: getManyProductsDTO.search,
            categoryId: getManyProductsDTO.categoryId,
            minPrice: getManyProductsDTO.minPrice,
            maxPrice: getManyProductsDTO.maxPrice
        }
        const products = await this.productRepository.getMany(productFilter);
        return products.map( product => new ProductResponseDTO(product) );
    }

}