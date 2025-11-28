import { CartRepository } from "../../../domain/cart/repository.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import type { GetCartByIdUseCase } from "../interfaces/get-by-id-use-case.js";


export class GetCartById implements GetCartByIdUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute( id: string ): Promise<CartResponseDTO> {
        const cart = await this.cartRepository.getById(id);
        return new CartResponseDTO(cart);
    }
}
