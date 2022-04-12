import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Session as SessionData } from 'express-session';
import { LoginDto } from './dto/user.login.dto';
import { UserService } from './user.service';

@ApiTags('Authorization')
@Controller('api/v2/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Log in' })
  @Post('login')
  async login(
    @Session() session: SessionData,
    @Body() loginDto: LoginDto,
  ): Promise<void> {
    await this.userService.login(loginDto);
    return this.updateSession(session, loginDto);
  }

  @ApiOperation({ summary: 'Log out' })
  @Get('logout')
  logout(@Session() session: SessionData): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      session.destroy((error: Error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  private updateSession(session: SessionData, user: LoginDto): void {
    session.user = user.username;
    console.log(user);
    session.isAuthenticated = true;
  }
}
