-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2024 a las 21:36:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recetas_del_mundo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisas`
--

CREATE TABLE `divisas` (
  `codigo_divisa` varchar(3) NOT NULL,
  `nombre_divisa` varchar(50) DEFAULT NULL,
  `valor` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `divisas`
--

INSERT INTO `divisas` (`codigo_divisa`, `nombre_divisa`, `valor`) VALUES
('USD', 'Dólar estadounidense', 954.25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `sku` varchar(10) NOT NULL,
  `nombre_producto` varchar(100) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `codigo_divisa` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `sku`, `nombre_producto`, `precio`, `codigo_divisa`) VALUES
(1, '79523', 'Martillo', 5000, 'USD'),
(2, '79987', 'Taladro eléctrico', 25000, 'USD'),
(3, '53192', 'Llave ajustable', 8000, 'USD'),
(4, '16001', 'Cinta métrica', 2000, 'USD'),
(5, '90428', 'Sierra manual', 7000, 'USD'),
(6, '34136', 'Alicates de punta larga', 6000, 'USD'),
(7, '69397', 'Tornillos varios (paquete)', 1000, 'USD'),
(8, '54578', 'Clavos de acero (paquete)', 1500, 'USD'),
(9, '54701', 'Escalera de aluminio (3 metros)', 20000, 'USD'),
(10, '99769', 'Lámpara de trabajo LED', 12000, 'USD'),
(11, '54743', 'Cepillo para madera', 4000, 'USD'),
(12, '54409', 'Guantes de trabajo', 3000, 'USD'),
(13, '97819', 'Máscara protectora', 2500, 'USD'),
(14, '45865', 'Cincel para madera', 3500, 'USD'),
(15, '15868', 'Llave de tubo ajustable', 8500, 'USD'),
(16, '21746', 'Pegamento multiuso', 1500, 'USD'),
(17, '51128', 'Cinta adhesiva de doble cara', 1800, 'USD'),
(18, '90401', 'Pintura en aerosol (color negro)', 5000, 'USD'),
(19, '18622', 'Brocas para taladro (juego)', 10000, 'USD'),
(20, '81908', 'Serrucho de carpintero', 6000, 'USD'),
(21, '73676', 'Escuadra metálica', 3500, 'USD'),
(22, '22656', 'Grapadora manual', 2500, 'USD'),
(23, '62252', 'Cadena de seguridad (metro)', 1200, 'USD'),
(24, '53293', 'Caja de herramientas (plástico)', 15000, 'USD'),
(25, '69710', 'Llave hexagonal (juego)', 9000, 'USD'),
(26, '88672', 'Gafas de seguridad', 2000, 'USD'),
(27, '44229', 'Paleta de albañil', 4000, 'USD'),
(28, '35132', 'Tornillos de anclaje (paquete)', 1800, 'USD'),
(29, '32972', 'Sierra de mano para metales', 7500, 'USD'),
(30, '49465', 'Cinta aislante', 1200, 'USD'),
(31, '48411', 'Tijeras de corte', 3000, 'USD'),
(32, '83660', 'Alambre galvanizado (metro)', 500, 'USD'),
(33, '83069', 'Pala de jardín', 10000, 'USD'),
(34, '64364', 'Nivel de burbuja', 3500, 'USD'),
(35, '62613', 'Destornillador de precisión (juego)', 5000, 'USD'),
(36, '19975', 'Grilletes de acero (paquete)', 2800, 'USD'),
(37, '82034', 'Linterna LED recargable', 8000, 'USD'),
(38, '70248', 'Cinta métrica retráctil', 2200, 'USD'),
(39, '95138', 'Llave de impacto', 18000, 'USD'),
(40, '74948', 'Arco de sierra manual', 4500, 'USD'),
(41, '79323', 'Pintura antióxido (litro)', 7000, 'USD'),
(42, '71775', 'Cepillo de alambre', 1800, 'USD'),
(43, '20906', 'Aceite lubricante (bote)', 2500, 'USD'),
(44, '59205', 'Grapas para grapadora manual', 1200, 'USD'),
(45, '43306', 'Pistola de silicona caliente', 3500, 'USD'),
(46, '28918', 'Rodillo para pintura', 2000, 'USD'),
(47, '94672', 'Cinta de teflón', 800, 'USD'),
(48, '16606', 'Espátula de albañil', 2800, 'USD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas_del_mundo`
--

CREATE TABLE `recetas_del_mundo` (
  `id_receta` int(11) NOT NULL,
  `nombre_receta` varchar(50) NOT NULL,
  `ingrediente_receta` varchar(100) NOT NULL,
  `anio` int(4) NOT NULL,
  `pais_receta` varchar(50) NOT NULL,
  `preparacion_receta` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `url_imagen_receta` varchar(100) NOT NULL,
  `categoria` varchar(15) NOT NULL,
  `id_user` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas_del_mundo`
--

INSERT INTO `recetas_del_mundo` (`id_receta`, `nombre_receta`, `ingrediente_receta`, `anio`, `pais_receta`, `preparacion_receta`, `fecha_creacion`, `url_imagen_receta`, `categoria`, `id_user`) VALUES
(1, 'Pastel de Choclo', 'Choclo, cebolla, carne molida, huevos, aceitunas, azúcar, sal, pimienta', 2008, 'Chile', 'El pastel de choclo es un plato típico de la cocina chilena que consiste en una mezcla de maíz molido y otros ingredientes que se hornea hasta que la superficie adquiere un color dorado. Se sirve caliente y puede acompañarse con ensalada chilena.', '2024-04-17 22:51:56', '/assets/img/Chile_1.jpg', 'Desayuno', 5),
(2, 'Cazuela de Pollo', 'Pollo, zapallo, papas, choclo, zanahorias, arroz, cebolla, ajo, laurel, pimienta, sal', 2015, 'Chile', 'La cazuela de pollo es un guiso típico de la gastronomía chilena que se prepara con trozos de pollo, verduras y arroz. Es un plato muy reconfortante y perfecto para los días fríos.', '2024-04-17 22:51:56', '/assets/img/Chile_2.jpg', 'Postres', 18),
(3, 'Empanadas de Pino', 'Carne molida, cebolla, huevo duro, pasas, aceitunas, comino, pimienta, masa de empanada', 2020, 'Chile', 'Las empanadas de pino son un clásico de la comida chilena. Se preparan con una masa rellena de una mezcla de carne molida, cebolla, huevo duro, pasas y aceitunas, sazonadas con comino y pimienta.', '2024-04-17 22:51:56', '/assets/img/Chile_3.jpg', 'Pollo', 27),
(4, 'Caldillo de Congrio', 'Congrio, cebolla, zanahorias, apio, papas, tomates, vino blanco, cilantro', 2012, 'Chile', 'El caldillo de congrio es una sopa tradicional chilena preparada con congrio, un pescado típico de la costa chilena. Se cocina con verduras, vino blanco y cilantro, lo que le da un sabor único y delicioso.', '2024-04-17 22:51:56', '/assets/img/Chile_4.jpg', 'Sopas', 36),
(5, 'Asado a la Parrilla', 'Carne de vacuno, chorizos, longanizas, pollo, costillar de cerdo, ensaladas diversas', 2018, 'Chile', 'El asado a la parrilla es una comida típica de los domingos en Chile. Consiste en carne de vacuno, chorizos, longanizas, pollo y costillar de cerdo, todo asado a la parrilla y acompañado de ensaladas diversas.', '2024-04-17 22:51:56', '/assets/img/Chile_5.jpg', 'Postres', 45),
(6, 'Sopaipillas Pasadas', 'Harina, zapallo, levadura, sal, azúcar, miel', 2010, 'Chile', 'Las sopaipillas pasadas son un postre tradicional chileno que se prepara con masa de harina y zapallo. Se fríen y luego se pasan por una mezcla de azúcar y miel, lo que les da un sabor dulce y delicioso.', '2024-04-17 22:51:56', '/assets/img/Chile_6.jpg', 'Postres', 54),
(7, 'Hamburguesa', 'Carne molida de res, pan para hamburguesas, lechuga, tomate, cebolla, queso cheddar, pepinillos, sal', 2010, 'Estados Unidos', 'La hamburguesa es un plato icónico de la cocina estadounidense. Se prepara asando carne molida de res y sirviéndola entre dos rebanadas de pan para hamburguesas, acompañada de lechuga, tomate, cebolla, queso cheddar, pepinillos, salsa de tomate y mostaza.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_7.jpg', 'Comida Rápida', 10),
(8, 'Hot Dog', 'Salchicha, pan para hot dog, mostaza, kétchup, cebolla picada, pepinillos picados, chucrut', 2012, 'Estados Unidos', 'El hot dog es otro clásico de la comida estadounidense. Consiste en una salchicha servida en un pan para hot dog y se acompaña con mostaza, kétchup, cebolla picada, pepinillos picados y chucrut.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_8.jpg', 'Ensaladas', 20),
(9, 'Buffalo Wings', 'Alitas de pollo, salsa picante, mantequilla, vinagre, ajo en polvo, salsa de queso azul, apio y zana', 2015, 'Estados Unidos', 'Las Buffalo Wings son alitas de pollo fritas y luego bañadas en una salsa picante de mantequilla y vinagre. Se suelen servir con salsa de queso azul y bastoncitos de apio y zanahorias.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_9.jpg', 'Postres', 30),
(10, 'Mac and Cheese', 'Macarrones, queso cheddar, leche, mantequilla, harina, pan rallado', 2018, 'Estados Unidos', 'El Mac and Cheese es un plato de pasta que combina macarrones con una salsa de queso cheddar y leche. Se hornea hasta que la parte superior esté dorada y crujiente.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_10.jpg', '', 40),
(11, 'Barbacoa', 'Carne de cerdo o res, salsa barbacoa, sal, pimienta, cebolla, ajo, pimientos', 2019, 'Chile', 'La barbacoa es una técnica de cocina muy popular en Estados Unidos. Consiste en asar lentamente carne de cerdo o res en una salsa barbacoa, a menudo durante varias horas, hasta que la carne esté tierna y jugosa.', '2024-04-17 22:51:56', '/assets/img/Chile_11.jpg', '', 50),
(12, 'Apple Pie', 'Manzanas, azúcar, canela, nuez moscada, mantequilla, harina, agua, jugo de limón', 2010, 'Estados Unidos', 'El Apple Pie es un postre clásico de la cocina estadounidense. Consiste en una tarta rellena de manzanas cocidas con azúcar y especias, cubierta con una capa de masa y horneada hasta que esté dorada.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_12.jpg', '', 60),
(13, 'Clam Chowder', 'Almejas, cebolla, apio, patatas, leche, mantequilla, harina, sal, pimienta', 2013, 'Estados Unidos', 'El Clam Chowder es una sopa espesa de almejas muy popular en la cocina de Nueva Inglaterra. Se prepara con almejas, cebolla, apio, patatas, leche, mantequilla y harina, y se sazona con sal y pimienta.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_13.jpg', '', 70),
(14, 'Pancakes', 'Harina, leche, huevos, mantequilla, azúcar, levadura, sal', 2016, 'Estados Unidos', 'Los pancakes son una especie de crepes gruesos y esponjosos muy populares en Estados Unidos. Se preparan con harina, leche, huevos, mantequilla, azúcar, levadura y sal, y se sirven calientes con mantequilla y sirope de arce.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_14.jpg', '', 80),
(15, 'Key Lime Pie', 'Zumo de lima, leche condensada, yemas de huevo, azúcar, mantequilla, galletas', 2018, 'Estados Unidos', 'El Key Lime Pie es un pastel de lima muy popular en el sur de Florida. Se prepara con zumo de lima, leche condensada, yemas de huevo, azúcar y mantequilla, y se sirve sobre una base de galletas trituradas.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_15.jpg', '', 90),
(16, 'Southern Fried Chicken', 'Pollo, buttermilk, harina de trigo, sal, pimienta, ajo en polvo, cebolla en polvo, pimentón, aceite', 2015, 'Estados Unidos', 'El Southern Fried Chicken es un plato sureño clásico de pollo frito. Se sumerge el pollo en buttermilk, luego se reboza en una mezcla de harina de trigo y especias, y se fríe hasta que esté dorado y crujiente.', '2024-04-17 22:51:56', '/assets/img/Estados Unidos_16.jpg', '', 15),
(17, 'Asado Argentino', 'Carne de vacuno, chorizos, morcillas, achuras (mollejas, chinchulines, riñones), sal', 2010, 'Dinamarca', 'El asado argentino es un clásico de la gastronomía del país. Se prepara asando lentamente diversos cortes de carne de vacuno y cerdo sobre una parrilla, acompañados de chorizos, morcillas y achuras, y se sazona con sal.', '2024-04-17 22:51:56', '/assets/img/Dinamarca_17.jpg', '', 5),
(18, 'Milanesa Napolitana', 'Filetes de carne o pollo, pan rallado, huevo, harina, salsa de tomate, queso mozzarella, jamón', 2012, 'Argentina', 'La milanesa napolitana es una variante argentina de la milanesa tradicional. Consiste en filetes de carne o pollo empanados y fritos, cubiertos con salsa de tomate, queso mozzarella y jamón, y gratinados al horno.', '2024-04-17 22:51:56', '/assets/img/Argentina_18.jpg', '', 10),
(19, 'Empanadas Argentinas', 'Carne picada, cebolla, huevo duro, aceitunas, pasas, pimiento, comino, ají molido, masa de empanadas', 2015, 'Argentina', 'Las empanadas argentinas son un clásico de la cocina del país. Se preparan con una masa rellena de carne picada, cebolla, huevo duro, aceitunas, pasas, pimiento y condimentos, y se hornean hasta que estén doradas y crujientes.', '2024-04-17 22:51:56', '/assets/img/Argentina_19.jpg', '', 15),
(20, 'Matambre a la Pizza', 'Matambre de ternera, salsa de tomate, queso mozzarella, aceitunas, condimentos', 2016, 'Argentina', 'El matambre a la pizza es un plato argentino que combina dos clásicos de la gastronomía del país. Consiste en matambre de ternera cubierto con salsa de tomate, queso mozzarella, aceitunas y condimentos, y se hornea hasta que esté dorado y burbujeante.', '2024-04-22 16:32:41', '/assets/img/Argentina_23.jpg', '', 35),
(24, 'Choripán', 'Chorizo, pan baguette, chimichurri', 2019, 'Argentina', 'El choripán es un clásico argentino que se sirve en puestos callejeros y asados. Consiste en un chorizo a la parrilla servido en un pan baguette y acompañado de chimichurri, una salsa a base de perejil, ajo, vinagre, aceite y especias.', '2024-04-17 22:51:56', '/assets/img/Argentina_24.jpg', '', 40),
(25, 'Fish and Chips', 'Filetes de pescado blanco, patatas, harina, cerveza, bicarbonato de sodio, sal', 2010, 'Gran Bretaña', 'El fish and chips es uno de los platos más emblemáticos de la cocina británica. Se prepara asando lentamente diversos cortes de carne de vacuno y cerdo sobre una parrilla, acompañados de chorizos, morcillas y achuras, y se sazona con sal.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_25.jpg', '', 5),
(26, 'Shepherd\'s Pie', 'Carne picada de cordero, cebolla, zanahoria, guisantes, caldo de carne, puré de patatas, mantequilla', 2012, 'Gran Bretaña', 'El Shepherd\'s Pie es un pastel de carne muy popular en Gran Bretaña. Se prepara con carne picada de cordero cocida con cebolla, zanahoria, guisantes y caldo de carne, cubierta con puré de patatas y horneada hasta que esté dorada y crujiente.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_26.jpg', '', 10),
(27, 'Full English Breakfast', 'Huevos, bacon, salchichas, tomate, champiñones, alubias, morcilla, pan, mantequilla', 2015, 'Gran Bretaña', 'El Full English Breakfast es un desayuno completo muy popular en Gran Bretaña. Incluye huevos fritos, bacon, salchichas, tomate asado, champiñones salteados, alubias en salsa de tomate, morcilla y pan tostado con mantequilla.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_27.jpg', '', 15),
(28, 'Yorkshire Pudding', 'Harina, huevos, leche, sal, aceite', 2018, 'Gran Bretaña', 'El Yorkshire Pudding es un acompañamiento clásico de la cocina británica. Se prepara con una masa ligera de harina, huevos, leche y sal, que se hornea en el horno hasta que sube y adquiere un color dorado y crujiente.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_28.jpg', '', 20),
(30, 'Bangers and Mash', 'Salchichas, puré de patatas, cebolla, gravy', 2013, 'Gran Bretaña', 'El Bangers and Mash es un plato reconfortante y sabroso de la cocina británica. Consiste en salchichas fritas servidas sobre un lecho de puré de patatas y acompañadas de cebolla caramelizada y gravy, una salsa hecha con el jugo de la carne.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_30.jpg', '', 30),
(31, 'Chicken Tikka Masala', 'Pollo, yogur, tomate, cebolla, ajo, jengibre, especias (cúrcuma, comino, cilantro, pimentón, garam m', 2016, 'Gran Bretaña', 'El Chicken Tikka Masala es un plato muy popular en Gran Bretaña, a pesar de tener origen indio. Consiste en trozos de pollo marinados en yogur y especias, cocinados en una salsa cremosa de tomate, cebolla, ajo, jengibre y especias, y se sirve con arroz.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_31.jpg', '', 35),
(32, 'Ploughmans Lunch', 'Queso cheddar, pan de centeno, cebolla, pepinillos, chutney, ensalada, manzana', 2019, 'Gran Bretaña', 'El Ploughmans Lunch es un almuerzo sencillo y tradicional en Gran Bretaña. Consiste en queso cheddar, pan de centeno, cebolla, pepinillos, chutney, ensalada y manzana, y se sirve frío.', '2024-04-17 22:51:56', '/assets/img/Gran Bretaña_32.jpg', '', 40),
(33, 'Poutine', 'Patatas fritas, queso en grano (cheddar), salsa gravy', 2010, 'Canadá', 'El Poutine es un plato típico de la cocina canadiense originario de Quebec. Consiste en patatas fritas cubiertas con queso en grano (cheddar) y salsa gravy caliente, que se derrite sobre las patatas.', '2024-04-17 22:51:56', '/assets/img/Canadá_33.jpg', '', 5),
(34, 'Beavertails', 'Masa de harina, azúcar, canela, limón, aceite', 2012, 'Canadá', 'Los Beavertails son un postre popular en Canadá. Se preparan con masa de harina que se estira y se fríe hasta que esté dorada y crujiente, y se espolvorea con azúcar, canela y un poco de zumo de limón.', '2024-04-17 22:51:56', '/assets/img/Canadá_34.jpg', '', 10),
(35, 'Montreal-style Bagels', 'Harina, agua, levadura, miel, sal, semillas de sésamo', 2015, 'Canadá', 'Los bagels al estilo de Montreal son una variante de los bagels tradicionales. Son más densos y dulces que los bagels de Nueva York, y se cuecen en agua con miel antes de hornearse, lo que les da un sabor único.', '2024-04-17 22:51:56', '/assets/img/Canadá_35.jpg', '', 15),
(36, 'Nanaimo Bars', 'Galletas trituradas, coco rallado, nueces, mantequilla, azúcar glas, vainilla, huevo, chocolate', 2018, 'Canadá', 'Las Nanaimo Bars son un postre canadiense originario de la ciudad de Nanaimo, en la Columbia Británica. Consisten en tres capas: una base de galletas trituradas, coco rallado y nueces, una capa intermedia de crema de mantequilla, azúcar glas y vainilla, y una capa superior de chocolate derretido.', '2024-04-17 22:51:56', '/assets/img/Canadá_36.jpg', '', 20),
(37, 'Tourtière', 'Carne picada de cerdo y ternera, cebolla, patatas, hojaldre, especias (canela, clavo, pimienta)', 2010, 'Canadá', 'La Tourtière es un pastel de carne tradicional de la cocina canadiense, especialmente popular en Quebec. Se prepara con una mezcla de carne picada de cerdo y ternera, cebolla, patatas y especias, todo envuelto en hojaldre y horneado hasta que esté dorado y crujiente.', '2024-04-17 22:51:56', '/assets/img/Canadá_37.jpg', '', 25),
(38, 'Butter Tarts', 'Masa de tarta, mantequilla, azúcar, huevo, vainilla, nueces, pasas', 2013, 'Canadá', 'Las Butter Tarts son unos pastelitos dulces muy populares en Canadá. Se preparan con una masa de tarta rellena de una mezcla de mantequilla, azúcar, huevo, vainilla, nueces y pasas, que se hornea hasta que esté dorada y pegajosa.', '2024-04-17 22:51:56', '/assets/img/Canadá_38.jpg', '', 30),
(39, 'Maple Syrup Pie', 'Masa de tarta, sirope de arce, azúcar, huevos, mantequilla, crema', 2016, 'Canadá', 'La Maple Syrup Pie es un postre típico de la cocina canadiense. Se prepara con una masa de tarta rellena de sirope de arce, azúcar, huevos, mantequilla y crema, que se hornea hasta que esté dorada y firme.', '2024-04-17 22:51:56', '/assets/img/Canadá_39.jpg', '', 35),
(40, 'Salmon Candy', 'Filetes de salmón, azúcar, sal, pimienta, eneldo, jugo de limón', 2019, 'Canadá', 'El Salmon Candy es un aperitivo popular en la cocina indígena de Canadá. Consiste en filetes de salmón marinados en una mezcla de azúcar, sal, pimienta, eneldo y jugo de limón, que se ahúman lentamente hasta que estén caramelizados y ligeramente crujientes.', '2024-04-17 22:51:56', '/assets/img/Canadá_40.jpg', '', 40),
(41, 'Caesar Cocktail', 'Vodka, jugo de tomate, salsa Worcestershire, salsa picante, sal, pimienta, apio, limón', 2012, 'Canadá', 'El Caesar Cocktail es un cóctel clásico de Canadá, similar al Bloody Mary. Se prepara con vodka, jugo de tomate, salsa Worcestershire, salsa picante, sal y pimienta, y se sirve en un vaso con hielo y adornado con un tallo de apio y una rodaja de limón.', '2024-04-17 22:51:56', '/assets/img/Canadá_41.jpg', '', 45),
(42, 'Oka Cheese', 'Leche de vaca, cultivos lácticos, cuajo, sal', 2017, 'Canadá', 'El Oka Cheese es un queso semi-blando de origen canadiense, que se produce en la provincia de Quebec. Tiene un sabor suave y ligeramente afrutado, y una textura cremosa. Es muy popular en Canadá y se utiliza en una variedad de platos y aperitivos.', '2024-04-17 22:51:56', '/assets/img/Canadá_42.jpg', '', 50),
(43, 'Tacos al Pastor', 'Pierna de cerdo, achiote, piña, cebolla, cilantro, limón, tortillas de maíz', 2010, 'México', 'Los tacos al pastor son un plato icónico de la cocina mexicana. La carne de cerdo se adoba con achiote y especias, se asa en un trompo vertical, se corta en finas rebanadas y se sirve en tortillas de maíz con trozos de piña, cebolla, cilantro y limón.', '2024-04-17 22:51:56', '/assets/img/México_43.jpg', '', 5),
(44, 'Mole Poblano', 'Chiles secos (ancho, mulato, pasilla), chocolate, almendras, cacahuetes, plátano, galletas marías, e', 2012, 'México', 'El mole poblano es uno de los platillos más representativos de la gastronomía mexicana. Se prepara con una mezcla de chiles secos, chocolate, almendras, cacahuetes, plátano, galletas marías y especias, que se muele y se cocina lentamente hasta obtener una salsa espesa y sabrosa.', '2024-04-17 22:51:56', '/assets/img/México_44.jpg', '', 10),
(45, 'Tamales', 'Masa de maíz, hojas de maíz o plátano, relleno (pollo, cerdo, verduras), salsa', 2015, 'México', 'Los tamales son un platillo tradicional de México. Se preparan con masa de maíz rellena de pollo, cerdo, verduras u otros ingredientes, que se envuelve en hojas de maíz o plátano y se cuece al vapor. Se sirven calientes con salsa.', '2024-04-17 22:51:56', '/assets/img/México_45.jpg', '', 15),
(46, 'Pozole', 'Maíz pozolero, carne de cerdo, caldo de pollo, lechuga, rábano, cebolla, orégano, limón, tostadas', 2018, 'México', 'El pozole es un guiso tradicional mexicano. Se prepara con maíz pozolero cocido en caldo de pollo con carne de cerdo, y se sirve caliente con lechuga, rábano, cebolla, orégano, limón y tostadas.', '2024-04-17 22:51:56', '/assets/img/México_46.jpg', '', 20),
(47, 'Enchiladas', 'Tortillas de maíz, pollo deshebrado, salsa roja o verde, queso, crema, cebolla, aguacate', 2010, 'México', 'Las enchiladas son un platillo clásico de la cocina mexicana. Se preparan con tortillas de maíz rellenas de pollo deshebrado, se bañan en salsa roja o verde, se cubren con queso y se gratinan en el horno. Se sirven con crema, cebolla y aguacate.', '2024-04-17 22:51:56', '/assets/img/México_47.jpg', '', 25),
(48, 'Guacamole', 'Aguacate, tomate, cebolla, cilantro, limón, sal, chile serrano', 2013, 'México', 'El guacamole es una salsa mexicana hecha principalmente de aguacate. Se prepara machacando aguacate con tomate, cebolla, cilantro, limón, sal y chile serrano. Se sirve como acompañamiento de diversos platillos mexicanos o como dip con totopos.', '2024-04-17 22:51:56', '/assets/img/México_48.jpg', '', 30),
(49, 'Chiles en Nogada', 'Chiles poblanos, carne molida de cerdo y res, frutas (manzana, pera, plátano), nueces, almendras, pa', 2016, 'México', 'Los chiles en nogada son un platillo típico de la gastronomía mexicana. Consisten en chiles poblanos rellenos de carne molida de cerdo y res, frutas, nueces, almendras y pasas, cubiertos con una salsa de nuez y decorados con granos de granada y perejil.', '2024-04-17 22:51:56', '/assets/img/México_49.jpg', '', 35),
(50, 'Ceviche', 'Pescado o mariscos, limón, cebolla, tomate, cilantro, chile serrano, sal, aguacate', 2019, 'México', 'El ceviche es un platillo de origen peruano muy popular en México. Se prepara con pescado o mariscos frescos marinados en jugo de limón, con cebolla, tomate, cilantro, chile serrano y sal. Se sirve frío como entrada o botana.', '2024-04-17 22:51:56', '/assets/img/México_50.jpg', '', 40),
(51, 'Chiles Rellenos', 'Chiles poblanos, queso, carne molida, huevo, harina, salsa de tomate, caldo de pollo', 2012, 'México', 'Los chiles rellenos son un platillo tradicional mexicano. Consisten en chiles poblanos asados, rellenos de queso y carne molida, empanizados en huevo y harina, fritos y bañados en salsa de tomate y caldo de pollo.', '2024-04-17 22:51:56', '/assets/img/México_51.jpg', '', 45),
(52, 'Tacos de Carnitas', 'Carne de cerdo, tortillas de maíz, cebolla, cilantro, limón, salsa verde', 2017, 'México', 'Los tacos de carnitas son un platillo de carnitas', '2024-04-17 22:51:56', '/assets/img/México_52.jpg', '', 45),
(66, 'Paella', 'Arroz, pollo, conejo, mariscos, tomate, pimiento, azafrán, aceite de oliva', 2020, 'España', 'La paella es un plato de arroz típico de la cocina española, originario de la Comunidad Valenciana.', '2024-04-17 22:51:56', '/assets/img/España_66.jpg', '', 5),
(67, 'Tortilla de Patatas', 'Patatas, huevos, cebolla, aceite de oliva', 2019, 'España', 'La tortilla de patatas es un plato muy popular en España, consistente en una tortilla elaborada con patatas, huevos y cebolla.', '2024-04-17 22:51:56', '/assets/img/España_67.jpg', '', 5),
(68, 'Gazpacho', 'Tomate, pepino, pimiento, cebolla, ajo, pan, aceite de oliva, vinagre, sal', 2018, 'España', 'El gazpacho es una sopa fría de origen español elaborada a base de hortalizas crudas y pan.', '2024-04-17 22:51:56', '/assets/img/España_68.jpg', '', 5),
(69, 'Salmorejo', 'Tomate, pan, aceite de oliva, vinagre, ajo, sal, jamón serrano, huevo duro', 2017, 'España', 'El salmorejo es una crema fría de consistencia más espesa que el gazpacho, típica de Córdoba.', '2024-04-17 22:51:56', '/assets/img/España_69.jpg', '', 5),
(70, 'Pulpo a la Gallega', 'Pulpo, patatas, pimentón, sal', 2016, 'España', 'El pulpo a la gallega es una receta típica de Galicia, consistente en pulpo cocido servido sobre rodajas de patata cocida y espolvoreado con pimentón y sal.', '2024-04-17 22:51:56', '/assets/img/España_70.jpg', '', 5),
(71, 'Tortilla Española', 'Patatas, huevos, cebolla, aceite de oliva', 2015, 'España', 'La tortilla española, también conocida como tortilla de patatas, es un plato muy popular en España, elaborado a base de huevos, patatas y cebolla.', '2024-04-17 22:51:56', '/assets/img/España_71.jpg', '', 6),
(72, 'Cocido Madrileño', 'Garbanzos, carne de ternera, tocino, chorizo, morcilla, verduras', 2014, 'España', 'El cocido madrileño es un plato tradicional de la gastronomía madrileña, consistente en un guiso de garbanzos con carne y verduras.', '2024-04-17 22:51:56', '/assets/img/España_72.jpg', '', 7),
(73, 'Fabada Asturiana', 'Fabes, chorizo, morcilla, tocino, lacón, azafrán', 2013, 'España', 'La fabada asturiana es un guiso típico de Asturias, elaborado con fabes (judías blancas) y embutidos como chorizo, morcilla y tocino.', '2024-04-17 22:51:56', '/assets/img/España_73.jpg', '', 8),
(74, 'Crema Catalana', 'Leche, yema de huevo, azúcar, maicena, piel de limón, canela', 2012, 'España', 'La crema catalana es un postre tradicional de la cocina catalana, similar a la crema inglesa pero con una capa de azúcar caramelizado en la parte superior.', '2024-04-17 22:51:56', '/assets/img/España_74.jpg', '', 9),
(75, 'Patatas Bravas', 'Patatas, aceite de oliva, salsa brava, alioli', 2011, 'España', 'Las patatas bravas son un plato típico de la cocina española, consistente en patatas cortadas en trozos irregulares, fritas y acompañadas de salsa brava y alioli.', '2024-04-17 22:51:56', '/assets/img/España_75.jpg', '', 10),
(96, 'Paella', 'Arroz, pollo, conejo, mariscos, tomate, pimiento, azafrán, aceite de oliva', 2020, 'España', 'La paella es un plato de arroz típico de la cocina española, originario de la Comunidad Valenciana.', '2024-04-17 22:51:56', '/assets/img/España_96.jpg', '', 5),
(97, 'Tortilla de Patatas', 'Patatas, huevos, cebolla, aceite de oliva', 2019, 'España', 'La tortilla de patatas es un plato muy popular en España, consistente en una tortilla elaborada con patatas, huevos y cebolla.', '2024-04-17 22:51:56', '/assets/img/España_97.jpg', '', 5),
(98, 'Gazpacho', 'Tomate, pepino, pimiento, cebolla, ajo, pan, aceite de oliva, vinagre, sal', 2018, 'España', 'El gazpacho es una sopa fría de origen español elaborada a base de hortalizas crudas y pan.', '2024-04-17 22:51:56', '/assets/img/España_98.jpg', '', 5),
(99, 'Salmorejo', 'Tomate, pan, aceite de oliva, vinagre, ajo, sal, jamón serrano, huevo duro', 2017, 'España', 'El salmorejo es una crema fría de consistencia más espesa que el gazpacho, típica de Córdoba.', '2024-04-17 22:51:56', '/assets/img/España_99.jpg', '', 5),
(100, 'Pulpo a la Gallega', 'Pulpo, patatas, pimentón, sal', 2016, 'España', 'El pulpo a la gallega es una receta típica de Galicia, consistente en pulpo cocido servido sobre rodajas de patata cocida y espolvoreado con pimentón y sal.', '2024-04-17 22:51:56', '/assets/img/España_100.jpg', '', 5),
(101, 'Tortilla Española', 'Patatas, huevos, cebolla, aceite de oliva', 2015, 'España', 'La tortilla española, también conocida como tortilla de patatas, es un plato muy popular en España, elaborado a base de huevos, patatas y cebolla.', '2024-04-17 22:51:56', '/assets/img/España_101.jpg', '', 6),
(102, 'Cocido Madrileño', 'Garbanzos, carne de ternera, tocino, chorizo, morcilla, verduras', 2014, 'España', 'El cocido madrileño es un plato tradicional de la gastronomía madrileña, consistente en un guiso de garbanzos con carne y verduras.', '2024-04-17 22:51:56', '/assets/img/España_102.jpg', '', 7),
(103, 'Fabada Asturiana', 'Fabes, chorizo, morcilla, tocino, lacón, azafrán', 2013, 'España', 'La fabada asturiana es un guiso típico de Asturias, elaborado con fabes (judías blancas) y embutidos como chorizo, morcilla y tocino.', '2024-04-17 22:51:56', '/assets/img/España_103.jpg', '', 8),
(104, 'Crema Catalana', 'Leche, yema de huevo, azúcar, maicena, piel de limón, canela', 2012, 'España', 'La crema catalana es un postre tradicional de la cocina catalana, similar a la crema inglesa pero con una capa de azúcar caramelizado en la parte superior.', '2024-04-17 22:51:56', '/assets/img/España_104.jpg', '', 9),
(105, 'Patatas Bravas', 'Patatas, aceite de oliva, salsa brava, alioli', 2011, 'España', 'Las patatas bravas son un plato típico de la cocina española, consistente en patatas cortadas en trozos irregulares, fritas y acompañadas de salsa brava y alioli.', '2024-04-17 22:51:56', '/assets/img/España_105.jpg', '', 10),
(107, 'Pastel de cuchuflis', 'Choclo, cebolla, carne molida, huevos, aceitunas, azúcar, sal, pimienta', 0, 'Dinamarca', 'El pastel de choclo es un plato típico de la cocina chilena que consiste en una mezcla de maíz molido y otros ingredientes que se hornea hasta que la superficie adquiere un color dorado. Se sirve caliente y puede acompañarse con ensalada chilena.', '2024-04-17 22:51:56', '/assets/img/Dinamarca_107.jpg', 'Desayuno', 17),
(108, 'Pastel de cuchuflis', 'Choclo, cebolla, carne molida, huevos, aceitunas, azúcar, sal, pimienta', 0, 'Dinamarca', 'El pastel de choclo es un plato típico de la cocina chilena que consiste en una mezcla de maíz molido y otros ingredientes que se hornea hasta que la superficie adquiere un color dorado. Se sirve caliente y puede acompañarse con ensalada chilena.', '2024-04-17 22:51:56', '/assets/img/Dinamarca_108.jpg', 'Desayuno', 17),
(110, 'Pastel de cuchuflis', 'Choclo, cebolla, carne molida, huevos, aceitunas, azúcar, sal, pimienta', 0, 'Dinamarca', 'El pastel de choclo es un plato típico de la cocina chilena que consiste en una mezcla de maíz molido y otros ingredientes que se hornea hasta que la superficie adquiere un color dorado. Se sirve caliente y puede acompañarse con ensalada chilena.', '2024-04-17 22:51:56', '/assets/img/Dinamarca_110.jpg', 'Desayuno', 17),
(111, 'Pastel de cuchuftyhtylis', 'Choclo, cebolla, carne molida, huevos, aceitunas, azúcar, sal, pimienta', 0, 'Dinamarca', 'El pastel de choclo es un plato típico de la cocina chilena que consiste en una mezcla de maíz molido y otros ingredientes que se hornea hasta que la superficie adquiere un color dorado. Se sirve caliente y puede acompañarse con ensalada chilena.', '2024-04-17 22:51:56', '/assets/img/Dinamarca_111.jpg', 'Desayuno', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(30) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `user` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombres`, `user`, `password`, `fecha_creacion`) VALUES
(1, 'Juan Pérez', 'juanperez', 'password1', '2024-04-11 03:17:14'),
(2, 'María García', 'mariagarcia', 'password2', '2024-04-11 03:17:14'),
(5, 'Pedro Rodríguez', 'pedrorodriguez', 'password5', '2024-04-11 03:17:14'),
(6, 'Laura Sánchez', 'laurasanchez', 'password6', '2024-04-11 03:17:14'),
(7, 'Sofía Martín', 'sofiamartin', 'password7', '2024-04-11 03:17:14'),
(8, 'Miguel Ruiz', 'miguelruiz', 'password8', '2024-04-11 03:17:14'),
(9, 'Lucía Hernández', 'luciahernandez', 'password9', '2024-04-11 03:17:14'),
(10, 'Diego Díaz', 'diegodiaz', 'password10', '2024-04-11 03:17:14'),
(11, 'Elena Fernández', 'elenafernandez', 'password11', '2024-04-11 03:17:14'),
(12, 'Alejandro García', 'alexgarcia', 'password12', '2024-04-11 03:17:14'),
(13, 'Paula Rodríguez', 'paularodriguez', 'password13', '2024-04-11 03:17:14'),
(14, 'Fernando Gómez', 'fernandogomez', 'password14', '2024-04-11 03:17:14'),
(15, 'María Martínez', 'mariamartinez', 'password15', '2024-04-11 03:17:14'),
(16, 'Carlos Sánchez', 'carlossanchez', 'password16', '2024-04-11 03:17:14'),
(17, 'Sara Pérez', 'saraperez', 'password17', '2024-04-11 03:17:14'),
(18, 'Javier López', 'javierlopez', 'password18', '2024-04-11 03:17:14'),
(19, 'Andrea Ruiz', 'andrearuiz', 'password19', '2024-04-11 03:17:14'),
(20, 'Daniel Díaz', 'danieldiaz', 'password20', '2024-04-11 03:17:14'),
(21, 'Natalia Fernández', 'nataliafernandez', 'password21', '2024-04-11 03:17:14'),
(22, 'Roberto García', 'robertogarcia', 'password22', '2024-04-11 03:17:14'),
(23, 'Carmen Rodríguez', 'carmenrodriguez', 'password23', '2024-04-11 03:17:14'),
(24, 'Santiago Martínez', 'santiagomartinez', 'password24', '2024-04-11 03:17:14'),
(25, 'Ana Belén Pérez', 'anabelenperez', 'password25', '2024-04-11 03:17:14'),
(26, 'David Sánchez', 'davidsanchez', 'password26', '2024-04-11 03:17:14'),
(27, 'María José López', 'mariajoselopez', 'password27', '2024-04-11 03:17:14'),
(28, 'José Manuel Rodríguez', 'josemanuelrodriguez', 'password28', '2024-04-11 03:17:14'),
(29, 'Rosa María Gómez', 'rosamariagomez', 'password29', '2024-04-11 03:17:14'),
(30, 'Pablo Martínez', 'pablomartinez', 'password30', '2024-04-11 03:17:14'),
(31, 'Cristina Pérez', 'cristinaperez', 'password31', '2024-04-11 03:17:14'),
(32, 'Francisco Ruiz', 'franciscoruiz', 'password32', '2024-04-11 03:17:14'),
(33, 'Isabel Fernández', 'isabelfernandez', 'password33', '2024-04-11 03:17:14'),
(34, 'Ángela García', 'angelagarcia', 'password34', '2024-04-11 03:17:14'),
(35, 'Juan Carlos López', 'juancarloslopez', 'password35', '2024-04-11 03:17:14'),
(36, 'María Isabel Rodríguez', 'mariaisabelrodriguez', 'password36', '2024-04-11 03:17:14'),
(37, 'Manuel Gómez', 'manuelgomez', 'password37', '2024-04-11 03:17:14'),
(38, 'Eva Martínez', 'evamartinez', 'password38', '2024-04-11 03:17:14'),
(39, 'Jorge Sánchez', 'jorgesanchez', 'password39', '2024-04-11 03:17:14'),
(40, 'Nuria Pérez', 'nuriaperez', 'password40', '2024-04-11 03:17:14'),
(41, 'Antonio López', 'antoniolopez', 'password41', '2024-04-11 03:17:14'),
(42, 'Raquel Rodríguez', 'raquelrodriguez', 'password42', '2024-04-11 03:17:14'),
(43, 'Alberto Martínez', 'albertomartinez', 'password43', '2024-04-11 03:17:14'),
(44, 'Celia García', 'celiagarcia', 'password44', '2024-04-11 03:17:14'),
(45, 'Diego Pérez', 'diegoperez', 'password45', '2024-04-11 03:17:14'),
(46, 'Luis López', 'luislopez', 'password46', '2024-04-11 03:18:15'),
(47, 'Carmen Martínez', 'carmenmartinez', 'password47', '2024-04-11 03:18:15'),
(48, 'Javier García', 'javiergarcia', 'password48', '2024-04-11 03:18:15'),
(49, 'Marina Rodríguez', 'marinarodriguez', 'password49', '2024-04-11 03:18:15'),
(50, 'Alberto Pérez', 'albertoperez', 'password50', '2024-04-11 03:18:15'),
(51, 'Elena Sánchez', 'elenasanchez', 'password51', '2024-04-11 03:18:15'),
(52, 'Ricardo Martínez', 'ricardomartinez', 'password52', '2024-04-11 03:18:15'),
(53, 'Natalia López', 'natalialopez', 'password53', '2024-04-11 03:18:15'),
(54, 'Juan Antonio García', 'juanantoniogarcia', 'password54', '2024-04-11 03:18:15'),
(55, 'Cristina Rodríguez', 'cristinarodriguez', 'password55', '2024-04-11 03:18:15'),
(56, 'Pablo Pérez', 'pabloperez', 'password56', '2024-04-11 03:18:15'),
(57, 'Sara Martínez', 'saramartinez', 'password57', '2024-04-11 03:18:15'),
(58, 'Pedro García', 'pedrogarcia', 'password58', '2024-04-11 03:18:15'),
(59, 'Laura López', 'lauralopez', 'password59', '2024-04-11 03:18:15'),
(60, 'Manuel Pérez', 'manuelperez', 'password60', '2024-04-11 03:18:15'),
(61, 'Isabel García', 'isabelgarcia', 'password61', '2024-04-11 03:18:15'),
(62, 'Miguel Ángel Rodríguez', 'miguelangelrodriguez', 'password62', '2024-04-11 03:18:15'),
(63, 'Ana María Pérez', 'anamariaperez', 'password63', '2024-04-11 03:18:15'),
(64, 'Francisco García', 'franciscogarcia', 'password64', '2024-04-11 03:18:15'),
(65, 'Clara Martínez', 'claramartinez', 'password65', '2024-04-11 03:18:15'),
(66, 'David López', 'davidlopez', 'password66', '2024-04-11 03:18:15'),
(67, 'María Teresa García', 'mariateresagarcia', 'password67', '2024-04-11 03:18:15'),
(68, 'Luisa Pérez', 'luisaperez', 'password68', '2024-04-11 03:18:15'),
(70, 'María Dolores Martínez', 'mariadoloresmartinez', 'password70', '2024-04-11 03:18:15'),
(71, 'Jesús García', 'jesusgarcia', 'password71', '2024-04-11 03:18:15'),
(72, 'Sandra López', 'sandralopez', 'password72', '2024-04-11 03:18:15'),
(73, 'Carlos Pérez', 'carlosperez', 'password73', '2024-04-11 03:18:15'),
(74, 'Raquel García', 'raquelgarcia', 'password74', '2024-04-11 03:18:15'),
(75, 'José Antonio Martínez', 'joseantoniomartinez', 'password75', '2024-04-11 03:18:15'),
(76, 'María José López', 'mariajoselopez', 'password76', '2024-04-11 03:18:15'),
(77, 'Manuel García', 'manuelgarcia', 'password77', '2024-04-11 03:18:15'),
(78, 'Marta Pérez', 'martaperez', 'password78', '2024-04-11 03:18:15'),
(79, 'Antonio Rodríguez', 'antoniorodriguez', 'password79', '2024-04-11 03:18:15'),
(80, 'María Rosa Martínez', 'mariarosamartinez', 'password80', '2024-04-11 03:18:15'),
(81, 'Jorge López', 'jorgelopez', 'password81', '2024-04-11 03:18:15'),
(82, 'Nuria García', 'nuriagarcia', 'password82', '2024-04-11 03:18:15'),
(83, 'Daniel Pérez', 'danielperez', 'password83', '2024-04-11 03:18:15'),
(84, 'Cristina García', 'cristinagarcia', 'password84', '2024-04-11 03:18:15'),
(85, 'Rubén Martínez', 'rubenmartinez', 'password85', '2024-04-11 03:18:15'),
(86, 'Elena Rodríguez', 'elenarodriguez', 'password86', '2024-04-11 03:18:15'),
(87, 'Álvaro López', 'alvarolopez', 'password87', '2024-04-11 03:18:15'),
(88, 'Pilar Pérez', 'pilarperez', 'password88', '2024-04-11 03:18:15'),
(89, 'Javier Rodríguez', 'javierrodriguez', 'password89', '2024-04-11 03:18:15'),
(90, 'Sonia García', 'soniagarcia', 'password90', '2024-04-11 03:18:15'),
(91, 'Álvaro López', 'alvarolopez', 'holapianola', '2024-04-11 16:31:07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `divisas`
--
ALTER TABLE `divisas`
  ADD PRIMARY KEY (`codigo_divisa`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `codigo_divisa` (`codigo_divisa`);

--
-- Indices de la tabla `recetas_del_mundo`
--
ALTER TABLE `recetas_del_mundo`
  ADD PRIMARY KEY (`id_receta`),
  ADD KEY `fk_recetas` (`id_user`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `recetas_del_mundo`
--
ALTER TABLE `recetas_del_mundo`
  MODIFY `id_receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`codigo_divisa`) REFERENCES `divisas` (`codigo_divisa`);

--
-- Filtros para la tabla `recetas_del_mundo`
--
ALTER TABLE `recetas_del_mundo`
  ADD CONSTRAINT `fk_recetas` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
