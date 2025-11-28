export interface ProductFilter {
    page: number;
    limit: number;
    search: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
}
