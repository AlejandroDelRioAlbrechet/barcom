-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.1.63-community-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL version:             7.0.0.4053
-- Date/time:                    2013-09-07 21:32:52
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping database structure for barcom
DROP DATABASE IF EXISTS `barcom`;
CREATE DATABASE IF NOT EXISTS `barcom` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `barcom`;


-- Dumping structure for table barcom.barcom_users
DROP TABLE IF EXISTS `barcom_users`;
CREATE TABLE IF NOT EXISTS `barcom_users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `login` varchar(200) NOT NULL DEFAULT '0',
  `password` varchar(300) NOT NULL DEFAULT '0',
  `first_name` varchar(300) NOT NULL DEFAULT '0',
  `last_name` varchar(300) NOT NULL DEFAULT '0',
  `email` varchar(300) NOT NULL DEFAULT '0',
  `phone_number` varchar(300) NOT NULL DEFAULT '0',
  `adress` varchar(300) DEFAULT '0',
  `role_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table barcom.barcom_users: ~1 rows (approximately)
/*!40000 ALTER TABLE `barcom_users` DISABLE KEYS */;
INSERT INTO `barcom_users` (`id`, `login`, `password`, `first_name`, `last_name`, `email`, `phone_number`, `adress`, `role_id`) VALUES
	(1, 'admin', 'admin', 'admin', 'Admin', 'admin@mail.com', '+380977765586', 'Lviv prirodna 10', 1);
/*!40000 ALTER TABLE `barcom_users` ENABLE KEYS */;


-- Dumping structure for table barcom.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT '0',
  `module_access` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table barcom.roles: ~2 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `role_name`, `module_access`) VALUES
	(2, 'admin', 'all'),
	(4, 'worker_', 'view_tasks');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
