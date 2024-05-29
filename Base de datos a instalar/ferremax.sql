-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-05-2024 a las 19:11:26
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
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre_categoria` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre_categoria`) VALUES
(1, 'Herramientas manuales'),
(2, 'Herramientas eléctricas'),
(3, 'Ferretería para construcción'),
(4, 'Ferretería para carpintería'),
(5, 'Ferretería para plomería'),
(6, 'Ferretería para electricidad'),
(7, 'Seguridad y protección'),
(8, 'Ferretería para jardinería'),
(9, 'Artículos de fijación y sujeci'),
(10, 'Otros accesorios de ferretería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallespedido`
--

CREATE TABLE `detallespedido` (
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisas`
--

CREATE TABLE `divisas` (
  `codigo_divisa` varchar(3) NOT NULL,
  `nombre_divisa` varchar(50) DEFAULT NULL,
  `valor` decimal(18,2) DEFAULT NULL,
  `actualizado_el` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `divisas`
--

INSERT INTO `divisas` (`codigo_divisa`, `nombre_divisa`, `valor`, `actualizado_el`) VALUES
('USD', 'Dólar estadounidense', '898.13', '2024-05-29 12:42:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_pago` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('Pendiente','Confirmado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `id_pedido`, `monto`, `fecha_pago`, `estado`) VALUES
(1, 1, '31.98', '2024-05-07 19:20:01', 'Confirmado'),
(2, 2, '49.99', '2024-05-07 19:20:01', 'Pendiente'),
(3, 3, '29.97', '2024-05-07 19:20:01', 'Confirmado'),
(4, 4, '51.98', '2024-05-07 19:20:01', 'Pendiente'),
(5, 5, '25.99', '2024-05-07 19:20:01', 'Confirmado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('Pendiente','Aprobado','Rechazado','Entregado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_usuario`, `fecha_pedido`, `estado`) VALUES
(1, 1, '2024-05-07 19:20:01', 'Pendiente'),
(2, 2, '2024-05-07 19:20:01', 'Aprobado'),
(3, 3, '2024-05-07 19:20:01', 'Rechazado'),
(4, 4, '2024-05-07 19:20:01', 'Entregado'),
(5, 5, '2024-05-07 19:20:01', 'Pendiente');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `rol` enum('Cliente','Administrador','Vendedor','Bodeguero','Contador') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasena`, `rol`) VALUES
(1, 'Juan Pérez', 'juan@example.com', 'contraseña1', 'Cliente'),
(2, 'María López', 'maria@example.com', 'contraseña2', 'Administrador'),
(3, 'Carlos Ramírez', 'carlos@example.com', 'contraseña3', 'Vendedor'),
(4, 'Laura Gutiérrez', 'laura@example.com', 'contraseña4', 'Bodeguero'),
(5, 'Pedro Martínez', 'pedro@example.com', 'contraseña5', 'Contador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detallespedido`
--
ALTER TABLE `detallespedido`
  ADD PRIMARY KEY (`id_pedido`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `divisas`
--
ALTER TABLE `divisas`
  ADD PRIMARY KEY (`codigo_divisa`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_ibfk_1` (`codigo_divisa`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallespedido`
--
ALTER TABLE `detallespedido`
  ADD CONSTRAINT `detallespedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `detallespedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

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
