import { prisma } from "../database/postgres/prisma-client.js";
import type { CategoryRepository } from "../../domain/category/repository.js";
import { CategoryMapper } from "./mapper.js";
import { CategoryEntity } from "../../domain/category/entity.js";
import { CategoryFilter } from "../../application/category/use-cases/getmany.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";

export class CategoryRepositoryImpl implements CategoryRepository {
    
    public async getById(id: number): Promise<CategoryEntity> {
       
        const category = await prisma.category.findUnique({
            where: { id }
        });
        if (!category) throw new NotFoundError('No se encontró una categoría con el número de ID proporcionado.');
        
        return CategoryMapper.toDomain(category);     
    }
    
    public async getMany(filter: CategoryFilter): Promise<CategoryEntity[]> {

        const categories = await prisma.category.findMany(); 
       
        return CategoryMapper.toDomainFromList(categories);
    }
    
    public async create(category: CategoryEntity): Promise<CategoryEntity> {
        
        const data = CategoryMapper.toPersistence(category);

        const newCategory = await prisma.category.create({ data });

        return CategoryMapper.toDomain(newCategory);
    }


    public async update(category: CategoryEntity): Promise<CategoryEntity> {
        
        const updated = await prisma.category.update({
            where: { id: category.id! },
            data: { name: category.name },
        });

        return CategoryMapper.toDomain(updated);
    }

    public async delete( id: number ): Promise<void> {

        await prisma.category.delete({
            where: { id }
        });
        
        return;
    }

}

