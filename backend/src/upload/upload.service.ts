import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { Contact } from '../contacts/entities/contact.entity';
import csvParser from 'csv-parser';
import * as XLSX from 'xlsx';
import * as stream from 'stream';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async processFile(file: Express.Multer.File) {
    const mimeType = file.mimetype;
    let data;

    try {
      if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        data = await this.parseXlsx(file.buffer);
      } else if (mimeType === 'text/csv') {
        data = await this.parseCsv(file.buffer);
      } else if (mimeType === 'text/plain') {
        data = await this.parseTxt(file.buffer);
      } else {
        throw new Error('Unsupported file type');
      }

      const filteredContacts = data.contacts.filter(contact => contact.name && contact.phone);

      const validContacts = filteredContacts.map(contact => ({
        ...contact,
        phone: contact.phone || 'unknown', 
      }));

      await this.userRepository.save(data.users);
      await this.groupRepository.save(data.groups);
      await this.contactRepository.save(validContacts);

    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error('Error processing file');
    }
  }

  async parseXlsx(buffer: Buffer) {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const users = [];
      const groups = [];
      const contacts = [];

      jsonData.forEach((row: any[]) => {
        if (row.length >= 2) {
          const [name, phone] = row;
          if (name && phone) {
            const formattedPhone = this.formatNumber(phone.toString());
            contacts.push({ name, phone: formattedPhone });
          }
        }
      });

      return { users, groups, contacts };
    } catch (error) {
      console.error('Error parsing XLSX:', error);
      throw new Error('Error parsing XLSX');
    }
  }

  async parseCsv(buffer: Buffer) {
    return new Promise<{ users: any[], groups: any[], contacts: any[] }>((resolve, reject) => {
      const users = [];
      const groups = [];
      const contacts = [];

      const streamBuffer = new stream.PassThrough();
      streamBuffer.end(buffer);

      streamBuffer
        .pipe(csvParser({ separator: ',' }))
        .on('data', (row) => {
          const [name, phone] = Object.values(row);
          if (name && phone) {
            const formattedPhone = this.formatNumber(phone.toString());
            contacts.push({ name, phone: formattedPhone });
          }
        })
        .on('end', () => {
          resolve({ users, groups, contacts });
        })
        .on('error', (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        });
    });
  }

  async parseTxt(buffer: Buffer) {
    return new Promise<{ users: any[], groups: any[], contacts: any[] }>((resolve, reject) => {
      const users = [];
      const groups = [];
      const contacts = [];

      try {
        const data = buffer.toString();
        const lines = data.split('\n');

        lines.forEach(line => {
          const [name, phone] = line.split(',');
          if (name && phone) {
            const formattedPhone = this.formatNumber(phone);
            contacts.push({ name, phone: formattedPhone });
          }
        });

        resolve({ users, groups, contacts });
      } catch (error) {
        console.error('Error parsing TXT:', error);
        reject(error);
      }
    });
  }

  formatNumber(value: string) {
    const formattedValue = value.replace(/[^\d]/g, '');
    return formattedValue;
  }
}
