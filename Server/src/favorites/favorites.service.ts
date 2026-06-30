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
  
  async findAll(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).exec();
  }

  async toogleFavorite(userId: string, movie: any,favorite: boolean = true): Promise<Favorite | {message:string}> {

    const movieInDb = await this.favoriteModel.findOne({userId, id:movie.id}).exec()

    if (movieInDb) {
      await this.favoriteModel.findByIdAndDelete(movieInDb._id);
      return {
        message: "Favorite removed"
      };
    }

    const newFavorite = new this.favoriteModel({
      userId,
      favorite,
      ...movie,
    });
    return newFavorite.save();
  }

}
