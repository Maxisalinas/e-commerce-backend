import type { GetCartByIdUseCase } from "../interfaces/get-by-id-use-case.js";
import type { CartRepository } from "../../../domain/cart/repository.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";


export class GetCartById implements GetCartByIdUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute(id: string): Promise<CartResponseDTO> {

        const cart = await this.cartRepository.getById(id);
       
        return CartResponseDTO.fromEntity(cart);
    }
    
}
