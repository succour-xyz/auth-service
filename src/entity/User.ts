import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User {
  /**
   * Constructor
   * @param id - Id
   * @param name - Name
   * @param email - Email
   * @param password - Password
   * @param createDate - CreatedDate
   */
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    createDate: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createDate = createDate;
  }

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
}
