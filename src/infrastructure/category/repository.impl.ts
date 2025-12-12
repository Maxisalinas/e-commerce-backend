import { prisma } from "../database/postgres/prisma-client.js";
import { CategoryEntity } from "../../domain/category/entity.js";
import { CategoryRepository } from "../../domain/category/repository.js";
import { CategoryFilter } from "../../application/category/use-cases/getmany.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";

export class CategoryRepositoryImpl implements CategoryRepository {
    
    public async getById( id: number ): Promise<CategoryEntity> {
       
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        });
        if (!category) throw new NotFoundError('No se encontró una categoría con el número de ID proporcionado.');
        return CategoryEntity.fromObject(category);
        
    }
    
    public async getMany( filter: CategoryFilter ): Promise<CategoryEntity[]> {
        const categories = await prisma.category.findMany(); 
        return CategoryEntity.fromObjectList(categories);
    }

    public async create( category: CategoryEntity ): Promise<CategoryEntity> {
        const newCategory = await prisma.category.create({
            data: category
        });
        return CategoryEntity.fromObject(newCategory);
    }

    public async update(category: CategoryEntity): Promise<CategoryEntity> {
        
        const updated = await prisma.category.update({
            where: { id: category.id },
            data: {
                name: category.name,
            },
        });
        return CategoryEntity.fromObject(updated);
    }

    public async delete( id: number ): Promise<void> {
        await prisma.category.delete({
            where: { id }
        });
        return;
    }

}

