import { IsString } from 'class-validator';

export class CreateGroupWithContactsDto {
  @IsString()
  readonly groupName: string;
}
