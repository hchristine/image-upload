import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column({ name: 'qr_url', nullable: true })
    qrUrl: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column('varchar', { array: true })
    images: string[];

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({ name: 'user_id'})
    user: User;
}