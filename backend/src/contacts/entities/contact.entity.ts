import { Group } from 'src/groups/entities/group.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true }) 
  phone: string;

  @ManyToOne(() => Group, (group) => group.contacts)
  group: Group;
}
