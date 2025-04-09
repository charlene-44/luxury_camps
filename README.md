# luxury_camps

Ce projet est une application full-stack intégrant un backend en Java avec Spring Boot et un frontend développé en Angular.

---

### Aperçu du Backend

Le backend du projet _luxury_camps_, est développée en Java avec Spring Boot (version 3.4.3) et s’appuie sur Spring Data JPA pour gérer les interactions avec une base de données MySQL. Son objectif principal est de centraliser et d’exposer les données relatives aux meubles via une API REST.

---

### Technologies Utilisées

- **Java & Spring Boot**  
  Le projet est construit sur Spring Boot, offrant une configuration simplifiée et une intégration fluide avec l’écosystème Spring. L’application démarre via le point d’entrée défini dans `BackendApplication.java`, qui intègre notamment la gestion des variables d’environnement grâce à DotenvPropertySource pour injecter dynamiquement les paramètres de connexion à la base de données.

- **Spring Data JPA**  
  Grâce à Spring Data JPA, l’accès aux données est facilité par l’utilisation de repositories (ex. : `FurnitureRepository`), permettant des opérations CRUD simplifiées sur les entités.

- **MySQL**  
  La base de données, dont le nom est défini dans la configuration (via des variables d’environnement dans `application.properties`), stocke les informations sur les meubles et leurs caractéristiques.

- **Gestion des Dépendances**  
  Le projet utilise Gradle pour la gestion des dépendances et la compilation, assurant une configuration propre et évolutive.

---

### Architecture et Fonctionnalités

#### Organisation en Packages

Le code est structuré en plusieurs packages distincts (models, services, controllers, dtos, enums, converters, errors), favorisant la séparation des préoccupations et la maintenabilité de l’application.

#### Modélisation des Entités

- **Furniture**  
  L’entité `Furniture` représente un meuble avec des attributs essentiels tels que le nom, la description, la taille, la couleur, la quantité et le prix. Son statut, géré par une énumération (`FurnitureStatus`), peut être « Disponible », « Rupture de stock » ou « Discontinué ».  
  De plus, chaque meuble est associé à :

  - Un type via la relation _Many-to-One_ avec `FurnitureType`.
  - Plusieurs matériaux via une relation _Many-to-Many_ avec l’entité `Material`.
  - Une liste d’images via une relation _One-to-Many_ avec l’entité `Image`.

- **FurnitureType**  
  Définit le type du meuble (par exemple, « Sofa », « Table ») et permet de catégoriser les meubles de manière hiérarchique.

- **Material**  
  Chaque matériau (ex. : « Leather », « Wood ») est défini dans une entité dédiée et peut être associé à plusieurs meubles.

- **Image**  
  Les images des meubles ne sont plus stockées sous forme de BLOB mais référencées via une URL. Cette approche facilite l’intégration d’un stockage externe ou cloud pour des besoins d’échelle.

- **FurnitureStatus & Converter**  
  L’énumération `FurnitureStatus` définit les différents états d’un meuble. Le `FurnitureStatusConverter` gère la conversion entre l’énumération Java et la représentation en chaîne de caractères dans la base de données, garantissant ainsi la cohérence des données.

> **Note :** La fonctionnalité de « Favorite » mentionnée dans la description initiale n’est pas présente dans les fichiers actuels, bien qu’elle puisse constituer une évolution ultérieure du projet.

#### DTOs et Exposition via l’API

- **FurnitureDTO**  
  Utilisé pour restituer l’information essentielle d’un meuble (nom, prix et première image) via l’API REST. Cela permet d’éviter de transmettre des informations sensibles ou inutiles au client.

- **FurnitureDetailDTO**  
  Permet d’obtenir une vue détaillée d’un meuble, incluant la description complète, la taille, la couleur, le statut, le type, ainsi que la liste des matériaux et des URLs d’images associées.

#### Contrôleur REST et Services

- **FurnitureController**  
  Ce contrôleur expose les endpoints REST suivants :

  - `/api/furnitures` : Retourne une liste de meubles sous forme de `FurnitureDTO`. Pour chaque meuble, la première image disponible est extraite pour l’affichage.
  - `/api/furniture/{id}` : Fournit les détails d’un meuble spécifique sous forme de `FurnitureDetailDTO`. En cas d’absence du meuble correspondant, une exception personnalisée `ResourceNotFoundException` est levée.

- **FurnitureService**  
  Le service encapsule la logique métier relative aux meubles en offrant des méthodes pour récupérer l’ensemble des meubles ou un meuble particulier par son identifiant. Il repose sur le repository `FurnitureRepository` pour interagir avec la base de données.

---

### Configuration et Déploiement

- **.env.sample**

  Le fichier **.env.sample** joue un rôle crucial dans la configuration de l’application. Il sert de modèle pour définir les variables d’environnement nécessaires, telles que l’URL de la base de données, le nom d’utilisateur et le mot de passe. Ces variables sont ensuite injectées dans l’application grâce à des outils comme _DotenvPropertySource_ (utilisé dans `BackendApplication.java`), permettant ainsi de séparer la configuration sensible du code source. En pratique, il est recommandé de copier ce fichier en le renommant en **.env** et d’y renseigner les valeurs appropriées selon l’environnement (développement, test, production), tout en s’assurant que ce fichier ne soit pas versionné pour des raisons de sécurité.

- **Fichier de Configuration**  
  Le fichier `application.properties` définit la configuration de la source de données (URL, nom d’utilisateur, mot de passe) à l’aide de variables d’environnement. On y trouve également la configuration de Hibernate (affichage des requêtes SQL et dialecte MySQL).

- **Initialisation de l’Application**  
  Le point d’entrée de l’application, `BackendApplication.java`, initialise le contexte Spring et intègre la configuration externe via le fichier `Config.java`, garantissant ainsi que les paramètres de connexion à la base de données soient correctement injectés.

---

### Remarques et Perspectives d’Amélioration

- **Gestion des Images**  
  L’utilisation d’URLs pour référencer les images est adaptée pour un prototype. Pour une montée en charge, il serait judicieux d’externaliser le stockage des images vers un service cloud, en ne conservant en base que les liens vers ces ressources.

- **Précision des Données Financières**  
  Pour le champ `price`, l’utilisation d’un type `DECIMAL` en base et de `BigDecimal` en Java est conseillée pour éviter les problèmes de précision lors des calculs financiers.

- **Sécurité et Environnement de Production**  
  La configuration actuelle avec `ddl-auto=none` est appropriée pour un environnement de production afin d’éviter des modifications involontaires de la structure de la base. Il sera également important de mettre en place une gestion fine des exceptions et des logs, notamment dans le cas de l’absence d’images ou d’autres données critiques.

---

Cette nouvelle description synthétise les principales composantes et fonctionnalités du backend du projet _luxury_camps_, tout en mettant en lumière les choix technologiques et les bonnes pratiques implémentées pour garantir une architecture robuste et évolutive.

## Frontend

- **Technologies utilisées :**

  - **Angular :** Le frontend est développé avec Angular (version 19.2.0), en TypeScript et SCSS pour le styling.
  - **Proxy de développement :** Un fichier `proxy.conf.json` redirige les requêtes vers l’API backend (http://localhost:8080) pour faciliter le développement local.

- **Architecture et fonctionnalités :**
  - **Page d’accueil :**
    - La page principale, gérée par le **HomePage**, récupère via le **FurnitureService** la liste des meubles en appelant l’API REST du backend.
    - Les meubles sont affichés sous forme de cartes (via le **FurnitureCardComponent**) qui présentent l’image, le nom et le prix du meuble.
  - **Configuration et routage :**
    - Le routage est configuré pour afficher la page d’accueil par défaut, et le projet suit une structure modulaire facilitant l’extension de fonctionnalités.

### Structure et Organisation

- **Structure du projet Angular** :  
  Le projet est bien organisé avec une séparation claire entre les pages, composants, services et modèles. L’utilisation de composants « standalone » (comme HomePage et FurnitureCardComponent) montre une adoption des dernières pratiques Angular.
- **Configuration TypeScript et Angular** :  
  Les fichiers `tsconfig.json` et `angular.json` sont correctement configurés, avec des options strictes qui garantissent une meilleure qualité de code.

### Communication avec le Backend

- **Service FurnitureService** :  
  Le service utilise `HttpClient` pour consommer l’API REST exposée par le backend via un proxy configuré (proxy.conf.json).
  - **Amélioration possible** : Intégrer une gestion des erreurs (catchError, etc.) pour améliorer la robustesse lors des appels réseau.

### Composants et Affichage

- **HomePage** :  
  Le composant récupère la liste des meubles au démarrage et les transmet au composant de carte.
  - **Suggestion** : Utiliser l’async pipe dans le template pour gérer l’Observable pourrait simplifier le code et éviter la souscription manuelle.
- **FurnitureCardComponent** :  
  Le composant affiche les informations du meuble (image, nom, prix) de manière claire et concise.
  - **Conseil** : Prévoir un fallback ou une image par défaut en cas d’absence d’image pour améliorer l’expérience utilisateur.

### Styles et Responsivité

- **Styles SCSS** :  
  Les styles sont simples et efficaces, avec une bonne utilisation de flexbox pour la grille.
  - **Perspective** : Envisager l’utilisation de CSS Grid pour des mises en page plus complexes, si nécessaire.

### Routage

- **Configuration du routage** :  
  Le routage est minimaliste et fonctionnel avec une route par défaut vers HomePage.
  - **Extension** : Prévoir l’ajout d’autres routes pour des pages de détail, d’ajout ou de modification de meubles afin d’améliorer l’expérience et la modularité de l’application.

---

## Recommandations Générales

1. **Gestion des Erreurs et Validation** :

   - Ajouter des contrôles et des messages d’erreur dans le backend et le frontend pour améliorer la robustesse et l’expérience utilisateur.
   - Implémenter des validations côté serveur (par exemple avec Bean Validation) et côté client.

2. **Sécurité** :

   - Actuellement, il n’y a pas de mécanisme d’authentification ou d’autorisation. Pour une application en production, intégrer Spring Security et des solutions de gestion des tokens (JWT, OAuth2) serait indispensable.

3. **Optimisation de la Gestion des Images** :

   - Évaluer le passage d’un stockage en BLOB vers une solution de stockage de fichiers ou d’images externe pour améliorer la scalabilité.

4. **Tests Unitaires et d’Intégration** :

   - Bien que des dépendances de test soient présentes, il serait judicieux d’ajouter des tests unitaires pour les services et les contrôleurs, ainsi que des tests d’intégration pour garantir le bon fonctionnement global du système.

5. **Documentation et Commentaires** :
   - Ajouter des commentaires et une documentation technique sur les choix d’architecture et les fonctions clés du projet facilitera la prise en main par d’autres développeurs.

## Conclusion

Le projet présente une architecture moderne et cohérente, combinant un backend robuste en Java/Spring Boot pour la gestion des données et un frontend Angular pour une interface utilisateur dynamique et réactive. Grâce à l’utilisation de technologies telles que Spring Data JPA, MySQL et Angular, la structure du projet assure une bonne séparation des responsabilités entre la gestion de la logique métier et la présentation.

Quelques améliorations, notamment en termes de gestion des erreurs, de sécurité, d’optimisation du stockage des images et de tests, permettraient de renforcer la robustesse et la maintenabilité de l’application. Globalement, il s’agit d’une base de projet bien conçue et évolutive pour une application de gestion et d’affichage d’un catalogue de meubles
