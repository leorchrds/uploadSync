import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const contact = await this.contactsService.create(createContactDto);
      return contact;
    } catch (error) {
      throw new HttpException('Error creating contact', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.contactsService.findAll();
    } catch (error) {
      throw new HttpException('Error fetching contacts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const contact = await this.contactsService.findOne(+id);
      if (!contact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return contact;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    try {
      const updatedContact = await this.contactsService.update(+id, updateContactDto);
      return updatedContact;
    } catch (error) {
      throw new HttpException('Error updating contact', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.contactsService.remove(+id);
      return { message: 'Contact deleted successfully' };
    } catch (error) {
      throw new HttpException('Error deleting contact', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.uploadService.processFile(file);
      return { message: 'File uploaded and processed successfully' };
    } catch (error) {
      throw new HttpException('Error processing file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
