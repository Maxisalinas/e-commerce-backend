import { Request, Response } from "express";
import type { AddCartItemUseCase } from "../../application/cart/interfaces/add-item-use-case.js";
import type { RemoveCartItemUseCase } from "../../application/cart/interfaces/remove-item-use-case.js";
import type { GetCartByIdUseCase } from "../../application/cart/interfaces/get-by-id-use-case.js";
import type { GetCartByUserIdUseCase } from "../../application/cart/interfaces/get-by-user-id-use-case.js";
import type { UpdateCartItemUseCase } from "../../application/cart/interfaces/update-item-use-case.js";
import type { ClearCartUseCase } from "../../application/cart/interfaces/clear-use-case.js";
import { AddCartItemDTO } from "./dtos/input/add-item.js";
import { CartResponseDTO } from "./dtos/output/response.js";
import { UpdateCartItemDTO } from "./dtos/input/update-item.js";

export class CartController {

    constructor(
        private readonly getCartByIdUseCase: GetCartByIdUseCase,
        private readonly getCartByUserIdUseCase: GetCartByUserIdUseCase,
        private readonly clearCartUsecase: ClearCartUseCase,
        private readonly addCartItemUseCase: AddCartItemUseCase,
        private readonly updateCartItemUseCase: UpdateCartItemUseCase,
        private readonly removeCartItemUseCase: RemoveCartItemUseCase,
    ){}

    public getById = async ( req: Request, res: Response ) => {
        const cartId: string = (req as any).paramsParsed.id;
        const cart: CartResponseDTO = await this.getCartByIdUseCase.execute(cartId);
        return res.status(200).json(cart);
    }

    public getByUserId = async ( req: Request, res: Response ) => {
        const userId: string = (req as any).payload.id;
        const cart: CartResponseDTO = await this.getCartByUserIdUseCase.execute(userId);
        return res.status(200).json(cart);
    }

    public clear = async ( req: Request, res: Response ) => {
        const cartId: string = (req as any).paramsParsed.id;
        const cart: CartResponseDTO = await this.clearCartUsecase.execute(cartId);
        return res.status(200).json(cart);
    }

    public addItem = async ( req: Request, res: Response ) => {
        const userId: string = (req as any).payload.id;
        const addCartItemDTO = new AddCartItemDTO((req as any).bodyParsed);
        const cart: CartResponseDTO = await this.addCartItemUseCase.execute(userId, addCartItemDTO);
        return res.status(201).json(cart);
    }
  
    public updateItem = async ( req: Request, res: Response ) => {
        const itemId: string = (req as any).paramsParsed.id;
        const updateCartItemDTO = new UpdateCartItemDTO((req as any).bodyParsed);
        const cart: CartResponseDTO = await this.updateCartItemUseCase.execute(itemId, updateCartItemDTO);
        return res.status(200).json(cart);
    }
    
    public removeItem = async ( req: Request, res: Response ) => {
        const itemId: string = ((req as any).paramsParsed.id);
        const cart: CartResponseDTO = await this.removeCartItemUseCase.execute(itemId);
        return res.status(200).json(cart);
    }

}