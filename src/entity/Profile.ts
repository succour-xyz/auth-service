import { IsEmail } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50, nullable: false, unique: true })
  userName: string;

  /**
   * Email
   */
  @Column("varchar", { nullable: false, unique: true, length: 40 })
  @IsEmail()
  email: string;
  /**
   * Photo
   */
  @Column("varchar", { nullable: true })
  photo: string;

  @Column("varchar", { nullable: true })
  gender: string;

  @Column("boolean", { nullable: true })
  isPremium: boolean;

  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  user: User;
}
