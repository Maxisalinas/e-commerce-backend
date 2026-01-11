import { UpdateShippingMethodDTO } from "../../../presentation/shippingMethod/dtos/input/update-method.js";
import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export interface UpdateShippingMethodUseCase {
    execute(id: string, updateShippingMethodDTO: UpdateShippingMethodDTO): Promise<ShippingMethodResponseDTO>;
}
