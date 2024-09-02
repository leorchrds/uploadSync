import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { Contact } from '../contacts/entities/contact.entity';
import * as XLSX from 'xlsx';
import * as path from 'path';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>,
  ) {}

  async createGroupWithContacts(groupName: string, contacts: any[]) {
    const group = await this.groupRepository.save({ name: groupName });

    for (const contact of contacts) {

      if (!contact.name || !contact.phone) {
        console.warn('Contato mal formatado:', contact);
        continue;
      }

      await this.contactRepository.save({
        name: contact.name,
        phone: contact.phone,
        group: group
      });
    }

    return group;
  }

  async getGroupById(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['contacts'], 
    });
    
    if (!group) {
      throw new NotFoundException(`Grupo com id ${id} não encontrado`);
    }

    return group;
  }

  async getAllGroups() {
    return this.groupRepository.find({ relations: ['contacts'] });
  }

  async processContactsFile(file: Express.Multer.File) {
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (fileExtension === '.xlsx') {
      return this.processXlsxFile(file.buffer);
    } else if (fileExtension === '.csv' || fileExtension === '.txt') {
      return this.processCsvOrTxtFile(file.buffer, fileExtension);
    } else {
      throw new BadRequestException('Formato de arquivo não suportado.');
    }
  }

  private async processXlsxFile(buffer: Buffer) {
    const workbook = XLSX.read(buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const contacts = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    return contacts.slice(1).map((row: any) => ({
      name: row[0] || 'Nome desconhecido',
      phone: row[1] || '',
    }));
  }

  private async processCsvOrTxtFile(buffer: Buffer, extension: string) {
    const fileContent = buffer.toString();
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');

    return lines.map(line => {
      const [name, phone] = line.split(',').map(part => part.trim());

      if (!name || !phone) {
        return null;
      }

      return {
        name: name || 'Nome desconhecido',
        phone: phone || '',
      };
    }).filter(contact => contact !== null);
  }
}
