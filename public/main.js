document.addEventListener("DOMContentLoaded", function () {
    var destinationContainer = document.getElementById("destination-container");
    var filterForm = document.getElementById("filter-form");

    // Chemin vers le fichier JSON
    var jsonUrl = "evenements.json"; // Remplacez par le nom de votre fichier JSON

    // Stockez l'ensemble des données JSON une fois chargées
    var allData = [];

    // Chargement du fichier JSON
    fetch(jsonUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            allData = data; // Stockez toutes les données JSON

            // Fonction pour afficher les événements en fonction du filtre
            function displayFilteredEvents(motCle, categorie) {
                destinationContainer.innerHTML = ""; // Effacez le contenu actuel

                // Utilisez un compteur pour n'afficher que 20 événements
                var eventCount = 0;

                // Parcours des données JSON et création des éléments HTML
                allData.forEach(function (destination) {
                    // Vérifiez si le titre contient le mot-clé (ou si le mot-clé est vide)
                    var motCleMatch = motCle === '' || destination.title.toLowerCase().includes(motCle.toLowerCase());
                    // Vérifiez si au moins un tag correspond à la catégorie saisie (ou si la catégorie est vide)
                    var categorieMatch = categorie === '' || (destination.tags && destination.tags.some(tag => tag.includes(categorie)));

                    if (eventCount < 20 && motCleMatch && categorieMatch) {
                        var box = document.createElement("div");
                        box.classList.add("box");

                        var image = document.createElement("img");
                        image.src = destination.cover_url;
                        image.alt = destination.cover_alt;

                        var contentDiv = document.createElement("div");
                        contentDiv.classList.add("content");

                        var innerDiv = document.createElement("div");

                        var title = document.createElement("h4");
                        title.textContent = destination.title;

                        var leadText = document.createElement("p");
                        leadText.textContent = destination.lead_text;

                        var dateDescription = document.createElement("p");
                        dateDescription.textContent = destination.date_description;

                        var link = document.createElement("a");
                        link.href = "#";
                        link.textContent = "Lire Plus";

                        innerDiv.appendChild(title);
                        innerDiv.appendChild(leadText);
                        innerDiv.appendChild(dateDescription);
                        innerDiv.appendChild(link);

                        contentDiv.appendChild(innerDiv);

                        box.appendChild(image);
                        box.appendChild(contentDiv);

                        destinationContainer.appendChild(box);

                        eventCount++; // Incrémente le compteur d'événements affichés
                    }
                });
            }

            // Gestionnaire d'événements pour la soumission du formulaire
            filterForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Empêche la soumission du formulaire

                // Obtenez les valeurs des champs de texte
                var motCle = document.getElementById('mot-cle').value;
                var categorie = document.getElementById('categorie').value;

                // Appliquez le filtre avec les valeurs du formulaire
                displayFilteredEvents(motCle, categorie);
            });

            // Chargez initialement les 20 premiers événements
            displayFilteredEvents('', '');
        })
        .catch(function (error) {
            console.error("Une erreur s'est produite lors du chargement du JSON : " + error);
        });
});
