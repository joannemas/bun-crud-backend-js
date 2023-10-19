console.log('log.js chargé');

document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Envoyez les données du formulaire au serveur pour la création d'un utilisateur.
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Erreur lors de la création de l\'utilisateur');
            }
        })
        .then((data) => {
            message.textContent = data.message; // Affichez un message de succès
        })
        .catch((error) => {
            message.textContent = error.message; // Affichez un message d'erreur
        });
    });
});
