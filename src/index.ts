import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { PokemonController } from './controllers/pokemons.controller';
import { UserController } from './controllers/users.controller';

const app = new Elysia();
const port = process.env.PORT || 3000;

app.use(html());

app
    .get('/', () => Bun.file('src/index.html').text())
    .get('/script.js', () => Bun.file('src/script.js').text())

// Montez votre contrôleur de Pokémon
PokemonController(app);
UserController(app);



app
    .get('/login', () => Bun.file('src/login.html').text())
    .get('/log.js', () => Bun.file('src/log.js').text());



app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
