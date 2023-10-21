import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { PokemonController } from './controllers/pokemons.controller';
import { UserController } from './controllers/users.controller';
import cors from '@elysiajs/cors';
import { verifyToken } from './auth/jwt.setup';
import { docsSetup } from './docs/docs';

const app = new Elysia();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(html());
app.use(docsSetup);

app.get('/', () => Bun.file('src/index.html').text());
app.get('/script.js', () => Bun.file('src/script.js').text());

app.get('/log', () => Bun.file('src/login.html').text());
app.get('/log.js', () => Bun.file('src/log.js').text());

PokemonController(app);
UserController(app);

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
