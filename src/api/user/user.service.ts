import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager, EntityNotFoundError, getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { ExceptionMessage } from 'src/exceptions/message.exception';

@Injectable()
export class UserService {
  async login(loginDto: LoginDto): Promise<void> {
    const { username, password } = loginDto;
    let foundUser = null;

    try {
      foundUser = await this.findByUsername(username);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new UnauthorizedException(ExceptionMessage.INVALID_USERNAME);
      }
      throw new e();
    }

    const verifiedPassword = await bcrypt.compare(password, foundUser.password);
    if (!verifiedPassword) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_PASSWORD);
    }
  }

  findById(id: number): Promise<User> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(User, id);
    });
  }

  findByUsername(username: string): Promise<User> {
    return getConnection().transaction((entityManager: EntityManager) => {
      return entityManager.findOneOrFail(User, {
        username,
      });
    });
  }
}
