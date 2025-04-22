import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity()
// @Unique(["url"])
export class ShortURL {
  @PrimaryColumn({ type: "text" })
  public id!: string;

  @Column({ type: "text" })
  public url!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
