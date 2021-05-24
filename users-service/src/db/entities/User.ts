import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

/**
 * Entity User
 */
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: string;

  @Column()
  name!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  email!: string;

  @Column()
  location!: string;

  @Column()
  gender!: string;

  @Column()
  photo!: string;
}
