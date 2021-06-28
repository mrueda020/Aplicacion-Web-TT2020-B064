-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-06-2021 a las 23:11:09
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

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
  `idAdmin` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `ApPaterno` varchar(45) NOT NULL,
  `ApMaterno` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`idAdmin`, `Nombre`, `ApPaterno`, `ApMaterno`, `Email`, `Password`) VALUES
(1, 'Miguel', 'Rueda', 'Carbajal', 'mrueda020@hotmail.com', '$2y$10$/gD4KY1q4Gb2fPjhwexzGeqOeBjZ5AxEMK1Q2rVXTzpcJ9uo7o6QG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `idArea` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`idArea`, `Nombre`) VALUES
(1, 'area1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `Pregunta_idPregunta` int(11) NOT NULL,
  `Area_idArea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluado`
--

CREATE TABLE `evaluado` (
  `idEvaluado` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `ApPaterno` varchar(255) NOT NULL,
  `ApMaterno` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluador`
--

CREATE TABLE `evaluador` (
  `idEvaluador` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `ApPaterno` varchar(45) NOT NULL,
  `ApMaterno` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evaluador`
--

INSERT INTO `evaluador` (`idEvaluador`, `Nombre`, `ApPaterno`, `ApMaterno`, `Email`, `Password`) VALUES
(1, 'Miguel', 'Rueda', 'Carbajal', 'mrueda020@hotmail.com', '$2y$10$iDZANP8JcMPIoWcvPbGM1OkqPiMENYHwOnsLwTR4vD/YocC7DSCtG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `idExamen` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(45) NOT NULL,
  `FechaAplicacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Evaluador_idEvaluador_Creador` int(11) NOT NULL,
  `TipoDeExamen` varchar(45) NOT NULL,
  `NoPreguntas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `Evaluador_idEvaluador` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_evaluado`
--

CREATE TABLE `grupos_evaluado` (
  `Evaluado_idEvaluado` int(11) NOT NULL,
  `Grupo_idGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_evaluador`
--

CREATE TABLE `grupos_evaluador` (
  `Evaluador_idEvaluador` int(11) NOT NULL,
  `Grupo_idGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo_examenes`
--

CREATE TABLE `grupo_examenes` (
  `Grupo_idGrupo` int(11) NOT NULL,
  `Examen_idExamen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `idPregunta` int(11) NOT NULL,
  `Pregunta` longtext NOT NULL,
  `Evaluador_idEvaluador_Creador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`idPregunta`, `Pregunta`, `Evaluador_idEvaluador_Creador`) VALUES
(36, 'Pregunta 1', 1),
(37, 'Pregunta 1', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_en_examen`
--

CREATE TABLE `preguntas_en_examen` (
  `Examen_idExamen` int(11) NOT NULL,
  `Pregunta_idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `idRespuesta` int(11) NOT NULL,
  `Respuesta` longtext NOT NULL,
  `esCorrecta` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`idRespuesta`, `Respuesta`, `esCorrecta`) VALUES
(17, '1', 0),
(18, '2', 0),
(19, '3', 1),
(20, '4', 0),
(21, '1', 0),
(22, '2', 0),
(23, '3', 1),
(24, '4', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_en_preguntas`
--

CREATE TABLE `respuestas_en_preguntas` (
  `Pregunta_idPregunta` int(11) NOT NULL,
  `Respuesta_idRespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `respuestas_en_preguntas`
--

INSERT INTO `respuestas_en_preguntas` (`Pregunta_idPregunta`, `Respuesta_idRespuesta`) VALUES
(36, 17),
(36, 18),
(36, 19),
(36, 20),
(37, 21),
(37, 22),
(37, 23),
(37, 24);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`idArea`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`Pregunta_idPregunta`,`Area_idArea`),
  ADD KEY `fk_Areas_Area1_idx` (`Area_idArea`);

--
-- Indices de la tabla `evaluado`
--
ALTER TABLE `evaluado`
  ADD PRIMARY KEY (`idEvaluado`);

--
-- Indices de la tabla `evaluador`
--
ALTER TABLE `evaluador`
  ADD PRIMARY KEY (`idEvaluador`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`idExamen`),
  ADD KEY `fk_Examen_Evaluador1_idx` (`Evaluador_idEvaluador_Creador`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`),
  ADD KEY `fk_Grupo_Evaluador_idx` (`Evaluador_idEvaluador`);

--
-- Indices de la tabla `grupos_evaluado`
--
ALTER TABLE `grupos_evaluado`
  ADD KEY `fk_Grupos_Evaluado_Grupo1_idx` (`Grupo_idGrupo`),
  ADD KEY `fk_Grupos_Evaluado_Evaluado1` (`Evaluado_idEvaluado`);

--
-- Indices de la tabla `grupos_evaluador`
--
ALTER TABLE `grupos_evaluador`
  ADD KEY `fk_Grupos_Evaluador_Evaluador1_idx` (`Evaluador_idEvaluador`),
  ADD KEY `fk_Grupos_Evaluador_Grupo1_idx` (`Grupo_idGrupo`);

--
-- Indices de la tabla `grupo_examenes`
--
ALTER TABLE `grupo_examenes`
  ADD KEY `fk_Examenes_Grupo1_idx` (`Grupo_idGrupo`),
  ADD KEY `fk_Examenes_Examen1_idx` (`Examen_idExamen`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`idPregunta`),
  ADD KEY `fk_Pregunta_Evaluador1_idx` (`Evaluador_idEvaluador_Creador`);

--
-- Indices de la tabla `preguntas_en_examen`
--
ALTER TABLE `preguntas_en_examen`
  ADD KEY `fk_Preguntas_En_Examen_Examen1_idx` (`Examen_idExamen`),
  ADD KEY `fk_Preguntas_En_Examen_Pregunta1_idx` (`Pregunta_idPregunta`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`idRespuesta`);

--
-- Indices de la tabla `respuestas_en_preguntas`
--
ALTER TABLE `respuestas_en_preguntas`
  ADD PRIMARY KEY (`Pregunta_idPregunta`,`Respuesta_idRespuesta`),
  ADD KEY `fk_Respuestas_En_Preguntas_Pregunta1_idx` (`Pregunta_idPregunta`),
  ADD KEY `fk_Respuestas_En_Preguntas_Respuesta1_idx` (`Respuesta_idRespuesta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `idArea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluado`
--
ALTER TABLE `evaluado`
  MODIFY `idEvaluado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluador`
--
ALTER TABLE `evaluador`
  MODIFY `idEvaluador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `fk_Areas_Area1` FOREIGN KEY (`Area_idArea`) REFERENCES `area` (`idArea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Areas_Pregunta1` FOREIGN KEY (`Pregunta_idPregunta`) REFERENCES `pregunta` (`idPregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `fk_Examen_Evaluador1` FOREIGN KEY (`Evaluador_idEvaluador_Creador`) REFERENCES `evaluador` (`idEvaluador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `fk_Grupo_Evaluador` FOREIGN KEY (`Evaluador_idEvaluador`) REFERENCES `evaluador` (`idEvaluador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `grupos_evaluado`
--
ALTER TABLE `grupos_evaluado`
  ADD CONSTRAINT `fk_Grupos_Evaluado_Evaluado1` FOREIGN KEY (`Evaluado_idEvaluado`) REFERENCES `evaluado` (`idEvaluado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Grupos_Evaluado_Grupo1` FOREIGN KEY (`Grupo_idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `grupos_evaluador`
--
ALTER TABLE `grupos_evaluador`
  ADD CONSTRAINT `fk_Grupos_Evaluador_Evaluador1` FOREIGN KEY (`Evaluador_idEvaluador`) REFERENCES `evaluador` (`idEvaluador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Grupos_Evaluador_Grupo1` FOREIGN KEY (`Grupo_idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `grupo_examenes`
--
ALTER TABLE `grupo_examenes`
  ADD CONSTRAINT `fk_Examenes_Examen1` FOREIGN KEY (`Examen_idExamen`) REFERENCES `examen` (`idExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Examenes_Grupo1` FOREIGN KEY (`Grupo_idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `fk_Pregunta_Evaluador1` FOREIGN KEY (`Evaluador_idEvaluador_Creador`) REFERENCES `evaluador` (`idEvaluador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `preguntas_en_examen`
--
ALTER TABLE `preguntas_en_examen`
  ADD CONSTRAINT `fk_Preguntas_En_Examen_Examen1` FOREIGN KEY (`Examen_idExamen`) REFERENCES `examen` (`idExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Preguntas_En_Examen_Pregunta1` FOREIGN KEY (`Pregunta_idPregunta`) REFERENCES `pregunta` (`idPregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuestas_en_preguntas`
--
ALTER TABLE `respuestas_en_preguntas`
  ADD CONSTRAINT `fk_Respuestas_En_Preguntas_Pregunta1` FOREIGN KEY (`Pregunta_idPregunta`) REFERENCES `pregunta` (`idPregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Respuestas_En_Preguntas_Respuesta1` FOREIGN KEY (`Respuesta_idRespuesta`) REFERENCES `respuesta` (`idRespuesta`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
