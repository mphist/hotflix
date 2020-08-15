import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("mylist")
export class MyList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("int")
  show_id: number;

  @Column("varchar")
  show_name: string;
}
