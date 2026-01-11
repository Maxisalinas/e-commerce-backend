import type { GetCartByUserIdUseCase } from "../interfaces/get-by-user-id-use-case.js";
import type { CartRepository } from "../../../domain/cart/repository.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";


export class GetCartByUserId implements GetCartByUserIdUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute(id: string): Promise<CartResponseDTO> {

        const cart = await this.cartRepository.getByUserId(id);
        
        return CartResponseDTO.fromEntity(cart);
    }
    
}
