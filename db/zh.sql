CREATE DATABASE `zh`
CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `zh`;

CREATE TABLE `regisztracio` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(45) COLLATE utf8_hungarian_ci NOT NULL,
  `nev` varchar(45) COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `kor` int(10) UNSIGNED NOT NULL,
  `nem` varchar(10) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci; 

ALTER TABLE `regisztracio`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `regisztracio`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
