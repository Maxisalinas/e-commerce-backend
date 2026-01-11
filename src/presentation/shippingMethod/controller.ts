import { Request, Response } from 'express';
import type { AddShippingMethodUseCase } from '../../application/shippingMethod/interfaces/add-method-use-case.js';
import type { DeleteShippingMethodUseCase } from '../../application/shippingMethod/interfaces/delete-method-use-case.js';
import type { GetActiveShippingMethodsUseCase } from '../../application/shippingMethod/interfaces/get-active-methods-use-case.js';
import type { GetShippingMethodByIdUseCase } from '../../application/shippingMethod/interfaces/get-method-by-id-use-case.js';
import type { UpdateShippingMethodUseCase } from '../../application/shippingMethod/interfaces/update-method-use-case.js';
import { AddShippingMethodDTO } from './dtos/input/add-method.js';
import { UpdateShippingMethodDTO } from './dtos/input/update-method.js';
import { ShippingMethodResponseDTO } from './dtos/output/method-response.js';


export class ShippingMethodController {

    constructor(
        private readonly addShippingMethodUseCase: AddShippingMethodUseCase,
        private readonly getShippingMethodByIdUseCase: GetShippingMethodByIdUseCase,
        private readonly getActiveShippingMethodsUseCase: GetActiveShippingMethodsUseCase,
        private readonly updateShippingMethodUseCase: UpdateShippingMethodUseCase,
        private readonly deleteShippingMethodUseCase: DeleteShippingMethodUseCase,
    ){}
    
    public addMethod = async ( req: Request, res: Response ) => {
        const addShippingMethodDTO = new AddShippingMethodDTO((req as any).bodyParsed);
        const newShippingMethod: ShippingMethodResponseDTO = await this.addShippingMethodUseCase.execute(addShippingMethodDTO);
        
        return res.status(201).json(newShippingMethod);
    }

    public getMethodById = async ( req: Request, res: Response ) => {
        const id: string = (req as any).paramsParsed.id;
        const shippingMethod: ShippingMethodResponseDTO = await this.getShippingMethodByIdUseCase.execute(id);
        
        return res.status(200).json(shippingMethod);
    }


    public getActiveMethods = async ( req: Request, res: Response ) => {
        const activeMethods: ShippingMethodResponseDTO[] = await this.getActiveShippingMethodsUseCase.execute();
        
        return res.status(200).json(activeMethods);
    }

    
    public updateMethod = async ( req: Request, res: Response ) => {
        const id: string = (req as any).paramsParsed.id;
        const updateShippingMethodDTO = new UpdateShippingMethodDTO((req as any).bodyParsed);
        const updatedShippingMethod: ShippingMethodResponseDTO = await this.updateShippingMethodUseCase.execute(id, updateShippingMethodDTO);
        
        return res.status(200).json(updatedShippingMethod);
    }

        
    public deleteMethod = async ( req: Request, res: Response ) => {
        const id: string = (req as any).paramsParsed.id;
        await this.deleteShippingMethodUseCase.execute(id);
        const response = { message: 'Metodo de envío eliminado correctamente.' }
        
        return res.status(200).json(response);
    }


}