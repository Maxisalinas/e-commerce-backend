export interface DeleteShippingMethodUseCase {
    execute(id: string): Promise<void>;
}
