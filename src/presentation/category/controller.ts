import { Request, Response } from 'express';
import type { GetCategoryByIdUseCase } from '../../application/category/interfaces/get-by-id-use-case.js';
import type { GetManyCategoriesUseCase } from '../../application/category/interfaces/getmany-use-case.js';
import type { CreateCategoryUseCase } from '../../application/category/interfaces/create-use-case.js';
import type { UpdateCategoryUseCase } from '../../application/category/interfaces/update-use-case.js';
import type { DeleteCategoryUseCase } from '../../application/category/interfaces/delete-use-case.js';
import { CategoryResponseDTO } from './dtos/output/response.js';
import { GetManyCategoriesDTO } from './dtos/input/getmany.js';
import { CreateCategoryDTO } from './dtos/input/create.js';
import { UpdateCategoryDTO } from './dtos/input/update.js';


export class CategoryController {

    constructor( 
        private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
        private readonly getManyCategoriesUseCase: GetManyCategoriesUseCase,
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    ){}

    public getById = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        const response: CategoryResponseDTO = await this.getCategoryByIdUseCase.execute(id);
        
        return res.status(200).json(response);
    }

    public getMany = async ( req: Request, res: Response ) => {
        const getManyCategoriesDTO = new GetManyCategoriesDTO((req as any).queryParsed);
        const response: CategoryResponseDTO[] = await this.getManyCategoriesUseCase.execute(getManyCategoriesDTO);
        
        return res.status(200).json(response);
    }

    public create = async ( req: Request, res: Response ) => {
        const createCategoryDTO = new CreateCategoryDTO((req as any).bodyParsed);
        const response: CategoryResponseDTO = await this.createCategoryUseCase.execute(createCategoryDTO);
        
        return res.status(201).json(response);
    }
    
    public update = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        const updateCategoryDTO = new UpdateCategoryDTO((req as any).bodyParsed);
        const response: CategoryResponseDTO = await this.updateCategoryUseCase.execute(id, updateCategoryDTO);
        
        return res.status(200).json(response);
    }

    public delete = async ( req: Request, res: Response ) => {
        const id: number = (req as any).paramsParsed.id;
        await this.deleteCategoryUseCase.execute(id);
        const response = { message: 'Categoría eliminada correctamente.' }
        
        return res.status(200).json(response);
    }

}

