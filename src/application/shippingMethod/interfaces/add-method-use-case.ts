import { AddShippingMethodDTO } from "../../../presentation/shippingMethod/dtos/input/add-method.js";
import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export interface AddShippingMethodUseCase {
    execute(addShippingMethodDTO: AddShippingMethodDTO): Promise<ShippingMethodResponseDTO>;
}
