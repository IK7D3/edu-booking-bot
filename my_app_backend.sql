-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2025 at 01:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_app_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `available_times`
--

CREATE TABLE `available_times` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_reserved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `available_times`
--

INSERT INTO `available_times` (`id`, `teacher_id`, `day`, `start_time`, `end_time`, `is_reserved`) VALUES
(1, 1, 'شنبه', '15:00:00', '15:40:00', 0),
(6, 1, 'یک‌شنبه', '17:00:00', '18:00:00', 0),
(8, 1, 'یک‌شنبه', '17:00:00', '18:00:00', 0),
(9, 2, 'شنبه', '23:10:00', '23:30:00', 1),
(10, 2, 'دوشنبه', '15:30:00', '16:00:00', 0),
(11, 1, 'سه‌شنبه', '17:00:00', '18:00:00', 0),
(12, 1, 'چهارشنبه', '15:00:00', '18:00:00', 1),
(13, 1, 'پنج‌شنبه', '17:00:00', '18:00:00', 0),
(14, 1, 'سه‌شنبه', '15:00:00', '15:30:00', 0),
(15, 3, 'یکشنبه', '12:00:00', '13:00:00', 1),
(16, 3, 'دوشنبه', '12:00:00', '13:00:00', 0),
(19, 1, 'سه‌شنبه', '08:00:00', '10:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `userTelegramId` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `available_time_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `userTelegramId`, `teacher_id`, `available_time_id`) VALUES
(25, '11', 1, 12),
(26, '11', 3, 15),
(27, '11', 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `field` varchar(255) NOT NULL,
  `team` varchar(255) NOT NULL,
  `avatar_url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `field`, `team`, `avatar_url`) VALUES
(1, 'علی‌محمد لطیف', 'استاد، هیأت علمی فعال', 'گروه هوش مصنوعی و رباتیک', 'https://yazd.ac.ir/peopleimages/alatif.jpg'),
(2, 'فضل‌الله ادیب‌نیا', 'دانشیار، هیأت علمی فعال', 'گروه فناوری اطلاعات', 'https://yazd.ac.ir/peopleimages/fadib.jpg'),
(3, 'محمد‌علی زارع چاهوکی', 'دانشیار، هیأت علمی فعال', 'گروه نرم‌افزار', 'https://yazd.ac.ir/peopleimages/chahooki.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userTelegramId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `stuId` varchar(8) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userTelegramId`, `name`, `lastName`, `stuId`, `phone`, `created_at`, `updated_at`) VALUES
(16, '11', 'ایمان', 'کریمیان', '40022313', '09103404205', '2025-07-08 12:33:03', '2025-07-08 12:33:03'),
(19, '1234567890', 'علی‌محمد', 'لطیف', '00', '00', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `available_times`
--
ALTER TABLE `available_times`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teacher` (`teacher_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_available_time` (`available_time_id`),
  ADD KEY `fk_teacherr` (`teacher_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stuId` (`stuId`),
  ADD UNIQUE KEY `userTelegramId` (`userTelegramId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `available_times`
--
ALTER TABLE `available_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `available_times`
--
ALTER TABLE `available_times`
  ADD CONSTRAINT `fk_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `fk_available_time` FOREIGN KEY (`available_time_id`) REFERENCES `available_times` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_teacherr` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
