import { InternalServerErrorException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { DataSource, DataSourceOptions } from "typeorm";

export const tenantConnectionProvider = {
    provide: 'TENANT_CONNECTION',
    useFactory: async (request): Promise<DataSource> => {
        const tenantId = request.tenantId;
        if (!tenantId) {
            throw new InternalServerErrorException('Tenha certeza de configurar o tenantsMiddleware no modulo desejado.');
        }
        
        const options: DataSourceOptions = {
            name: tenantId,
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'postgres',
            database: tenantId,
            entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
            synchronize: true,
        }

        const dataSource = new DataSource(options);
        return await dataSource.initialize()
        .catch(() => {
            throw new InternalServerErrorException('Erro ao conectar no banco de dados. Verifique os informados.');
        });
    },
    inject: [REQUEST],
    scope: Scope.REQUEST
}