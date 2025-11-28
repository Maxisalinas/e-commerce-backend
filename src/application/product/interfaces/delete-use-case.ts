export interface DeleteProductUseCase {
    execute( id: number ): Promise<void>,
}
