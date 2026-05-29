-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2026 a las 07:00:15
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
-- Base de datos: `productos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id`, `venta_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES
(1, 1, 38, 3, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `cantidad`, `fecha_creacion`) VALUES
(5, 'Pan Blanco', 2.50, 30, '2025-11-14 04:39:38'),
(6, 'Leche Entera 1L', 3.20, 25, '2025-11-14 04:39:38'),
(7, 'Huevos Docena', 4.50, 20, '2025-11-14 04:39:38'),
(8, 'Arroz 1kg', 2.80, 15, '2025-11-14 04:39:38'),
(9, 'Aceite Vegetal 1L', 5.00, 18, '2025-11-14 04:39:38'),
(10, 'Azúcar 1kg', 2.20, 22, '2025-11-14 04:39:38'),
(11, 'Sal 1kg', 1.50, 20, '2025-11-14 04:39:38'),
(12, 'Café Instantáneo', 8.00, 12, '2025-11-14 04:39:38'),
(13, 'Té en Sobres', 3.50, 15, '2025-11-14 04:39:38'),
(14, 'Galletas María', 2.00, 25, '2025-11-14 04:39:38'),
(15, 'Jugo de Naranja 1L', 4.00, 18, '2025-11-14 04:39:38'),
(16, 'Refresco Cola 600ml', 3.50, 30, '2025-11-14 04:39:38'),
(17, 'Agua Mineral 1L', 2.00, 40, '2025-11-14 04:39:38'),
(18, 'Pasta Spaghetti', 2.50, 20, '2025-11-14 04:39:38'),
(19, 'Atún en Lata', 3.80, 15, '2025-11-14 04:39:38'),
(20, 'Sardinas en Lata', 2.90, 12, '2025-11-14 04:39:38'),
(21, 'Frijoles en Lata', 2.70, 18, '2025-11-14 04:39:38'),
(22, 'Sopa Instantánea', 1.80, 25, '2025-11-14 04:39:38'),
(23, 'Papas Fritas', 4.50, 20, '2025-11-14 04:39:38'),
(24, 'Chocolate en Barra', 3.00, 30, '2025-11-14 04:39:38'),
(25, 'Caramelos Mixtos', 1.50, 35, '2025-11-14 04:39:38'),
(26, 'Chicles', 1.20, 40, '2025-11-14 04:39:38'),
(27, 'Pan Integral', 3.00, 12, '2025-11-14 04:39:38'),
(28, 'Mantequilla 200g', 4.50, 12, '2025-11-14 04:39:38'),
(29, 'Queso Fresco', 6.00, 9, '2025-11-14 04:39:38'),
(30, 'Jamón de Pavo', 5.50, 8, '2025-11-14 04:39:38'),
(31, 'Cereal de Maíz', 4.20, 14, '2025-11-14 04:39:38'),
(32, 'Harina de Trigo 1kg', 3.00, 11, '2025-11-14 04:39:38'),
(33, 'Vinagre 500ml', 2.50, 10, '2025-11-14 04:39:38'),
(34, 'Salsa de Tomate', 3.20, 9, '2025-11-14 04:39:38'),
(35, 'Mayonesa 500g', 4.80, 12, '2025-11-14 04:39:38'),
(36, 'Mostaza', 2.80, 10, '2025-11-14 04:39:38'),
(37, 'Detergente Líquido', 6.50, 1, '2025-11-14 04:39:38'),
(38, 'Jabón de Baño', 1.80, 19, '2025-11-14 04:39:38'),
(39, 'Shampoo', 5.50, 5, '2025-11-14 04:39:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','empleado') DEFAULT 'empleado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `rol`) VALUES
(1, 'LupitaADM', '$2b$12$nlrbVJuk9It8t3ySQRj6vu1dnT5cN.tYRIQTCYvX78n9xDNjyf.ja', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `total`, `fecha`) VALUES
(1, 0.00, '2026-05-29 04:53:18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venta_id` (`venta_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;