import { Request, Response } from 'express';
import type { GetManyProductsUseCase } from '../../application/product/use-cases/getmany.js';
import type { CreateProductUseCase } from '../../application/product/use-cases/create.js';
import type { GetProductByIdUseCase } from '../../application/product/use-cases/get-by-id.js';
import type { UpdateProductUseCase } from '../../application/product/use-cases/update.js';
import type { DeleteProductUseCase } from '../../application/product/use-cases/delete.js';
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
        const product: ProductResponseDTO = await this.getProductByIdUseCase.execute(id);
        return res.status(200).json(product);
    }

    public getMany = async ( req: Request, res: Response ) => {
        const getManyProductsDTO = new GetManyProductsDTO((req as any).queryParsed);
        const products: ProductResponseDTO[] = await this.getManyProductsUseCase.execute(getManyProductsDTO);
        return res.status(200).json(products);
    }

    public create = async ( req: Request, res: Response ) => {
        const createProductDTO = new CreateProductDTO((req as any).bodyParsed);
        const newProduct: ProductResponseDTO = await this.createProductUseCase.execute(createProductDTO);
        return res.status(201).json(newProduct);
    }

    public update = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        const updatedProductDTO = new UpdateProductDTO((req as any).bodyParsed);
        const updatedProduct: ProductResponseDTO = await this.updateProductUseCase.execute(id, updatedProductDTO);
        return res.status(200).json(updatedProduct);
    }
    
    public delete = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        await this.deleteProductUseCase.execute(id);
        return res.status(200).json({ message: 'Producto eliminado correctamente.' });
    }
    
}