console.log("script.js chargé");

window.addEventListener("DOMContentLoaded", function () {
    // Fonction pour afficher la liste des Pokémons
    function displayPokemons() {
        fetch("/pokemons", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Erreur lors de la récupération des Pokémons");
            }
        })
        .then((pokemons) => {
            const pokemonList = document.getElementById("pokemonList");
            pokemonList.innerHTML = "";
            pokemons.forEach((pokemon) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ID: ${pokemon.id} <br> Name: ${pokemon.name} <br> Type: ${pokemon.type}
                `;
                pokemonList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error(error.message);
        });
    }

    // Appeler la fonction pour afficher la liste des Pokémons au chargement de la page
    displayPokemons();

    // Fonction pour ajouter un nouveau Pokémon
    function addPokemon() {
        console.log("Ajout d'un nouveau Pokémon");
        const newPokemon = prompt("Entrez le nom et le type du Pokémon (séparés par une virgule)");
        if (newPokemon) {
            const [name, type] = newPokemon.split(",");
            fetch("/pokemons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, type }),
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Erreur lors de l'ajout du Pokémon");
                }
            })
            .then((data) => {
                const {id } = data.id; // Extrait l'identifiant du Pokémon depuis la réponse
                console.log(`Nouveau Pokémon ajouté avec l'identifiant ${id}`);
                displayPokemons(); // Mettre à jour la liste des Pokémons après l'ajout
            })
            .catch((error) => {
                console.error(error.message);
            });
        }
    }

    // Fonction pour supprimer un Pokémon
    function deletePokemon() {
        const pokemonId = prompt("Entrez l'ID du Pokémon à supprimer");
        if (pokemonId) {
            fetch(`/pokemons/${pokemonId}`, {
                method: "DELETE",
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error("Erreur lors de la suppression du Pokémon");
                }
            })
            .then(() => {
                displayPokemons(); // Mettre à jour la liste des Pokémons après la suppression
            })
            .catch((error) => {
                console.error(error.message);
            });
        }
    }

    // Associer des événements aux boutons
    document.getElementById("addPokemonButton").addEventListener("click", addPokemon);
    document.getElementById("deletePokemonButton").addEventListener("click", deletePokemon);
}, false);
