document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const messageReg = document.getElementById('messageReg');

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
            messageReg.textContent = data.message; // Affichez un message de succès
        })
        .catch((error) => {
            messageReg.textContent = error.message; // Affichez un message d'erreur
        });
    });

    const loginForm = document.getElementById('loginForm');
    const messageLog = document.getElementById('messageLog');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('usernameLog').value;
        const password = document.getElementById('passwordLog').value;

        // Envoyez les données de connexion au serveur.
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Erreur lors de la connexion');
            }
        })
        .then((data) => {
            if (data.success) {
                // Username et password valide, poursuivez le processus de connexion.
                window.location.href = '/'; // Redirigez vers la page d'accueil (vous pouvez spécifier l'URL souhaitée).
            } else {
                messageLog.textContent = data.message; // Affichez un message d'erreur
            }
        })
        .catch((error) => {
            console.error('Erreur de connexion :', error);
            // En cas d'erreur lors de la connexion, affichez un message d'erreur.
            messageLog.textContent = 'Erreur lors de la connexion';
        });
    });
});