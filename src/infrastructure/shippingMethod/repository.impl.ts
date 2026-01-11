import { prisma } from "../database/postgres/prisma-client.js";
import type { ShippingMethodRepository } from "../../domain/shippingMethod/repository.js";
import { ShippingMethodMapper } from "./mapper.js";
import { ShippingMethodEntity } from "../../domain/shippingMethod/entity.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";


export class ShippingMethodRepositoryImpl implements ShippingMethodRepository {

    public async addMethod(method: ShippingMethodEntity): Promise<ShippingMethodEntity> {

        const data = ShippingMethodMapper.toPersistence(method);

        const newMethod = await prisma.shippingMethod.create({ data });

        return ShippingMethodMapper.toDomain(newMethod);
    }

    public async getMethodById(id: string): Promise<ShippingMethodEntity> {

        const method = await prisma.shippingMethod.findUnique({
            where: { id },
        })
        if (!method) throw new NotFoundError('No se encontró un método de envío con el ID proporcionado.');
    
        return ShippingMethodMapper.toDomain(method);
    }

    public async getActiveMethods(): Promise<ShippingMethodEntity[]> {

        const methods = await prisma.shippingMethod.findMany({
            where: { isActive: true },
        })
        if (!methods) throw new NotFoundError('No se encontró ningún método de envío activo.');

        return ShippingMethodMapper.toDomainFromList(methods);
    }
    
    public async updateMethod(method: ShippingMethodEntity): Promise<ShippingMethodEntity> {

        const data = ShippingMethodMapper.toPersistence(method);

        const updated = await prisma.shippingMethod.update({
            where: { id: method.id! },
            data
        });

        return ShippingMethodMapper.toDomain(updated);
    }

    public async deleteMethod(id: string): Promise<void> {

        await prisma.shippingMethod.delete({
            where: { id }
        });
        
        return;
    }       

}
