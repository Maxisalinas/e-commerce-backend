import { Request, Response } from 'express';
import { UserResponseDTO } from './dtos/output/response.js';
import type { GetUserByIdUseCase } from '../../application/user/interfaces/get-by-id-use-case.js';
import type { GetManyUsersUseCase } from '../../application/user/interfaces/getmany-use-case.js';
import type { RegisterUserUseCase } from '../../application/user/interfaces/register-use-case.js';
import type { UpdateUserUseCase } from '../../application/user/interfaces/update-use-case.js';
import type { DeleteUserUseCase } from '../../application/user/use-cases/delete.js';
import { GetManyUsersDTO } from './dtos/input/getmany.js';
import { RegisterUserDTO } from './dtos/input/register.js';
import { UpdateUserDTO } from './dtos/input/update.js';


export class UserController {

    constructor(
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly getManyUsersUseCase: GetManyUsersUseCase,
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ){}
    
    public getById = async ( req: Request, res: Response ) => {
        const id: string = (req as any).paramsParsed.id;
        const response: UserResponseDTO = await this.getUserByIdUseCase.execute(id);
        return res.status(200).json(response);
    }

    public getMany = async ( req: Request, res: Response ) => {
        const getManyUsersDTO = new GetManyUsersDTO((req as any).queryParsed);
        const response: UserResponseDTO[] = await this.getManyUsersUseCase.execute(getManyUsersDTO);
        return res.status(200).json(response);
    }

    public register = async ( req: Request, res: Response ) => {
        const registerUserDTO = new RegisterUserDTO((req as any).bodyParsed);
        const response: UserResponseDTO = await this.registerUserUseCase.execute(registerUserDTO);
        return res.status(201).json(response);
    }
    
    public update = async ( req: Request, res: Response ) => {
        const id: string = (req as any).paramsParsed.id;
        const updateUserDTO = new UpdateUserDTO((req as any).bodyParsed);
        const updatedUser: UserResponseDTO = await this.updateUserUseCase.execute(id, updateUserDTO);
        return res.status(200).json(updatedUser);
    }

    public delete = async ( req: Request, res: Response ) => {
        const id: string = (req as any).paramsParsed.id;
        await this.deleteUserUseCase.execute(id);
        const response = { message: 'Usuario eliminado correctamente.' }
        return res.status(200).json(response);
    }
    
}
