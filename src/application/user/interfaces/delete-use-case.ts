export interface DeleteUserUseCase {
    execute(id: string): Promise<void>,
}
