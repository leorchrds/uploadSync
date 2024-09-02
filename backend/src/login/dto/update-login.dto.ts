import { IsNotEmpty } from 'class-validator';

export class UpdateLoginDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
