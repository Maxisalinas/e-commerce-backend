export interface DeleteCategoryUseCase {
    execute( id: number ): Promise<void>,
}

