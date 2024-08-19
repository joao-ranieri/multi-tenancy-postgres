import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantsMiddleware } from '../../middlewares/tenants.middleware';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { tenantConnectionProvider } from '../../providers/tenant-connection.provider';
import { tenantModels } from 'src/providers/tenant-models.provider';

@Module({
    imports: [],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        tenantConnectionProvider,
        tenantModels.userModel
    ],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TenantsMiddleware).forRoutes(UserController);
    }
}
