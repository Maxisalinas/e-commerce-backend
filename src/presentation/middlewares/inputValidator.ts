
import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validateInput(validationSchema: ZodType<any, any>, inputSource: 'body' | 'query' | 'params' ) {
    
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const inputParsed = validationSchema.parse(req[inputSource]);
            
            if (inputSource === 'params') {
                // Guarda en otro sitio, no en req.params
                (req as any).validatedParams = inputParsed;
            } else {
                req[inputSource] = inputParsed;
            }
            
            req[inputSource] = inputParsed;
            next();

        } catch (error) {
            next(error);
        }
    }
    
}
