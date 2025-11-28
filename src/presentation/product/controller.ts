import { Request, Response } from 'express';
import type { CreateProductUseCase } from '../../application/product/interfaces/create-use-case.js';
import type { DeleteProductUseCase } from '../../application/product/interfaces/delete-use-case.js';
import type { GetProductByIdUseCase } from '../../application/product/interfaces/get-by-id-use-case.js';
import type { GetManyProductsUseCase } from '../../application/product/interfaces/getmany-use-case.js';
import type { UpdateProductUseCase } from '../../application/product/interfaces/update-use-case.js';
import { GetManyProductsDTO } from './dtos/input/getmany.js';
import { ProductResponseDTO } from './dtos/output/response.js';
import { UpdateProductDTO } from './dtos/input/update.js';
import { CreateProductDTO } from './dtos/input/create.js';

export class ProductController {

    constructor(
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
        private readonly getManyProductsUseCase: GetManyProductsUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
    ){}
    
    public getById = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        const response: ProductResponseDTO = await this.getProductByIdUseCase.execute(id);
        return res.status(200).json(response);
    }

    public getMany = async ( req: Request, res: Response ) => {
        const getManyProductsDTO = new GetManyProductsDTO((req as any).queryParsed);
        const response: ProductResponseDTO[] = await this.getManyProductsUseCase.execute(getManyProductsDTO);
        return res.status(200).json(response);
    }

    public create = async ( req: Request, res: Response ) => {
        const createProductDTO = new CreateProductDTO((req as any).bodyParsed);
        const response: ProductResponseDTO = await this.createProductUseCase.execute(createProductDTO);
        return res.status(201).json(response);
    }

    public update = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        const updatedProductDTO = new UpdateProductDTO((req as any).bodyParsed);
        const response: ProductResponseDTO = await this.updateProductUseCase.execute(id, updatedProductDTO);
        return res.status(200).json(response);
    }
    
    public delete = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        await this.deleteProductUseCase.execute(id);
        const response = { message: 'Producto eliminado correctamente.' }
        return res.status(200).json(response);
    }
    
}