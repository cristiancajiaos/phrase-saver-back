import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'phrases'})
export class Phrase {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  phrase: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
