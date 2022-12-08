import { Injectable } from '@nestjs/common';
import { PokeapiResponse } from './interfaces/pokeapi-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>, private http:AxiosAdapter){}

  async executeSeed(){
    await this.pokemonModel.deleteMany({});
    const {results}  = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert:CreatePokemonDto[] = results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      return { name, no };
    }); 
    const pokemons = await this.pokemonModel.insertMany(pokemonToInsert);
    return pokemons;
  }
}
