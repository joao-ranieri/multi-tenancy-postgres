import { BadRequestException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
    constructor() {}

    private readonly logger = new Logger(TenantsMiddleware.name);

    async use(req: Request, res: Response, next: NextFunction) {
        const tenantId = req.headers['x-tenant-id']?.toString();
        if (!tenantId) {
            throw new BadRequestException('X-TENANT-ID não informado.');
        }
        this.logger.log(`Tenant: ${tenantId}`);
        req['tenantId'] = tenantId;
        next();
    }    
}