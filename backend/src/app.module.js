"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const groups_module_1 = require("./groups/groups.module");
const contacts_module_1 = require("./contacts/contacts.module");
const user_entity_1 = require("./users/entities/user.entity");
const group_entity_1 = require("./groups/entities/group.entity");
const contact_entity_1 = require("./contacts/entities/contact.entity");
const login_module_1 = require("./login/login.module");

let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [user_entity_1.User, group_entity_1.Group, contact_entity_1.Contact],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, group_entity_1.Group, contact_entity_1.Contact]),
            users_module_1.UsersModule,
            groups_module_1.GroupsModule,
            contacts_module_1.ContactsModule,
            login_module_1.LoginModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
