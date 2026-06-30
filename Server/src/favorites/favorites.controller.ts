import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Req,Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';


@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('toggleFavorite')
  @UseGuards(JwtAuthGuard)
  toogleFavorite(@Req() req:any, @Body() movie: any) {
    const userId = req.user.id;
    if (!userId) {
      return { message: 'User ID is required' }; 
    }
    return this.favoritesService.toogleFavorite(userId, movie,true);
  }

  @Get('allFavorites')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    const userId = req.user.id;
    if(!userId) return { message: 'No one is logged in or the user was not found' }
    return this.favoritesService.findAll(userId);
  }

}
