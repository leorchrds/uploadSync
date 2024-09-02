import { Controller, Post, Body, UploadedFile, UseInterceptors, BadRequestException, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GroupsService } from './groups.service';
import { CreateGroupWithContactsDto } from './dto/create-group-with-contacts.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('create-with-contacts')
  @UseInterceptors(FileInterceptor('file'))
  async createGroupWithContacts(
    @Body() body: CreateGroupWithContactsDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const contacts = await this.groupsService.processContactsFile(file);
      const group = await this.groupsService.createGroupWithContacts(body.groupName, contacts);
      return group;
    } catch (error) {
      console.error('Erro ao criar grupo e carregar contatos:', error);
      throw new BadRequestException('Erro ao criar grupo e carregar contatos.');
    }
  }

  @Get(':id')
  async getGroup(@Param('id') id: number) {
    return this.groupsService.getGroupById(id);
  }

  @Get()
  async getAllGroups() {
    return this.groupsService.getAllGroups();
  }
}
