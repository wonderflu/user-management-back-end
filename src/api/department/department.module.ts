import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
// import { Picture } from '../picture/entities/picture.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])], // , Picture
  controllers: [DepartmentController],
  providers: [DepartmentService, UserService],
})
export class DepartmentModule {}
