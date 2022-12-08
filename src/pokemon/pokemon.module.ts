import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { CommonModule } from '../common/common.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, ConfigService],
  imports:[
   MongooseModule.forFeature([
       {
        name:Pokemon.name,
        schema:PokemonSchema
       },
    ]), 
   CommonModule
  ],
  exports:[MongooseModule]})
export class PokemonModule {}
