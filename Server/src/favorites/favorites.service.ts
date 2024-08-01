import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite, FavoriteDocument } from './entities/favorite.entity';
import { Model } from 'mongoose';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) 
    private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async create(userId: string, movie: any): Promise<Favorite> {
    const newFavorite = new this.favoriteModel({
      userId,
      ...movie,
    });
    return newFavorite.save();
  }

  async findAll(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).exec();
  }

  async remove(userId: string, movieId: string): Promise<any> {
    return this.favoriteModel.deleteOne({ userId, movieId }).exec();
  }
}
