import { Elysia, t } from 'elysia';
import User from '../models/user.schema';
import '../database/db.setup';

export const UserController = (app: Elysia) => {
    app
        .post('/users', async ({ set, body }: Elysia.Set) => {
            try {
                const { username, email, password } = body;
                const user = new User({ username, email, password });

                // Sauvegardez l'utilisateur dans la base de données
                await user.save();

                set.status = 201;
                return { message: 'Utilisateur créé avec succès' };
            } catch (error) {
                set.status = 500;
                return { error: 'Erreur lors de la création de l\'utilisateur' };
            }
        });
};