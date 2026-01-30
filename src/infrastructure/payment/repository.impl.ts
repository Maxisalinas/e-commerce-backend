import { prisma } from "../database/postgres/prisma-client.js";
import type { PaymentRepository } from "../../domain/payment/repository.js";
import { PaymentEntity } from "../../domain/payment/entity.js";
import { PaymentMapper } from "./mapper.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";


export class PaymentRepositoryImpl implements PaymentRepository {
    
    public async getById(id: string): Promise<PaymentEntity> {
        
        const payment = await prisma.payment.findUnique({
            where: { id }
        });
        if (!payment) throw new NotFoundError('No se encontró un pago con el ID proporcionado.');

        
        return PaymentMapper.toDomain(payment);
    }   
    
    public async getByOrderId(orderId: string): Promise<PaymentEntity | null> {
        
        const payment = await prisma.payment.findUnique({
            where: { orderId }
        });
        if (!payment) return null;

        return PaymentMapper.toDomain(payment);
    }

    async getByProviderPaymentId(providerPaymentId: string): Promise<PaymentEntity> {

        const payment = await prisma.payment.findFirst({
            where: { providerPaymentId }
        });
        if (!payment) throw new NotFoundError('No se encontró un pago con el ID de proveedor proporcionado.');
        
        return PaymentMapper.toDomain(payment);
    }

    public async create(payment: PaymentEntity): Promise<PaymentEntity> {
        
        const data = PaymentMapper.toPersistence(payment);

        const newPayment = await prisma.payment.create({ data });

        return PaymentMapper.toDomain(newPayment);
    }

    public async update(payment: PaymentEntity): Promise<PaymentEntity> {

        const data = PaymentMapper.toPersistence(payment);
        
        const updatedPayment = await prisma.payment.update({
            where: { id: payment.id! },
            data
        });

        return PaymentMapper.toDomain(updatedPayment);
    }
    
}
