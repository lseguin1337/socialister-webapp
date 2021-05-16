import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    BeforeInsert, BeforeUpdate
} from 'typeorm';

import { IsEmail, MaxLength, MinLength} from 'class-validator';

import { createHmac, randomBytes } from 'crypto';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      name: "email",
      type: "varchar",
      length: 180,
      unique: true
  })
  @IsEmail()
  @MaxLength(180, {
      message: "Email is too long"
  })
  email: string;

  @Column({
      name: "username",
      type: "varchar",
      length: 50,
      unique: true
  })
  @MinLength(3, {
      message: "Username is too short"
  })
  @MaxLength(50, {
      message: "Username is too long"
  })
  username: string;

  @Column({
    name: "roles",
    type: "simple-array",
  })
  roles: string[];

  @Column({
      name: "password",
      type: "varchar",
      length: 150
  })
  @Exclude()
  password: string;

  @Column({
      name: "salt",
      type: "varchar",
      length: 150
  })
  @Exclude()
  salt: string;

  @Column({
      name: "first_name",
      type: "varchar",
      length: 150,
      nullable: true
  })
  @MaxLength(150, {
      message: "First name is too long"
  })
  firstName: string;

  @Column({
      name: "last_name",
      type: "varchar",
      length: 150,
      nullable: true
  })
  @MaxLength(150, {
      message: "Last name is too long"
  })
  lastName: string;

  @Column({
      name: "display_name",
      type: "varchar",
      length: 150,
      nullable: true
  })
  @MaxLength(150, {
      message: "Display name is too long"
  })
  displayName: string;

  @Column({
      name: "created_at",
      type: "timestamp"
  })
  @CreateDateColumn()
  createdAt: Date;

  @Column({
      name: "updated_at",
      type: "timestamp"
  })
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(displayName?: string, 
              email?: string, 
              username?: string, 
              password?: string,
              salt?: string) {
      this.email = email;
      this.username = username;
      this.password = password;
      this.salt = salt;
      this.displayName = displayName;
  }

  @BeforeInsert()
  beforeCreate() {
      this.createdAt = new Date();
      this.updatedAt = this.createdAt;
      this.salt = User.generateSalt();
      this.password = User.hashPassword(this.salt, this.password);
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  static generateSalt() {
    return randomBytes(32).toString('hex');
  }

  static hashPassword(salt: string, unsafePassword: string) {
    return createHmac('sha256', salt)
      .update(unsafePassword)
      .digest('hex');
  }
}