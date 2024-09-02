import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { User } from '../users/entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { UploadController } from './upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Contact])],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
