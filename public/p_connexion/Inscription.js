const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'paris_explorer.db',
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.message);
        return;
    }
    console.log('Connecté à la base de données MariaDB');
});

// Gestion de l'inscription
app.post('/inscription', (req, res) => {
    const {nom_utilisateur, prenom_utilisateur, mail_utilisateur, address_utilisateur, mdp_utilisateur, confirmation } = req.body;

    // Vérifiez si les mots de passe correspondent
    if (mot_de_passe !== confirmation) {
        return res.status(400).send('Les mots de passe ne correspondent pas.');
    }

    const sql = 'INSERT INTO UTILISATEUR (nom_utilisateur, prenom_utilisateur, mail_utilisateur, address_utilisateur, mdp_utilisateur) VALUES (?, ?, ?, ?, ?)';
    const values = [nom_utilisateur, prenom_utilisateur, mail_utilisateur, address_utilisateur, mdp_utilisateur];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ' + err.message);
            return res.status(500).send('Erreur lors de l\'inscription.');
        }
        console.log('Utilisateur enregistré avec succès, ID ' + result.insertId);
        return res.status(200).send('Inscription réussie.');
    });
});

// Servez les pages HTML
app.use(express.static('public')); // Assurez-vous que vos fichiers HTML sont dans un répertoire "public"

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});
