-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-05-2024 a las 18:52:42
-- Versión del servidor: 5.7.24
-- Versión de PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ferremax`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `sku` int(6) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `precio` int(6) DEFAULT NULL,
  `codigo_divisa` varchar(3) NOT NULL,
  `cantidad_disponible` int(11) DEFAULT NULL,
  `marca` varchar(30) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `sku`, `nombre`, `descripcion`, `precio`, `codigo_divisa`, `cantidad_disponible`, `marca`, `id_categoria`) VALUES
(1, 329357, 'Martillo', 'Martillo de carpintero', 7500, 'USD', 100, 'Bosch', 1),
(2, 445750, 'Destornillador', 'Destornillador de estrella', 2000, 'USD', 200, 'DeWalt', 1),
(3, 240678, 'Taladro', 'Taladro eléctrico de 500W', 45000, 'USD', 50, 'Makita', 2),
(4, 866141, 'Sierra Circular', 'Sierra circular de 1200W', 60000, 'USD', 30, 'Stanley', 2),
(5, 608670, 'Cemento', 'Saco de cemento de 25 kg', 3500, 'USD', 500, 'Polpaico', 3),
(6, 444929, 'Clavos', 'Clavos de acero 2 pulgadas', 500, 'USD', 1000, 'Simpson Strong-Tie', 3),
(7, 398634, 'Cepillo de Carpintero', 'Cepillo manual de madera', 9000, 'USD', 80, 'Truper', 4),
(8, 658386, 'Lijadora', 'Lijadora eléctrica de 200W', 30000, 'USD', 40, 'Black+Decker', 4),
(9, 96027, 'Llave Inglesa', 'Llave inglesa ajustable', 7500, 'USD', 120, 'Irwin', 5),
(10, 504979, 'Tubería PVC', 'Tubería de PVC 1 pulgada', 2500, 'USD', 600, 'Tigre', 5),
(11, 236814, 'Cinta Aislante', 'Cinta aislante 3 metros', 1000, 'USD', 300, '3M', 6),
(12, 669134, 'Interruptor', 'Interruptor de luz', 1500, 'USD', 150, 'Schneider Electric', 6),
(13, 635228, 'Casco de Seguridad', 'Casco de seguridad industrial', 12000, 'USD', 70, 'Honeywell', 7),
(14, 168737, 'Guantes de Protección', 'Guantes de protección para trabajo', 3500, 'USD', 200, 'Ansell', 7),
(15, 938003, 'Tijeras de Jardín', 'Tijeras de podar', 6000, 'USD', 110, 'Fiskars', 8),
(16, 183802, 'Regadera', 'Regadera de jardín 5 litros', 3000, 'USD', 90, 'Gardena', 8),
(17, 105004, 'Tornillos', 'Tornillos de acero 1 pulgada', 700, 'USD', 800, 'Hilti', 9),
(18, 973613, 'Anclajes', 'Anclajes de expansión', 1500, 'USD', 400, 'Ramset', 9),
(19, 553054, 'Cerradura', 'Cerradura de seguridad', 25000, 'USD', 50, 'Yale', 10),
(20, 844431, 'Bisagras', 'Bisagras de acero inoxidable', 2000, 'USD', 300, 'Dorma', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_ibfk_1` (`codigo_divisa`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`codigo_divisa`) REFERENCES `divisas` (`codigo_divisa`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
