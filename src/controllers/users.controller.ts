import { Elysia, t } from 'elysia';
import User from '../models/user.schema';
import '../database/db.setup';
import { createToken } from '../auth/jwt.setup';

export const UserController = (app: Elysia) => {
    app.post('/users', async ({ set, body }: Elysia.Set) => {
        try {
            const { username, email, password } = body;

            const hashedPassword = await Bun.password.hash(password);

            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            set.status = 201;
            return { message: 'Utilisateur créé avec succès' };
        } catch (error) {
            set.status = 500;
            return { error: 'Erreur lors de la création de l\'utilisateur' };
        }
    });

    app.post('/login', async ({ set, body }: Elysia.Set) => {
        try {
            const { username, password } = body;
            const user = await User.findOne({ username });
    
            if (!user) {
                set.status = 401;
                return { message: 'Nom d\'utilisateur incorrect.' };
            }
    
            // Utilisez Bun pour vérifier si le mot de passe entré correspond à celui stocké dans la base de données.
            const passwordMatch = await Bun.password.verify(password, user.password);
    
            if (!passwordMatch) {
                set.status = 401;
                return { message: 'Mot de passe incorrect.' };
            }
    
            const token = createToken(user); // Créez un token JWT
            set.status = 200;
            return { message: 'Connexion réussie', success: true, token };
        } catch (error) {
            set.status = 500;
            return { error: 'Erreur lors de la connexion' };
        }
    });
    
};
