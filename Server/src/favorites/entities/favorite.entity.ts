import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  id: number;
  
  @Prop({default: true})
  favorite:boolean

  @Prop()
  title: string;

  @Prop()
  overview: string;

  @Prop()
  poster_path: string;

  @Prop()
  backdrop_path: string;

  @Prop()
  release_date: string;

  @Prop()
  vote_average: number;

  @Prop()
  vote_count: number;

  @Prop()
  genre_ids: number[];

}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);