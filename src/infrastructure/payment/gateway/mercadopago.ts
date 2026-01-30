import { MercadoPagoConfig, Order } from 'mercadopago';
import type { PaymentGateway } from '../../../domain/payment/ports/gateway/gateway.js';
import { PaymentEntity, PaymentStatus } from '../../../domain/payment/entity.js';
import type { InitiateRequest, InitiateResponse, ConfirmResult } from '../../../domain/payment/ports/gateway/types.js';
import { InvalidRefundError } from '../../../domain/payment/errors/invalidRefundError.js';


export class MercadoPagoGateway implements PaymentGateway {

    private client: MercadoPagoConfig;
    private orderAPI: Order;

    constructor(accessToken: string) {
        this.client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
        this.orderAPI = new Order(this.client);
    }

    async initiatePayment(request: InitiateRequest): Promise<InitiateResponse> {

        const body = {
            type: 'online',
            processing_mode: 'automatic',
            total_amount: request.amount.toString(),
            external_reference: request.paymentId,
            payer: {
                email: request.payerEmail,
            },
            transactions: {
                payments: [
                    {
                        amount: request.amount.toString(),
                        payment_method: {
                            id: 'visa',
                            type: 'credit_card',
                            token: request.cardToken,
                            installments: 1,
                            statement_descriptor: 'maxi-e-commerce',
                        },
                    },
                ],
            },
        };

        const requestOptions = {
            idempotencyKey: request.idempotencyKey,
        };

        const response = await this.orderAPI.create({ body, requestOptions });

        return {
            providerPaymentId: response.id!,
        };

    }

    async confirmPayment(providerPaymentId: string): Promise<ConfirmResult> {
        
        const order = await this.orderAPI.get({ id: providerPaymentId });

        const payment = order.transactions?.payments?.[0];

        if (!payment) {
            return { status: PaymentStatus.PROCESSING };
        }

        if (payment.status === 'processed') {
            if (payment.status_detail === 'accredited') {
                return { status: PaymentStatus.PAID };
            }
            return { status: PaymentStatus.PROCESSING };
        }

        if (payment.status === 'cancelled') {
            if (payment.status_detail === 'expired') {
                return { status: PaymentStatus.EXPIRED };
            }

            return {
                status: PaymentStatus.FAILED,
                failureReason: payment.status_detail,
            };
        }

        if (payment.status === 'failed') {
            return {
                status: PaymentStatus.FAILED,
                failureReason: payment.status_detail,
            };
        }

        return { status: PaymentStatus.PROCESSING };
    }


    async refundPayment(payment: PaymentEntity, idempotencyKey: string): Promise<void> {

        if (payment.status !== PaymentStatus.PAID) throw new InvalidRefundError(`Solo se pueden reembolsar pagos PAID (actual: ${payment.status})`);

        await this.orderAPI.refund({
            id: payment.providerPaymentId!,
            requestOptions: { idempotencyKey },
        });

    }


}
