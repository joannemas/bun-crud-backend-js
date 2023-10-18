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
                    ID: ${pokemon._id} <br> Name: ${pokemon.name} <br> Type: ${pokemon.type}
                    <button class="updateButton" data-id="${pokemon._id}">Mettre à jour</button>
                    <button class="deleteButton" data-id="${pokemon._id}">Supprimer</button>
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

    // Fonction du bouton pour supprimer ou mettre à jour un Pokémon
    document.getElementById("pokemonList").addEventListener("click", (event) => {
        if (event.target.classList.contains("updateButton")) {
            const pokemonId = event.target.getAttribute("data-id");
            console.log(`Mise à jour du Pokémon avec l'identifiant ${pokemonId}`);
            
            const updatedData = prompt("Modifier le nom et le type du Pokémon (séparés par une virgule)");
            if (updatedData) {
                const [name, type] = updatedData.split(",");
                updatePokemon(pokemonId, name, type);
            }
        } else if (event.target.classList.contains("deleteButton")) {
            const pokemonId = event.target.getAttribute("data-id");
            console.log(`Suppression du Pokémon avec l'identifiant ${pokemonId}`);
            if (confirm("Voulez-vous vraiment supprimer ce Pokémon ?")) {
                deletePokemon(pokemonId);
            }
        }
    });
    

    // Fonction pour ajouter un nouveau Pokémon
    function addPokemon() {
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
                const { id } = data; // Extrait l'identifiant du Pokémon depuis la réponse
                console.log(`Nouveau Pokémon ajouté avec l'identifiant ${id}`);
                displayPokemons(); // Mettre à jour la liste des Pokémons après l'ajout            
            })            
            .catch((error) => {
                console.error(error.message);
            });
        }
    }
    

    // Fonction pour supprimer un Pokémon
    function deletePokemon(pokemonId) {
        if (!pokemonId) {
            console.error("ID du Pokémon non défini");
            return;
        }
    
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
            displayPokemons(); // Mettez à jour la liste des Pokémons après la suppression
        })
        .catch((error) => {
            console.error(error.message);
        });
    }    
        

    // Fonction pour mettre à jour un Pokémon
    function updatePokemon(pokemonId, name, type) {
        fetch(`/pokemons/${pokemonId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, type }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw Error("Erreur lors de la mise à jour du Pokémon");
            }
        })
        .then(() => {
            displayPokemons(); // Mettez à jour la liste des Pokémons après la mise à jour
        })
        .catch((error) => {
            console.error(error.message);
        });
    }

    // Associer des événements aux boutons
    document.getElementById("addPokemonButton").addEventListener("click", addPokemon);
    document.getElementById("deletePokemonButton").addEventListener("click", deletePokemon);
}, false);
