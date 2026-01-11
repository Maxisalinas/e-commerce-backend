import { ShippingMethodEntity } from "../../../../domain/shippingMethod/entity.js";

export class ShippingMethodResponseDTO {
    
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly estimatedDays: number,
        public readonly isActive: boolean,
    ) {}


    static fromEntity(method: ShippingMethodEntity): ShippingMethodResponseDTO {
        return new ShippingMethodResponseDTO(
            method.id!,
            method.name,
            method.price,
            method.estimatedDays,
            method.isActive
        );
    }

    static fromEntityList(methods: ShippingMethodEntity[]): ShippingMethodResponseDTO[] {
        return methods.map(method => ShippingMethodResponseDTO.fromEntity(method)); 
    }
}
    