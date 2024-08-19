import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";

export const tenantModels = {
    userModel: {
        provide: 'USER_MODEL',
        useFactory: async (dataSource: DataSource) => {
            return dataSource.getRepository(User);
        },
        inject: ['TENANT_CONNECTION'],
    }
}