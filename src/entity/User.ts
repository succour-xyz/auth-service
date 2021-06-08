import { IsEmail, Length } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  /**
   * Number
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name
   */
  @Column("varchar", { length: 50, nullable: false })
  name: string;

  /**
   * Email
   */
  @Column("varchar", { nullable: false, unique: true })
  @IsEmail()
  email: string;

  /**
   * Password
   */
  @Column("varchar", { nullable: false, length: 150 })
  @Length(8, 150)
  password: string;

  /**
   * Created Date
   */
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;
  /**
   *
   * @type {Profile} - One to One Profile relation
   * @memberof User
   */
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
