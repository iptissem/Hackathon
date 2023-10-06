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

// Gestion de la connexion
app.post('/connexion', (req, res) => {
    const { mail_utilisateur, mdp_utilisateur } = req.body;

    const sql = 'SELECT * FROM UTILISATEUR WHERE mail_utilisateur = ? AND mdp_utilisateur = ?';
    const values = [mail_utilisateur, mdp_utilisateur];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion : ' + err.message);
            return res.status(500).send('Erreur lors de la connexion.');
        }

        if (results.length === 1) {
            return res.status(200).send('Connexion réussie');
        } else {
            return res.status(401).send('Identifiants incorrects');
        }
    });
});

// Servez les pages HTML
app.use(express.static('public')); // Assurez-vous que vos fichiers HTML sont dans un répertoire "public"

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});

  