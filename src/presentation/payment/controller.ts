import { Request, Response } from 'express';
import type { CreatePaymentUseCase } from "../../application/payment/interfaces/create-payment-use-case.js";
import type { InitiatePaymentUseCase } from '../../application/payment/interfaces/initiate-payment.js';
import type { GetPaymentStatusUseCase } from '../../application/payment/interfaces/get-payment-status-use-case.js';
import type { ConfirmPaymentUseCase } from '../../application/payment/interfaces/confirm-payment-use-case.js';
import type { RefundPaymentUseCase } from '../../application/payment/interfaces/refund-payment-use-case.js';
import { CreatePaymentDTO } from "./dtos/input/create.js";
import { InitiatePaymentDTO } from './dtos/input/initiate.js';
import { CreatePaymentResponseDTO } from "./dtos/output/create-response.js";
import { InitiatePaymentResponseDTO } from './dtos/output/initiate-response.js';

export class PaymentController {

    constructor(
        private readonly createPaymentUseCase: CreatePaymentUseCase,
        private readonly initiatePaymentUseCase: InitiatePaymentUseCase,
        private readonly getPaymentStatusUseCase: GetPaymentStatusUseCase,
        private readonly confirmPaymentUseCase: ConfirmPaymentUseCase,
        private readonly refundPaymentUseCase: RefundPaymentUseCase
    ) {}


    public createPayment = async ( req: Request, res: Response ) => {

        const createPaymentDTO = new CreatePaymentDTO((req as any).bodyParsed);
        const payment: CreatePaymentResponseDTO = await this.createPaymentUseCase.execute(createPaymentDTO);
        return res.status(201).json(payment);
    }

    public initiatePayment = async ( req: Request, res: Response ) => {

        const paymentId: string = (req as any).paramsParsed.id;
        const initiatePaymentDTO = new InitiatePaymentDTO((req as any).bodyParsed);
        const response: InitiatePaymentResponseDTO = await this.initiatePaymentUseCase.execute(paymentId, initiatePaymentDTO);
        return res.status(200).json(response);
    }


    public getPaymentStatus = async ( req: Request, res: Response ) => {

        const paymentId: string = (req as any).paramsParsed.id;
        const response = await this.getPaymentStatusUseCase.execute(paymentId);
        return res.status(200).json(response);
    }

    public confirmInternalPayment = async ( req: Request, res: Response ) => {

        const paymentId: string = (req as any).paramsParsed.id;
        const response = await this.confirmPaymentUseCase.execute(paymentId);
        return res.status(200).json(response);
    }

    public confirmPaymentFromProvider = async (req: Request, res: Response) => {

        const providerPaymentId = ''; // TODO: verificar firma con middleware y extraer el ID.
        const response = await this.confirmPaymentUseCase.executeFromProvider(providerPaymentId);
        return res.status(200).json(response);

    }

    public refundPayment = async ( req: Request, res: Response ) => {

        const paymentId: string = (req as any).paramsParsed.id;
        await this.refundPaymentUseCase.execute(paymentId);
        return res.status(204).send();
    }


    
}