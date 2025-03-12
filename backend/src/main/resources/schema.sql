-- backend\src\main\resources\schema.sql

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
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
CREATE TABLE `FurnitureType` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Material` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `User` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM ('admin', 'visitor', 'customer', 'seller') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Now create the Furniture table (which references FurnitureType)
CREATE TABLE `Furniture` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create join table Furniture_Material
CREATE TABLE `Furniture_Material` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_furniture` INT UNSIGNED NOT NULL,
    `id_material` INT UNSIGNED NOT NULL,
    CONSTRAINT `furniture_material_id_material_foreign` FOREIGN KEY (`id_material`) REFERENCES `Material` (`id`) ON DELETE CASCADE,
    CONSTRAINT `furniture_material_id_furniture_foreign` FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Favorite table
CREATE TABLE `Favorite` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_furniture` INT UNSIGNED NOT NULL,
    `id_user` INT UNSIGNED NOT NULL,
    `is_favorite` BOOLEAN NOT NULL,
    CONSTRAINT `favorite_id_furniture_foreign` FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE,
    CONSTRAINT `favorite_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Image table
CREATE TABLE `Image` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_furniture` INT UNSIGNED NOT NULL,
    `image` BLOB NOT NULL,
    CONSTRAINT `image_id_furniture_foreign` FOREIGN KEY (`id_furniture`) REFERENCES `Furniture` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Relationships

-- EN version

-- A single piece of furniture can have multiple images, but each image belongs to just one piece of furniture.
-- Furniture can be made from various materials, and each material can be used across many different furniture pieces.
-- Every piece of furniture has exactly one type, but a single type can include many different pieces of furniture.
-- A piece of furniture can be marked as a favorite by multiple users, but each favorite entry links to just one furniture item.
-- A user can have many favorite items, but each favorite connects one user to a single piece of furniture.

-- FR version

-- Un seul meuble peut avoir plusieurs images, mais chaque image n'appartient qu'à un seul meuble.
-- Les meubles peuvent être fabriqués à partir de différents matériaux, et chaque matériau peut être utilisé pour plusieurs meubles différents.
-- Chaque meuble a exactement un type, mais un seul type peut inclure de nombreux meubles différents.
-- Un meuble peut être marqué comme favori par plusieurs utilisateurs, mais chaque favori ne renvoie qu'à un seul meuble.
-- Un utilisateur peut avoir plusieurs éléments favoris, mais chaque favori relie un utilisateur à un seul meuble.

-- Insert a furniture type (e.g., Sofa)

COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
