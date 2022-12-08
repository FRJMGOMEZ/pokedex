import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit:number;
  constructor( @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>, private readonly configService:ConfigService){
    this.defaultLimit = configService.getOrThrow<number>('defaultLimit'); 
  }
  async create(createPokemonDto: CreatePokemonDto) {
    try{
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch(error){
      this.handleDbExceptions(error);
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit=this.defaultLimit,offset=0} = paginationDto;
    return this.pokemonModel.find()
                  .limit(limit)
                  .skip(offset)
                  .sort({no:1})
                  .select('-__v')
  }

  async findOne(term: string):Promise<Pokemon>{
    let pokemon:Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no:term});
    } else if (isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }else{
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }
    if(!pokemon){
      throw new NotFoundException(`Pokemon with id, name or no "${term}" nor found`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try{
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    }catch(error){
      this.handleDbExceptions(error);
    } 
  }

  async remove(id: string) {
    const {deletedCount} = await this.pokemonModel.deleteOne({_id:id});
    if(deletedCount === 0){
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
  }

  private handleDbExceptions(error){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists in DB ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException('Can`t create pokemon, check server logs');
  }

}
