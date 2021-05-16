import { User } from "../users/user.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class AdminUser1621168618763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const admin = new User();
        admin.username = 'admin';
        admin.salt = User.generateSalt();
        admin.password = User.hashPassword(admin.salt, process.env.ADMIN_PASSWORD || 'admin');
        admin.email = process.env.ADMIN_EMAIL || 'admin@support.com';
        
        await queryRunner.query(`INSERT INTO "user" ("username", "password", "salt", "email", "roles") VALUES ($1, $2, $3, $4, $5)`, [
            admin.username,
            admin.password,
            admin.salt,
            admin.email,
            ['admin'],
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE "username" = ?`, ['admin']);
    }

}
