import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './entities/favorite.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "jwt_secret", 
      signOptions: { expiresIn: '60m' }
    }),
    UsersModule
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtService,JwtAuthGuard]
})
export class FavoritesModule {}
