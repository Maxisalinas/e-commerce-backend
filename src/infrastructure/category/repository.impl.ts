import { prisma } from "../database/postgres/prisma-client.js";
import { CategoryEntity } from "../../domain/category/entity.js";
import { CategoryRepository } from "../../domain/category/repository.js";
import { CategoryFilter } from "../../application/category/use-cases/getmany.js";
import { UpdateCategoryDTO } from "../../presentation/category/dtos/input/update.js";
import { NotFoundError } from "../errors/notFoundError.js";

export class CategoryRepositoryImpl implements CategoryRepository {
    
    public async getById( id: number ): Promise<CategoryEntity> {
       
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        });
        if (!category) throw new NotFoundError('No se encontró una categoría con el número de ID proporcionado.');
        const categoryEntity: CategoryEntity = CategoryEntity.fromObject(category);
        return categoryEntity;
    }
    
    public async getMany( filter: CategoryFilter ): Promise<CategoryEntity[]> {
        
        const categories = await prisma.category.findMany(); 
        const categoryEntities = CategoryEntity.fromObjectList(categories);
        return categoryEntities;
    }

    public async create( category: CategoryEntity ): Promise<CategoryEntity> {
        
        const newCategory = await prisma.category.create({
            data: category
        });
        const categoryEntity = CategoryEntity.fromObject(newCategory);
        return categoryEntity;
    }

    public async update(id: number, category: CategoryEntity, dto: UpdateCategoryDTO): Promise<CategoryEntity> {
        
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { 
                ...category,
                ...dto 
            }
        });
        return CategoryEntity.fromObject(updatedCategory);
    }

    public async delete( id: number ): Promise<void> {
        await this.getById(id);
        await prisma.category.delete({
            where: { id }
        });
        return;
    }

}

