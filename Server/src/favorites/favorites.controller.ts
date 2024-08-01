import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Req,Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';
import { Response } from 'express';


@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req:any, @Body() movie: any) {
    const userId = req.user.id;
    if (!userId) {
      return { message: 'User ID is required' }; 
    }
    return this.favoritesService.create(userId, movie,true);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.favoritesService.findAll(userId);
  }

  @Delete(':movieId')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Param('movieId') movieId: string) {
    return this.favoritesService.remove(req.user.userId, movieId);
  }
}
