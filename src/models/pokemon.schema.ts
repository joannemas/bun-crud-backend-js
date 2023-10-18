// pokemons.schema.ts
import { Document, Schema, model } from 'mongoose';

export interface IPokemon extends Document {
    name: string;
    type: string;
}

const schema = new Schema<IPokemon>(
{
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IPokemon>('Pokemon', schema);
