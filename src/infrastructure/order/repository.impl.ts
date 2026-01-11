
import { prisma } from "../database/postgres/prisma-client.js";
import type { OrderRepository } from "../../domain/order/repository.js";
import { OrderMapper } from "./mapper.js";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { OrderEntity } from "../../domain/order/entity.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";

export class OrderRepositoryImpl implements OrderRepository {

    public async create(order: OrderEntity): Promise<OrderEntity> {

        const data = OrderMapper.toPersistence(order);

        const newOrder = await prisma.order.create({
            data,
            include: { items: true }
        });

        return OrderMapper.toDomain(newOrder);
    }

    public async getById(id: string): Promise<OrderEntity> {

        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true }
        })
        if (!order) throw new NotFoundError('No se encontró un pedido con el ID proporcionado.');

        return OrderMapper.toDomain(order);
    }

    public async getByUserId(id: string): Promise<OrderEntity[]> {

        const orders = await prisma.order.findMany({
            where: { id },
            orderBy: { createdAt: 'desc' },
            include: { items: true }
        });
        if (!orders) throw new NotFoundError('No se encontraron pedidos relacionados a este usuario.');
        
        return OrderMapper.toDomainFromList(orders);
    }

    public async getAll(): Promise<OrderEntity[]> {

        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { items: true }
        });
        
        return OrderMapper.toDomainFromList(orders);

    }

    public async update(order: OrderEntity): Promise<OrderEntity> {
        
        const updatedOrder = await prisma.order.update({
            where: { id: order.id! },
            data: {
                status: order.status as OrderStatus,
                paymentStatus: order.paymentStatus as PaymentStatus,
            },
            include: { items: true }
        });

        return OrderMapper.toDomain(updatedOrder);
    }

}
