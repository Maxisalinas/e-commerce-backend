import type { OrderRepository } from "../../../domain/order/repository.js";
import type { PaymentRepository } from "../../../domain/payment/repository.js";
import type { CreatePaymentUseCase } from "../interfaces/create-payment-use-case.js";
import { PaymentEntity } from "../../../domain/payment/entity.js";
import { OrderStatus } from "../../../domain/order/entity.js";
import { CreatePaymentDTO } from "../../../presentation/payment/dtos/input/create.js";
import { CreatePaymentResponseDTO } from "../../../presentation/payment/dtos/output/create-response.js";
import { InvalidOrderStateError } from "../../../domain/order/errors/invalidOrderStateError .js";
import { PaymentAlreadyExistsError } from "../../../domain/payment/errors/paymentAlreadyExistError.js";


export class CreatePayment implements CreatePaymentUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly orderRepository: OrderRepository,
    ) {}

    public async execute(createPaymentDTO: CreatePaymentDTO): Promise<CreatePaymentResponseDTO> {

        const order = await this.orderRepository.getById(createPaymentDTO.orderId);
        if (order.status !== OrderStatus.PENDING) throw new InvalidOrderStateError(order.status);

        const existingPayment = await this.paymentRepository.getByOrderId(order.id!);
        if (existingPayment) throw new PaymentAlreadyExistsError(`Ya existe un pago para el pedido ${order.id!}`);

        const paymentAmount = order.totalAmount;

        const payment = PaymentEntity.create({
            orderId: order.id!,
            amount: paymentAmount, 
            method: createPaymentDTO.method,
            last4: createPaymentDTO.last4,
        });

        const newPayment = await this.paymentRepository.create(payment);

        return CreatePaymentResponseDTO.fromEntity(newPayment);
    }


}
