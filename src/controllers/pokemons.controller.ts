import { Elysia, t } from 'elysia';
import Pokemon, { IPokemon } from '../models/pokemon.schema';
import '../database/db.setup';

export const PokemonController = (app: Elysia) => {
  app
    .get('/pokemons', async ({ set }: Elysia.Set) => {
      try {
        const pokemons = await Pokemon.find({});
        set.status = 200;
        return pokemons;
      } catch (error) {
        set.status = 500;
        return { error: 'Erreur lors de la récupération des Pokémons' };
      }
    })
    .post(
      '/pokemons',
      async ({ set, body }: Elysia.Set, handler: Elysia.Handler) => {
        try {
          const { name, type } = body;
          const newPokemon = new Pokemon({ name, type });
          // Après avoir sauvegardé le nouveau Pokémon
          const savedPokemon = await newPokemon.save();
          set.status = 201;

          // Ici, renvoyez l'identifiant dans la réponse
          return { id: savedPokemon._id, name: savedPokemon.name, type: savedPokemon.type };

        } catch (error) {
          set.status = 500;
          return { error: 'Erreur lors de la création du Pokémon' };
        }
      },
      {
        schema: {
          body: t.Object({
            name: t.String(),
            type: t.String(),
          }),
        },
      }
    )
    
    
    .put(
      '/pokemons/:id',
      async ({ set, params, body }: Elysia.Set) => {
        try {
          const { id } = params;
          const { name, type } = body;
          const updatedPokemon = await Pokemon.findByIdAndUpdate(id, { name, type }, { new: true });
          if (!updatedPokemon) {
            set.status = 404;
            return { error: 'Pokémon non trouvé' };
          } else {
            return updatedPokemon;
          }
        } catch (error) {
          set.status = 500;
          return { error: 'Erreur lors de la mise à jour du Pokémon' };
        }
      }
    )
    .delete(
      '/pokemons/:id',
      async ({ set, params }: Elysia.Set) => {
        try {
          const { id } = params;
          const deletedPokemon = await Pokemon.findByIdAndDelete(id);
          if (!deletedPokemon) {
            set.status = 404;
            return { error: 'Pokémon non trouvé' };
          } else {
            return { success: true };
          }
        } catch (error) {
          set.status = 500;
          return { error: 'Erreur lors de la suppression du Pokémon' };
        }
      }
    );
};
