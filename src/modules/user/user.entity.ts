import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({type: 'varchar', length: 100})
  firstName?: string;

  @Column({type: 'varchar', length: 100})
  lastName?: string;

  @Column({type: 'varchar', length: 100, unique: true })
  email?: string;

  @Column({type: 'varchar', length: 100, select: false })
  password?: string;

  @Column({type: 'varchar', length: 50, default: 'USER' })
  role?: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt?: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt?: Date;

}
