import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository: Repository<User> = app.get('UserRepository');

  const password = await bcrypt.hash('testpassword', 10);

  const user = new User();
  user.email = 'testeuser@email.com';
  user.password = password;

  await userRepository.save(user);

  console.log('User seeded!');
  await app.close();
}

seed();
