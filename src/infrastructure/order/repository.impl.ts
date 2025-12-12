
import { prisma } from "../database/postgres/prisma-client.js";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { OrderEntity } from "../../domain/order/entity.js";
import { OrderRepository } from "../../domain/order/repository.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";

export class OrderRepositoryImpl implements OrderRepository {

    public async create(order: OrderEntity): Promise<OrderEntity> {

        const newOrder = await prisma.order.create({
            data: {
                userId: order.userId,
                status: order.status as OrderStatus,
                paymentStatus: order.paymentStatus as PaymentStatus,
                totalAmount: order.totalAmount,
                shippingName: order.shippingAddress.name,
                shippingStreet: order.shippingAddress.street,
                shippingCity: order.shippingAddress.city,
                shippingState: order.shippingAddress.state,
                shippingZip: order.shippingAddress.zip,
                shippingCountry: order.shippingAddress.country,
                shippingPhone: order.shippingAddress.phone,
                billingName: order.billingAddress.name,
                billingStreet: order.billingAddress.street,
                billingCity: order.billingAddress.city,
                billingState: order.billingAddress.state,
                billingZip: order.billingAddress.zip,
                billingCountry: order.billingAddress.country,
                shippingCost: order.shippingCost,
                discount: order.discount,
                notes: order.notes,
                items: {
                    create: order.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        name: item.name,
                        price: item.price,
                        subtotal: item.subtotal
                    }))
                }
            },
            include: {
                items: true
            }
        });

        return OrderEntity.fromObject(newOrder);
    }

    public async getById( orderId: string): Promise<OrderEntity> {

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: true,
            }
        })

        if (!order) throw new NotFoundError('No se encontró un pedido con el ID proporcionado.');

        return OrderEntity.fromObject(order);
    }

    public async getByUserId(userId: string): Promise<OrderEntity[]> {

        const orders = await prisma.order.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                items: true,
            }
        });

        if (!orders) throw new NotFoundError('No se encontraron pedidos relacionados a este usuario.');
        
        return OrderEntity.fromObjectList(orders);
    }

    public async getAll(): Promise<OrderEntity[]> {

        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { items: true }
        });
        
        return OrderEntity.fromObjectList(orders);

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

        return OrderEntity.fromObject(updatedOrder);
    }

}
