import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'; // Importe JwtModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { ContactsModule } from './contacts/contacts.module';
import { LoginModule } from './login/login.module';
import { User } from './users/entities/user.entity';
import { Group } from './groups/entities/group.entity';
import { Contact } from './contacts/entities/contact.entity';
import { Login } from './login/entities/login.entity';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Group, Contact, Login],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Group, Contact, Login]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '60m' }, 
    }),
    UsersModule,
    GroupsModule,
    ContactsModule,
    LoginModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
