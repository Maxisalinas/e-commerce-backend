import { Request, Response } from 'express';;
import { CategoryResponseDTO } from './dtos/output/response.js';
import { GetManyCategoriesDTO } from './dtos/input/getmany.js';
import { CreateCategoryDTO } from './dtos/input/create.js';
import { UpdateCategoryDTO } from './dtos/input/update.js';
import { GetCategoryByIdUseCase } from '../../application/category/use-cases/get-by-id.js';
import { GetManyCategoriesUseCase } from '../../application/category/use-cases/getmany.js';
import { CreateCategoryUseCase } from '../../application/category/use-cases/create.js';
import { UpdateCategoryUseCase } from '../../application/category/use-cases/update.js';
import { DeleteCategoryUseCase } from '../../application/category/use-cases/delete.js';


export class CategoryController {

    constructor( 
        private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
        private readonly getManyCategoriesUseCase: GetManyCategoriesUseCase,
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase
    ){}

    public getById = async ( req: Request, res: Response ) => {
        const id: number = (req as any).validatedParams.id;
        const category: CategoryResponseDTO = await this.getCategoryByIdUseCase.execute(id);
        return res.status(200).json(category);
    }

    public getMany = async ( req: Request, res: Response<CategoryResponseDTO[]> ) => {
        const getManyCategoriesDTO: GetManyCategoriesDTO = req.query as unknown as GetManyCategoriesDTO;
        const categories: CategoryResponseDTO[] = await this.getManyCategoriesUseCase.execute(getManyCategoriesDTO);
        return res.status(200).json(categories);
    }

    public create = async ( req: Request, res: Response<CategoryResponseDTO> ) => {
        const createCategoryDTO: CreateCategoryDTO = req.query as unknown as CreateCategoryDTO;
        const newCategory: CategoryResponseDTO = await this.createCategoryUseCase.execute(createCategoryDTO);
        return res.status(201).json(newCategory);
    }
    public update = async ( req: Request, res: Response ) => {
        const id: number = (req as any).validatedParams.id;
        const updateCategoryDTO: UpdateCategoryDTO = req.body;
        const updatedCategory: CategoryResponseDTO = await this.updateCategoryUseCase.execute(id, updateCategoryDTO);
        return res.status(200).json(updatedCategory);
    }
    public delete = async ( req: Request, res: Response ) => {
        const id: number = (req as any).validatedParams.id;
        await this.deleteCategoryUseCase.execute(id);
        return res.status(200).json({ message: 'Categoría eliminada correctamente.' });
    }

}

