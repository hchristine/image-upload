import { Project } from "../../project/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Project, project => project.user)
    projects: Project[]
}