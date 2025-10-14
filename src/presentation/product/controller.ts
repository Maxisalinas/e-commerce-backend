import { Request, Response } from 'express';
import { CreateProductDTO } from './dtos/input/create.js';
import { ProductResponseDTO } from './dtos/output/response.js';
import { GetManyProductsDTO } from './dtos/input/getmany.js';
import { GetManyProductsUseCase } from '../../application/product/use-cases/getmany.js';
import { CreateProductUseCase } from '../../application/product/use-cases/create.js';
import { GetProductByIdUseCase } from '../../application/product/use-cases/get-by-id.js';
import { UpdateProductDTO } from './dtos/input/update.js';
import { UpdateProductUseCase } from '../../application/product/use-cases/update.js';
import { DeleteProductUseCase } from '../../application/product/use-cases/delete.js';


export class ProductController {

    constructor(
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
        private readonly getManyProductsUseCase: GetManyProductsUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
    ){}
    
    public getById = async ( req: Request, res: Response ) => {
        const id: number = (req as any).validatedParams.id;
        const product: ProductResponseDTO = await this.getProductByIdUseCase.execute(id);
        return res.status(200).json(product);
    }

    public getMany = async ( req: Request, res: Response<ProductResponseDTO[]> ) => {
        const getManyProductsDTO: GetManyProductsDTO = req.query as unknown as GetManyProductsDTO;
        const products: ProductResponseDTO[] = await this.getManyProductsUseCase.execute(getManyProductsDTO);
        return res.status(200).json(products);
    }

    public create = async ( req: Request, res: Response<ProductResponseDTO> ) => {
        const createProductDTO: CreateProductDTO = req.body;
        const newProduct: ProductResponseDTO = await this.createProductUseCase.execute(createProductDTO);
        return res.status(201).json(newProduct);
    }

    public update = async ( req: Request, res: Response ) => {
        const id: number = (req as any).validatedParams.id;
        const updateProductDTO: UpdateProductDTO = req.body;
        const updatedProduct: ProductResponseDTO = await this.updateProductUseCase.execute(id, updateProductDTO);
        return res.status(200).json(updatedProduct);
    }
    public delete = async ( req: Request, res: Response ) => {
        const id: number = (req as any).validatedParams.id;
        await this.deleteProductUseCase.execute(id);
        return res.status(200).json({ message: 'Producto eliminado correctamente.' });
    }
}
