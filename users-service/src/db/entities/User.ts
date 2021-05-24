/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

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

  @Column({ nullable: true })
  location: string;

  @Column()
  gender!: string;

  @Column({ nullable: true })
  photo: string;
}
