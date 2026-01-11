import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export interface GetActiveShippingMethodsUseCase {
    execute(): Promise<ShippingMethodResponseDTO[]>;
}
