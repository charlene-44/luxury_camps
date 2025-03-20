-- backend\src\main\resources\schema.sql
-- SET
--     SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

DROP TABLE IF EXISTS `Furniture_Material`;

DROP TABLE IF EXISTS `Favorite`;

DROP TABLE IF EXISTS `Image`;

DROP TABLE IF EXISTS `Furniture`;

DROP TABLE IF EXISTS `Material`;

DROP TABLE IF EXISTS `FurnitureType`;

DROP TABLE IF EXISTS `User`;

-- Create the referenced tables first
CREATE TABLE
    `FurnitureType` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
    `Material` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
    `User` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `user_name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `role` ENUM ('admin', 'visitor', 'customer', 'seller') NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Now create the Furniture table (which references FurnitureType)
CREATE TABLE
    `Furniture` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `description` VARCHAR(255) NOT NULL,
        `id_type` INT UNSIGNED NOT NULL,
        `size` VARCHAR(255) NOT NULL,
        `colour` VARCHAR(255) NOT NULL,
        `quantity` INT NOT NULL,
        `price` DOUBLE NOT NULL,
        `status` ENUM ('Disponible', 'Rupture de stock', 'Discontinué') NOT NULL,
        CONSTRAINT `furniture_id_type_foreign` FOREIGN KEY (`id_type`) REFERENCES `FurnitureType` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Create join table Furniture_Material
CREATE TABLE
    `Furniture_Material` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `id_furniture` INT UNSIGNED NOT NULL,
        `id_material` INT UNSIGNED NOT NULL,
        CONSTRAINT `furniture_material_id_material_foreign` FOREIGN KEY (`id_material`) REFERENCES `Material` (`id`) ON DELETE CASCADE,
        CONSTRAINT `furniture_material_id_furniture_foreign` FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Create Favorite table
CREATE TABLE
    `Favorite` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `id_furniture` INT UNSIGNED NOT NULL,
        `id_user` INT UNSIGNED NOT NULL,
        `is_favorite` BOOLEAN NOT NULL,
        CONSTRAINT `favorite_id_furniture_foreign` FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE,
        CONSTRAINT `favorite_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `User` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Create Image table
CREATE TABLE `Image` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_furniture` INT UNSIGNED NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    CONSTRAINT `image_id_furniture_foreign` 
    FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Insert furniture types first
INSERT INTO FurnitureType (name) VALUES 
('Sofa'),
('Chaise'),
('Coussin'),
('Plateau'),
('Chaise'),
('Lampe'),
('Videpoche'),
('Cabriolet'),
('Cendrier'),
('Sculpture'),
('Secrétaire'),
('Table d''appoint'),
('Fauteuil'),
('Canapé');

-- Insert materials
INSERT INTO Material (name) VALUES 
('Cuir'),
('Bois'),
('Tissus'),
('Porcelaine');

-- Insert furniture records
INSERT INTO Furniture (
    name,
    description,
    id_type,
    size,
    colour,
    quantity,
    price,
    status
) VALUES 
(
    'Canapé Louis Vuitton',
    'Issu de la collection Objets Nomades Louis Vuitton, le canapé Bomboca des frères Campana évoque une confiserie brésilienne. Sa base courbée en cuir et ses huit coussins emboîtés allient confort et esthétisme.',
    14,
    '182 x 88 x 112 cm',
    'Beige',
    10,
    60000.00,
    'Disponible'
),

(
    'Table Hermes',
    'Table d appoint avec plateau en porcelaine decoree a la main. Pietement pliant en chene massif, sangles en cuir a bride. Dessin « H Infini » d Henri d Origny.',
    12,
    'D 34 x H 51 cm',
    'bleu / blanc',
    5,
    5700,
    'Disponible'
),
(
    'Cabriolet Hermes',
    'Cabriolet avec assise compacte, pietement en noyer Canaletto massif. Coque, assise et dossier gainees de cuir taurillon H. Petit fauteuil d appoint confortable.',
    8,
    'L 68,5 x H 72,5 x P 64,5 cm',
    'Noir',
    2,
    15700,
    'Disponible'
),
(
    'Chaise Dior',
    'Chaise médaillon en bois de hêtre à motif Toile de Jouy bleu fabriquée par le fournisseur historique du château de Versailles.',
    2,
    '100 x 48 x 44 cm',
    'Bleu',
    4,
    35000,
    'Disponible'
),
(
    'Lampe Hermes',
    'Lampe de table gainée de taurillon lisse. Abat-jour en opaline soutenu par 3 branches de cuir. Socle détourné en vide-poches. Variateur. Éclairage diffus',
    6,
    'L 32 x H 70 cm ',
    'Blanc',
    25,
    9200,
    'Disponible'
),
(
    'Chaise Louis Vuitton',
    'Chaise Swing par Patricia Urquiola, édition limitée. Allure moderne et savoir-faire artisanal. Mesh tissé à la main, bordure à franges ludiques. Nœuds inspirés du motif Monogram et poignées en cuir.',
    2,
    '130 x 200 x 60 cm',
    'Blanc/Marron',
    1,
    315000,
    'Disponible'
),
(
    'Plateau Dior',
    'Collection Pierre Yovanovitch pour Dior Maison, inspirée des châteaux de la Colle Noire et de Fabrègues. 15 objets alliant simplicité, solidité et noblesse, mettant en valeur savoir-faire traditionnels et matériaux locaux',
    4,
    '130 x 200 x 60 cm',
    'Bleu/Noir',
    22,
    1500,
    'Disponible'
),
(
    'Secrétaire Hermes',
    'Secrétaire et petite table de travail en chêne naturel, avec caisson gainé de taurillon H. Compartiment passe-câbles, deux casiers amovibles et tiroirs avec poignées en cuir. L''ensemble modulable selon l''envie.',
    11,
    'L 85 x H 72,2 x P 52 cm',
    'Marron',
    3,
    39800,
    'Disponible'
),
(
    'Vide Poche Dior',
    'Vide poche en porcelaine de Limoges extra-fine au motif Muguet (Lily of the Valley) vert. Le muguet est l''un des porte-bonheur de Monsieur Dior qui portait toujours un brin dans sa poche lors de ses défilés.',
    7,
    '20 x 16 cm',
    'Vert',
    100,
    410,
    'Disponible'
);





-- Link furniture to materials
INSERT INTO Furniture_Material (id_furniture, id_material) VALUES 
(1, 1),
(2, 2),
(3, 1),
(4, 2),
(5, 3),
(6, 3),
(7, 2),
(8, 4);

-- Insert images (après avoir créé les meubles)
INSERT INTO Image (id_furniture, url) VALUES 
-- Images pour le Canapé Dior (id_furniture = 1)
(1, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/refs/heads/dev/frontend/public/assets/LV/canape.avif'),
(1, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/refs/heads/dev/frontend/public/assets/LV/canape_detail1.avif'),
(1, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/refs/heads/dev/frontend/public/assets/LV/canape_detail3.avif'),

-- Image pour la Table Hermes (id_furniture = 2)
(2, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/table_appoint.png'),
(2, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/table_appoint_detail_2.png'),
(2, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/table_appoint_detail_3.png'),

-- Image pour le Cabriolet Hermes (id_furniture = 3)
(3, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/Cabriolet.webp'),
(3, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/Cabriolet_detail2.webp'),
(3, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/Cabriolet_detail3.webp'),

-- Image pour le chaise Dior (id_furniture = 4)
(4, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/chaise.webp'),
(4, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/chaise_detail1.webp'),
(4, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/chaise_detail3.webp'),

-- Image pour la lampe Hermes (id_furniture = 5)
(5, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/Lampe.webp'),
(5, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/Lampe_detail1.webp'),
(5, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/Lampe_detail2.webp'),

-- Image pour le chaise LV (id_furniture = 6)
(6, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/LV/chaise_1.avif'),
(6, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/LV/chaise_detail1.avif'),
(6, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/LV/chaise_detail2.avif'),

-- Image pour le plateau Dior (id_furniture = 7)
(7, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/Plateau.webp'),
(7, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/Plateau_detail1.webp'),
(7, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/Plateau_detail3.webp'),

-- Image pour le secrétaire Hermes (id_furniture = 8)
(8, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/secretaire.webp'),
(8, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/secretaire.webp'),
(8, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Hermes/secretaire.webp'),

-- Image pour le videpoche Dior (id_furniture = 9)
(9, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/videpoche.webp'),
(9, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/videpoche_detail1.webp'),
(9, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/dev/frontend/public/assets/Dior/videpoche_detail2.webp');