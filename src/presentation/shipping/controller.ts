import { Request, Response } from 'express';
import type { CalculateShippingCostUseCase } from '../../application/shipping/interfaces/calculate-cost-use-case.js';
import { CalculateShippingCostDTO } from './dtos/input/calculate-cost.js';


export class ShippingController {

    constructor(
        private readonly calculateShippingCostUseCase: CalculateShippingCostUseCase,
    ){}
    

    public calculateCost = async ( req: Request, res: Response ) => {
        const calculateShippingCostDTO = new CalculateShippingCostDTO((req as any).bodyParsed);
        const costShipping: number = await this.calculateShippingCostUseCase.execute(calculateShippingCostDTO);
        
        return res.status(200).json({ cost: costShipping });
    }

}