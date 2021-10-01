-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-10-2021 a las 21:37:36
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `Ad_id` int(11) NOT NULL,
  `Ad_nombre` varchar(50) NOT NULL,
  `Ad_apellido_paterno` varchar(50) NOT NULL,
  `Ad_apellido_materno` varchar(50) NOT NULL,
  `Ad_email` varchar(45) NOT NULL,
  `Ad_contraseña` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluado`
--

CREATE TABLE `evaluado` (
  `Eva_id` int(11) NOT NULL,
  `Eva_nombre` varchar(50) NOT NULL,
  `Eva_apellido_paterno` varchar(50) NOT NULL,
  `Eva_apellido_materno` varchar(50) NOT NULL,
  `Eva_email` varchar(255) NOT NULL,
  `Eva_contraseña` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evaluado`
--

INSERT INTO `evaluado` (`Eva_id`, `Eva_nombre`, `Eva_apellido_paterno`, `Eva_apellido_materno`, `Eva_email`, `Eva_contraseña`) VALUES
(1, 'Miguel', 'Rueda', 'Carbajal', 'mrueda010@hotmail.com', '$2y$10$VumEXRSvMEpCz0gAiP3GGuHI3hIe5GjHF8hXCXvWyhnlNsIDEIisK'),
(2, 'Miguel', 'Rueda', 'Carbajal', 'mrueda020@hotmail.com', '$2y$10$5w4OoNk7dwg0BOivQ8hTK.o0WbcQdvLz5mQVh0ysalCNhWFvn3l0W'),
(3, 'Miguel', 'Rueda', 'Carbajal', 'mrueda030@hotmail.com', '$2y$10$Yldb20GS1b5D4L60jnrAgu5O5QRKhFt4kaYeR6uBEb4nK2/SWrylG'),
(4, 'Miguel', 'Rueda', 'Carbajal', 'mrueda040@hotmail.com', '$2y$10$ItvPMSj7VbJKyCzX3sJbPuPw8qJikTvbDa.vSBfQb92ITk0ErV5aq'),
(5, 'Miguel', 'Rueda', 'Carbajal', 'mrueda050@hotmail.com', '$2y$10$5e89IRpzHV1wXEfztx1rHOZvoVNy9XmAB6FdIdmzfPL6wegrCnBuy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluador`
--

CREATE TABLE `evaluador` (
  `Evaluador_id` int(11) NOT NULL,
  `Evaluador_nombre` varchar(50) NOT NULL,
  `Evaluador_apellido_paterno` varchar(50) NOT NULL,
  `Evaluador_apellido_materno` varchar(50) NOT NULL,
  `Evaluador_email` varchar(50) NOT NULL,
  `Evaluador_contraseña` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evaluador`
--

INSERT INTO `evaluador` (`Evaluador_id`, `Evaluador_nombre`, `Evaluador_apellido_paterno`, `Evaluador_apellido_materno`, `Evaluador_email`, `Evaluador_contraseña`) VALUES
(1, 'Miguel', 'Rueda', 'Carbajal', 'mrueda@hotmail.com', '$2y$10$heemYKx9eSxJtGahrIS3LOf82aDIkzs24Bp6P3MmymIYg1ZlHkFxy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `Exa_id` int(11) NOT NULL,
  `Exa_nombre` varchar(50) NOT NULL,
  `Exa_description` varchar(50) NOT NULL,
  `Exa_fecha_aplicacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Evaluador_Evaluador_id` int(11) NOT NULL,
  `Exa_tipo_de_examen` varchar(45) NOT NULL,
  `Exa_no_preguntas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`Exa_id`, `Exa_nombre`, `Exa_description`, `Exa_fecha_aplicacion`, `Evaluador_Evaluador_id`, `Exa_tipo_de_examen`, `Exa_no_preguntas`) VALUES
(1, 'grdgdr', 'geg', '2021-09-27 16:06:34', 1, '1', 1),
(2, 'gdrgge', 'geedge', '2021-09-27 16:06:44', 1, '1', 3),
(3, 'gtgrg', 'rgrrgrtg', '2021-09-29 17:50:42', 1, '1', 2),
(4, 'wwtgte4te4t', '3tw4tkfnieofgwginegwggewge', '2021-09-29 21:55:42', 1, '1', 1),
(5, 'wwtgte4te4t', '3tw4tkfnieofgwginegwggewge', '2021-09-29 21:56:00', 1, '1', 1),
(6, 'gferg', 'ewffwefef', '2021-09-30 22:01:26', 1, '0', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `Gr_id` int(11) NOT NULL,
  `Evaluador_Evaluador_id` int(11) NOT NULL,
  `Gr_nombre` varchar(50) NOT NULL,
  `Gr_descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`Gr_id`, `Evaluador_Evaluador_id`, `Gr_nombre`, `Gr_descripcion`) VALUES
(1, 1, 'gdg', 'ergeg'),
(2, 1, 'grgrg', 'grgrjth54'),
(3, 1, 'grgrg', 'grgrjth54'),
(4, 1, 'grgrg', 'grgrjth54'),
(5, 1, 'grgrg', 'grgrjth54'),
(6, 1, 'eeg', 'gerg'),
(7, 1, 'eeg', 'gerg'),
(8, 1, 'tthyh', '656y46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_evaluado`
--

CREATE TABLE `grupos_evaluado` (
  `Evaluado_Eva_id` int(11) NOT NULL,
  `Grupo_Gr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupos_evaluado`
--

INSERT INTO `grupos_evaluado` (`Evaluado_Eva_id`, `Grupo_Gr_id`) VALUES
(1, 1),
(3, 1),
(1, 2),
(3, 2),
(1, 3),
(3, 3),
(1, 4),
(3, 4),
(1, 5),
(3, 5),
(1, 6),
(4, 6),
(1, 7),
(4, 7),
(1, 8),
(2, 8),
(3, 8),
(4, 8),
(5, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_evaluador`
--

CREATE TABLE `grupos_evaluador` (
  `Evaluador_Evaluador_id` int(11) NOT NULL,
  `Grupo_Gr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupos_evaluador`
--

INSERT INTO `grupos_evaluador` (`Evaluador_Evaluador_id`, `Grupo_Gr_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo_examenes`
--

CREATE TABLE `grupo_examenes` (
  `Grupo_Gr_id` int(11) NOT NULL,
  `Examen_Exa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupo_examenes`
--

INSERT INTO `grupo_examenes` (`Grupo_Gr_id`, `Examen_Exa_id`) VALUES
(8, 1),
(8, 2),
(8, 3),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `Pr_id` int(11) NOT NULL,
  `Pr_pregunta` varchar(200) NOT NULL,
  `Evaluador_Evaluador_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`Pr_id`, `Pr_pregunta`, `Evaluador_Evaluador_id`) VALUES
(1, 'gdrg', 1),
(2, 'gdrg', 1),
(3, 'gdrg', 1),
(4, 'gdrg', 1),
(5, 'gdrg', 1),
(6, '6jj66j6', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_en_examen`
--

CREATE TABLE `preguntas_en_examen` (
  `Examen_Exa_id` int(11) NOT NULL,
  `Pregunta_Pr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preguntas_en_examen`
--

INSERT INTO `preguntas_en_examen` (`Examen_Exa_id`, `Pregunta_Pr_id`) VALUES
(1, 1),
(2, 3),
(2, 4),
(2, 1),
(3, 2),
(3, 1),
(4, 1),
(5, 1),
(6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `Res_id` int(11) NOT NULL,
  `Res_respuesta` varchar(50) NOT NULL,
  `Res_es_correcta` tinyint(4) NOT NULL,
  `Pregunta_Pr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`Res_id`, `Res_respuesta`, `Res_es_correcta`, `Pregunta_Pr_id`) VALUES
(1, 'ggdr', 0, 1),
(2, 'dggd', 1, 1),
(3, 'ggdr', 0, 2),
(4, 'dggd', 1, 2),
(5, 'ggdr', 0, 3),
(6, 'dggd', 1, 3),
(7, 'ggdr', 0, 4),
(8, 'dggd', 1, 4),
(9, 'ggdr', 0, 5),
(10, 'dggd', 1, 5),
(11, '6', 0, 6),
(12, '6', 1, 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Ad_id`);

--
-- Indices de la tabla `evaluado`
--
ALTER TABLE `evaluado`
  ADD PRIMARY KEY (`Eva_id`);

--
-- Indices de la tabla `evaluador`
--
ALTER TABLE `evaluador`
  ADD PRIMARY KEY (`Evaluador_id`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`Exa_id`),
  ADD KEY `fk_Examen_Evaluador1_idx` (`Evaluador_Evaluador_id`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`Gr_id`),
  ADD KEY `fk_Grupo_Evaluador_idx` (`Evaluador_Evaluador_id`);

--
-- Indices de la tabla `grupos_evaluado`
--
ALTER TABLE `grupos_evaluado`
  ADD KEY `fk_Grupos_Evaluado_Grupo1_idx` (`Grupo_Gr_id`),
  ADD KEY `fk_Grupos_Evaluado_Evaluado1` (`Evaluado_Eva_id`);

--
-- Indices de la tabla `grupos_evaluador`
--
ALTER TABLE `grupos_evaluador`
  ADD KEY `fk_Grupos_Evaluador_Evaluador1_idx` (`Evaluador_Evaluador_id`),
  ADD KEY `fk_Grupos_Evaluador_Grupo1_idx` (`Grupo_Gr_id`);

--
-- Indices de la tabla `grupo_examenes`
--
ALTER TABLE `grupo_examenes`
  ADD KEY `fk_Examenes_Grupo1_idx` (`Grupo_Gr_id`),
  ADD KEY `fk_Examenes_Examen1_idx` (`Examen_Exa_id`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`Pr_id`),
  ADD KEY `fk_Pregunta_Evaluador1_idx` (`Evaluador_Evaluador_id`);

--
-- Indices de la tabla `preguntas_en_examen`
--
ALTER TABLE `preguntas_en_examen`
  ADD KEY `fk_Preguntas_En_Examen_Examen1_idx` (`Examen_Exa_id`),
  ADD KEY `fk_Preguntas_En_Examen_Pregunta1_idx` (`Pregunta_Pr_id`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`Res_id`),
  ADD KEY `fk_Respuesta_Pregunta1_idx` (`Pregunta_Pr_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `Ad_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluado`
--
ALTER TABLE `evaluado`
  MODIFY `Eva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `evaluador`
--
ALTER TABLE `evaluador`
  MODIFY `Evaluador_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `Exa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `Gr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `Pr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `Res_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `fk_Examen_Evaluador1` FOREIGN KEY (`Evaluador_Evaluador_id`) REFERENCES `evaluador` (`Evaluador_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `fk_Grupo_Evaluador` FOREIGN KEY (`Evaluador_Evaluador_id`) REFERENCES `evaluador` (`Evaluador_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupos_evaluado`
--
ALTER TABLE `grupos_evaluado`
  ADD CONSTRAINT `fk_Grupos_Evaluado_Evaluado1` FOREIGN KEY (`Evaluado_Eva_id`) REFERENCES `evaluado` (`Eva_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Grupos_Evaluado_Grupo1` FOREIGN KEY (`Grupo_Gr_id`) REFERENCES `grupo` (`Gr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupos_evaluador`
--
ALTER TABLE `grupos_evaluador`
  ADD CONSTRAINT `fk_Grupos_Evaluador_Evaluador1` FOREIGN KEY (`Evaluador_Evaluador_id`) REFERENCES `evaluador` (`Evaluador_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Grupos_Evaluador_Grupo1` FOREIGN KEY (`Grupo_Gr_id`) REFERENCES `grupo` (`Gr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupo_examenes`
--
ALTER TABLE `grupo_examenes`
  ADD CONSTRAINT `fk_Examenes_Examen1` FOREIGN KEY (`Examen_Exa_id`) REFERENCES `examen` (`Exa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Examenes_Grupo1` FOREIGN KEY (`Grupo_Gr_id`) REFERENCES `grupo` (`Gr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `fk_Pregunta_Evaluador1` FOREIGN KEY (`Evaluador_Evaluador_id`) REFERENCES `evaluador` (`Evaluador_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preguntas_en_examen`
--
ALTER TABLE `preguntas_en_examen`
  ADD CONSTRAINT `fk_Preguntas_En_Examen_Examen1` FOREIGN KEY (`Examen_Exa_id`) REFERENCES `examen` (`Exa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Preguntas_En_Examen_Pregunta1` FOREIGN KEY (`Pregunta_Pr_id`) REFERENCES `pregunta` (`Pr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `fk_Respuesta_Pregunta1` FOREIGN KEY (`Pregunta_Pr_id`) REFERENCES `pregunta` (`Pr_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
