import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50, nullable: false, unique: true })
  userName: string;

  /**
   * Email
   */
  @Column("varchar", { nullable: false, unique: true })
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
}
