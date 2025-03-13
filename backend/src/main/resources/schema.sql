-- backend\src\main\resources\schema.sql
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

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
        `status` ENUM ('Available', 'Out of stock', 'Discontinued') NOT NULL,
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

-- Insert furniture types first
INSERT INTO FurnitureType (name) VALUES 
('Sofa'),
('Table'),
('Cousin');

-- Insert materials
INSERT INTO Material (name) VALUES 
('Leather'),
('Wood');

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
    'Modern Leather Sofa',
    'A comfortable modern leather sofa',
    1,
    'Large',
    'Brown',
    10,
    999.99,
    'Available'
),
(
    'Wooden Table',
    'Elegant wooden table',
    2,
    'Medium',
    'Brown',
    5,
    499.99,
    'Available'
);

-- Link furniture to materials
INSERT INTO Furniture_Material (id_furniture, id_material) VALUES 
(1, 1),
(1, 2),
(2, 2);

-- Create Image table
CREATE TABLE `Image` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_furniture` INT UNSIGNED NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    CONSTRAINT `image_id_furniture_foreign` 
    FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Insert images (après avoir créé les meubles)
INSERT INTO Image (id_furniture, url) VALUES 
(1, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/refs/heads/feature_home_page/frontend/public/assets/Dior/chaise_detail3.webp'),
(2, 'https://raw.githubusercontent.com/charlene-44/luxury_camps/refs/heads/feature_home_page/frontend/public/assets/Dior/chaise_detail3.webp');