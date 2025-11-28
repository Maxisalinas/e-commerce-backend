
import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validateInput(validationSchema: ZodType<any, any>, inputSource: 'body' | 'query' | 'params' | 'headers' | 'cookies') {
    
    return (req: Request, _res: Response, next: NextFunction) => {
        
        try {
            const inputParsed = validationSchema.parse(req[inputSource]);
            
            if (inputSource === 'params') {
                (req as any).paramsParsed = inputParsed;
            } else if (inputSource === 'query') {
                (req as any).queryParsed = inputParsed;
            } else if (inputSource === 'headers') {
                (req as any).headersParsed = inputParsed;
            } else if (inputSource === 'cookies') {
                (req as any).cookiesParsed = inputParsed;
            } else {
                (req as any).bodyParsed = inputParsed;
            }

            next();

        } catch (error) {
            next(error);
        }

    }
    
}
