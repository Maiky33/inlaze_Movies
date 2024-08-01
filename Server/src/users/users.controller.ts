import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Res() res:Response) {
    return this.usersService.create(createUserDto, res);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto, @Res() res:Response) {
    const {email, password} = createUserDto
    return this.usersService.loginUser(email,password,res);
  }

  @Get('relogin')
  @UseGuards(JwtAuthGuard)
  relogin(@Res() res:Response) {
    return this.usersService.reloginUser(res);
  }

  @Post('refresh')
  refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || []
    return this.usersService.refreshToken(token);
  }
}
