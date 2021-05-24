/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: string;

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

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
