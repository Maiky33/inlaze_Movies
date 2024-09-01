import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from './entities/user.entity'
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';


type Tokens = { 
  access_token:string,
  refresh_token:string
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) 
  private userModel: Model<UserDocument>,
  private jwtSvc: JwtService
){}

  async create(createUserDto: CreateUserDto, @Res() res: Response){
    try{  
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      const newUser = new this.userModel({  
        ...createUserDto,
        password:hashedPassword
      })

      const user = await newUser.save()

      const {access_token, refresh_token} = await this.generateTokens(user)

      const cookieOptions:any = {
        httpOnly: true,
        secure: true, 
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      };
  
      res.cookie('token', access_token, cookieOptions);

      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
      
    }catch(error){ 
      console.log("error",error)
      throw new HttpException('Please check your credentials',HttpStatus.UNAUTHORIZED)
    }
  }

  async loginUser(email:string,password:string, @Res() res: Response){
    try{  
      const user = await this.userModel.findOne({email})
      const isPasswordValid = await bcrypt.compare(password,(user.password))

      if(!isPasswordValid){  
        throw new HttpException('Please check your credentials',HttpStatus.UNAUTHORIZED)
      }

      if(user && isPasswordValid){  
        const Payload = {sub: user._id, email: user.email, name:user.name}
        const {access_token,refresh_token} = await this.generateTokens(Payload)

        const cookieOptions:any = {
          httpOnly: true,
          secure: true, 
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000,
        };
    
        res.cookie('token', access_token, cookieOptions);

        return res.status(HttpStatus.OK).json({
          message: 'Login successful',
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        });
      }
      
    }catch(error){ 
      throw new HttpException('Please check your credentials',HttpStatus.UNAUTHORIZED)
    }
  }

  async logOut(@Res() res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return res.status(HttpStatus.OK).json({
      message: 'Logout successful',
    });
  }

  async reloginUser(@Res() res: Response){
    try {
      const userDatares:any = res.req.user
      const user = await this.userModel.findOne({email:userDatares.email})
      if (!user) {
        throw new HttpException('User not found',HttpStatus.UNAUTHORIZED)
      }

      const Payload = {sub: user._id, email: user.email, name:user.name}

      const {access_token, refresh_token} = await this.generateTokens(Payload)
  
      const cookieOptions:any = {
        httpOnly: true,
        secure: true, 
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      };
  
      res.cookie('token', access_token, cookieOptions);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });

    } catch (error) {
      console.log("error",error)
      throw new HttpException('Relogin failed',HttpStatus.UNAUTHORIZED)
    }
  }

  async refreshToken(refreshToken:string){ 
    try{  
      const user = this.jwtSvc.verify(refreshToken,{secret:'jwt_secret_refresh'})
      const Payload = {sub: user._id, email: user.email, name:user.name}

      const {access_token,refresh_token} = await this.generateTokens(Payload)

      return {  
        access_token,
        refresh_token,
        status:200,
        message: 'Refresh token successfully'
      }

    }catch(error){  
      throw new HttpException('Refresh Token Failed',HttpStatus.UNAUTHORIZED)
    }
  }

  private async generateTokens(user): Promise<Tokens>{ 
    const JwtPayload = {sub: user._id, email: user.email, name:user.name}

    const [access_token,refresh_token] = await Promise.all([  

      this.jwtSvc.signAsync(JwtPayload,{
        secret: process.env.JWT_SECRET || "jwt_secret",
        expiresIn: '1d'
      }),

      this.jwtSvc.signAsync(JwtPayload,{
        secret: process.env.JWT_SECRET_REFRESH || "jwt_secret_refresh",
        expiresIn: '7d'
      })

    ])

    return {  
      access_token,
      refresh_token
    }
  }

  async validateUser(token: string) {
    try {
      const payload = this.jwtSvc.verify(token, { secret: process.env.JWT_SECRET || "jwt_secret" });
      const user = await this.userModel.findOne({ email: payload.email });

      if (!user) {
        return null; // Usuario no encontrado
      }
      return user;
    } catch (error) {
      return null; // Token inválido
    }
  }

  private removePassword(user){ 

    const {password, ...rest} = user.toObject()
    return rest
  }

}
