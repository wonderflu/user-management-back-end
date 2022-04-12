// import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
// import { Department } from '../../department/entities/department.entity';

// @Entity({ name: 'picture' })
// export class Picture {
//   @ApiProperty({ example: '1', description: 'Primary Key' })
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ApiProperty({ description: 'Picture name' })
//   @Column({
//     name: 'name',
//     type: 'varchar',
//     nullable: true,
//   })
//   name: string;

//   @ApiProperty({ description: 'Picture path' })
//   @Column({
//     name: 'picture',
//     type: 'blob',
//     nullable: true,
//   })
//   picture: string;

//   @OneToOne(() => Department, (department) => department.picture, {
//     onDelete: 'CASCADE', // Cascade means that if the department gets deleted then this picture will get deleted as well.
//   })
//   department: Department;
// }
