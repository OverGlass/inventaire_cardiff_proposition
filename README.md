# Outil inventaire Automobiles avec Cardiff

## Présentation

- Pour faire un inventaire le client a besoin de faire une image figée du stock physique à une date précise, puis d'une deuxième image d'un stock physique précèdant à l'aide d'une date inférieure à la première.

- Ainsi, en comparant les deux images, l'entreprise peut comfirmer l'inventaire et évaluer les erreurs de saisies humaines dans Cardiff. Grace à un calcul simple, nous devons retrouver le même chiffre que nous détaillerons plus tard.

## Manipulation manuelle redondante à produire sur Cardiff pour parvenir à avoir les données pour une image

Pour les deux images :

- L'image du stock **initiale**, l'ancien inventaire **n-1** | nommé par **image_initial**

- L'image du stock **finale**, Inventaire actuel **n** | nommé par **image_final**

---

- Recherche du stock à une date pour avoir le **prix total du stock**
- Recherche du stock à une date pour avoir le **nombre total de vehicule du stock**
- Recherche des retraitements avec pour chaque le **_code TVA_**, le **_nombre d'entité_** ainsi que le **_prix total des toutes les entités_**

  - Les **FNP** (Factures Non Parvenues) en filtrant les **_véhicules sur parc_** par :
    - la **_date de facture d'achats_** **>** à la **_date du stock_**
    - la **_date de facture d'achats_** **=== null** à la **_date du stock_**
  - Les **CCA** en filtrant les véhicules **_véhicule hors parc_** par :
    - la **_date de facture d'achat_** **<** à la **_date du stock_**

---

Uniquement pour **image_final**

- Recherche des achats avec pour chaque le **code TVA**, le **_nombre d'entité_** ainsi que le **_prix total HT des toutes les entités_** avec comme période la **date de l'image_initial + 1 jour** à la **date de l'image_final**
- Les ventes avec pour chaque le **code TVA**, le **_nombre d'entité_** ainsi que le **_prix total HT des toutes les entités_** avec comme période la **date de l'image_initial + 1 jour** à la **date de l'image_final** avec comme particularité de prendre **la valeur des ventes en achats HT**

---

### Petit debrief

Pour retirer ces données sur Cardiff nous pouvont remarquer qu'avec seulement deux dates

- **Date de l'image_initial**
- **Date de l'image_final**

**Nous pouvons automatiser ce processus de manière algoritmique.**

Actuellement ches MCAutomobiles ce processus est fait manuellement et entré dans excel pour faire les calculs. Ce processus est à faire à chaque bilan/inventaire. Ce qui représente un grand nombre de manipulations.

## Le calcul à partir de ces données.

- Le but est de :
  - croiser les retraitements des deux images (CCA_initial + FNP_final - FNP_initial - CCA_final)
  - ajouter les achats de l'image_final
  - retirer les ventes de l'image_final
  - ajouter le total des vehicules de l'image-inital.
- Ce calcul permet en théorie de retrouver le même nombre que le prix total des véhicules de l'image_final. Et permet de valider l'inventaire proposé par Cardiff.
- Si non, il y a eu une erreur de saisie humaine dans Cardiff.
- Bien sur toutes les données et le calcul et leurs résultats doivent être afficher pour la validité de l'inventaire. Et permet aussi de pouvoir chercher les erreurs de saisies humaine dans Cardiff.

### Petit debrief

Encore une fois ceci peut totalement être automatisé de manière algoritmique en quelques lignes à partir des données des deux images.

### Pour plus de clareté

- J'ai codé le calcul (habituellement fait sur Excel) en TypeScript (Javascript Typé) à partir d'une prétendu sorti JSON de cardiff des données des images. Avec comme résultat une sorti en JSON (Pour l'exemple et faire simple, mais une exportation excel avec les formules VBA serai optimal.)
- Le fichier [Inventaire.ts](https://github.com/OverGlass/inventaire_cardiff_proposition/blob/master/Inventaire.ts) contient la class qui permet de faire le calcul.
- Le fichier [main.ts](https://github.com/OverGlass/inventaire_cardiff_proposition/blob/master/main.ts) execute le code et contient la structure de donnée souhaité pour l'exemple d'une sortie Cardiff
- Et le fichier [exportInventaire.json](https://github.com/OverGlass/inventaire_cardiff_proposition/blob/master/exportInventaire.json) contient le resultat du print/console.log de main.js
- Le fichier [exportInventaire.pdf](https://github.com/OverGlass/inventaire_cardiff_proposition/blob/master/exportInventaire.pdf) montre comment est présenté l'inventaire dans excel chez MCAutomobiles.
