import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    MONGODB:Joi.required(),
    PORT:Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(10)
})

/* 
pokemondb_user

mongodb+srv://pokemondb_user:Billyshears123@cluster0.iuktaly.mongodb.net/pokemondb
*/