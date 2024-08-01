import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema, User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }, 
    }),

  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService,JwtAuthGuard],
  exports: [UsersService]
})
export class UsersModule {}
