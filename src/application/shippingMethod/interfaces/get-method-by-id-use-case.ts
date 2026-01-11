import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export interface GetShippingMethodByIdUseCase {
    execute(id: string): Promise<ShippingMethodResponseDTO>;
}
