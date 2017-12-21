-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: online_shop
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birthdate` date NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `postal` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `active` int(11) DEFAULT '0',
  `deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Juergen','Erickson','2017-12-19 12:20:42','1987-09-21','49034185','Leipzig','Friedrichstrasse 13','12958','Juergen8826@gmx.de',0,'2017-12-18 11:58:19'),(2,'Monika','Brueckner','2017-12-18 12:44:36','1970-09-09','49160504','Erfurt','Hauptstrasse 35','17676','Monika6035@hotmail.com',0,'2017-12-18 13:44:36'),(3,'Paul','Erickson','2017-12-12 10:59:27','1987-09-24','49945098','Dortmund','Fegenweg 23','19229','Paul9497@gmx.de',0,NULL),(4,'Peter','Wolta','2017-12-12 10:59:27','1978-12-13','49829711','Dortmund','Bornholmer Strasse 48','15627','Peter9802@googlemail.com',0,NULL),(5,'Katarina','Pechstein','2017-12-19 12:20:42','1974-09-29','49691059','Koeln','Fegenweg 52','18716','Katarina6648@googlemail.com',1,NULL),(6,'Ferdinand','Mueller','2017-12-12 10:59:27','1982-11-12','49048421','Muenchen','Bahnhofstrasse 69','11347','Ferdinand10375@yahoo.com',0,NULL),(7,'Anna','Oberbaum','2017-12-12 10:59:27','1986-10-26','49785464','Dortmund','Bornholmer Strasse 68','10569','Anna11488@gmx.de',0,NULL),(8,'Judith','Meier','2017-12-19 12:20:42','1976-09-30','49312371','Berlin','Fegenweg 42','10166','Judith8872@googlemail.com',1,NULL),(9,'Ferdinand','Torres','2017-12-12 10:59:27','1990-10-24','49510488','Duesseldorf','Fegenweg 24','10712','Ferdinand8568@gmail.com',0,NULL),(10,'Markus','Torres','2017-12-12 12:34:23','1981-12-14','49389585','Koeln','Bornholmer Strasse 36','10867','Markus11668@gmail.com',1,NULL),(11,'Nacho','Merino','2017-12-18 12:31:53','1991-12-30','49883124','Dortmund','Kottbusser Damm 73','18149','Achim8365@googlemail.com',0,NULL),(12,'Nacho','Merino','2017-12-18 10:46:40','1975-09-26','49152191','Koeln','Fegenweg 68','19206','Julia11890@googlemail.com',0,NULL),(13,'Achim','Rudolf','2017-12-12 10:59:27','1970-09-13','49784637','Leipzig','Friedrichstrasse 89','19842','Achim7713@yahoo.com',0,NULL),(14,'Nacho','Merino','2017-12-19 12:17:58','1986-11-07','49768194','Koeln','Papel Alle 61','16075','Anna9789@gmx.de',1,NULL),(15,'Hannes','Drechsler','2017-12-12 10:59:27','1974-11-07','49100550','Duesseldorf','Ullsteinweg 93','19967','Hannes9030@gmail.com',0,NULL),(16,'Paul','Wolta','2017-12-12 10:59:27','1980-09-24','49463360','Leipzig','Bahnhofstrasse 67','13577','Paul6964@yahoo.com',0,NULL),(17,'Achim','Ziegler','2017-12-19 12:17:58','1970-10-12','49080440','Muenchen','PepaPig 76','13472','Achim3113@gmx.de',1,NULL),(18,'Markus','Monser','2017-12-12 10:59:27','1980-11-25','49077298','Koeln','Bornholmer Strasse 51','16030','Markus9047@hotmail.com',0,NULL),(19,'Nacho','Merino','2017-12-19 10:11:00','1988-10-17','4903432324','Schmalkalden','Martin Luther Ring 12','27123','ugu@asdasd.com',0,NULL),(20,'Nacho','Merino','2017-12-12 14:52:52','2015-08-08','492032323577','Berlin','herestrasse 83','13142','nachoemails@eamsl.com',0,NULL),(21,'Katarina','Wolta','2017-12-12 10:59:27','1989-12-08','49981008','Dortmund','Bornholmer Strasse 70','16737','Katarina4905@googlemail.com',0,NULL),(22,'Peter','Tischler','2017-12-19 12:20:42','1983-10-22','49310929','Dortmund','Hauptstrasse 56','11925','Peter11485@gmx.net',1,NULL),(23,'Anatol','Otto','2017-12-12 10:59:27','1988-11-09','49922444','Erfurt','Bornholmer Strasse 6','16035','Anatol3907@hotmail.com',0,NULL),(24,'Ferdinand','Mueller','2017-12-12 10:59:27','1988-11-28','49326416','Berlin','Ullsteinweg 85','15167','Ferdinand6422@googlemail.com',0,NULL),(25,'Ferdinand','Mueller','2017-12-12 10:59:27','1976-09-04','49922832','Koeln','Bornholmer Strasse 1','14674','Ferdinand6315@yahoo.com',0,NULL),(26,'Hannes','Oberbaum','2017-12-12 10:59:27','1974-11-28','49437395','Berlin','Bahnhofstrasse 52','13440','Hannes10849@gmail.com',0,NULL),(27,'Judith','Erickson','2017-12-12 10:59:27','1972-09-06','49373362','Muenchen','Fegenweg 87','17781','Judith2912@googlemail.com',0,NULL),(28,'Achim','Schmidt','2017-12-12 10:59:27','1989-11-15','49860569','Berlin','Fegenweg 39','11001','Achim2979@googlemail.com',0,NULL),(29,'Kevin','Ziegler','2017-12-19 12:20:42','1977-12-16','49976601','Muenchen','Friedrichstrasse 99','12457','Kevin7615@hotmail.com',1,NULL),(30,'Barbara','Pechstein','2017-12-12 10:59:27','1986-10-08','49947142','Duesseldorf','Friedrichstrasse 87','19643','Barbara2394@gmx.net',0,NULL),(31,'Paul','Tischler','2017-12-12 10:59:27','1980-11-08','49376409','Koeln','Bahnhofstrasse 84','17933','Paul6831@gmail.com',0,NULL),(32,'Achim','Wohlgefahrt','2017-12-12 10:59:27','1991-12-25','49105386','Muenchen','Fegenweg 16','19956','Achim9955@googlemail.com',0,NULL),(33,'Paul','Schulz','2017-12-12 10:59:27','1990-10-10','49619759','Duesseldorf','Ullsteinweg 39','12175','Paul9739@gmx.de',0,NULL),(34,'Kristin','Wolta','2017-12-12 10:59:27','1991-12-11','49574550','Leipzig','Bahnhofstrasse 15','19845','Kristin6655@hotmail.com',0,NULL),(35,'Peter','Torres','2017-12-12 10:59:27','1975-09-08','49243822','Leipzig','Hauptstrasse 21','11374','Peter3370@yahoo.com',0,NULL),(36,'Achim','Rudolf','2017-12-12 10:59:27','1971-10-17','49827562','Dortmund','Bundesalle 60','10798','Achim2841@googlemail.com',0,NULL),(37,'Ulrike','Brueckner','2017-12-19 12:20:42','1988-09-29','49936883','Erfurt','Bundesalle 70','10403','Ulrike11394@hotmail.com',1,NULL),(38,'Hans','Tischler','2017-12-12 10:59:27','1973-11-15','49337333','Duesseldorf','Hauptstrasse 55','11413','Hans2422@hotmail.com',0,NULL),(39,'Anna','Schulz','2017-12-12 10:59:27','1985-11-18','49699513','Muenchen','Friedrichstrasse 67','13261','Anna5464@gmail.com',0,NULL),(40,'Hans','Drechsler','2017-12-12 10:59:27','1978-12-26','49158467','Erfurt','Fegenweg 3','10880','Hans6627@gmail.com',0,NULL),(41,'Lorenz','Mueller','2017-12-12 10:59:27','1990-09-15','49834767','Koeln','Ullsteinweg 97','10378','Lorenz5426@gmail.com',0,NULL),(42,'Jens','Drechsler','2017-12-19 12:20:42','1987-12-20','49026885','Duesseldorf','Hauptstrasse 14','15198','Jens9586@yahoo.com',1,NULL),(43,'Johnathan','Monser','2017-12-12 10:59:27','1988-11-08','49859521','Duesseldorf','Ullsteinweg 66','11905','Johnathan6349@hotmail.com',0,NULL),(44,'Kevin','Kleinschmidt','2017-12-12 10:59:27','1985-10-18','49675856','Berlin','Bundesalle 26','15097','Kevin7352@googlemail.com',0,NULL),(45,'Jens','Mueller','2017-12-19 12:20:42','1975-12-19','49195804','Koeln','Kottbusser Damm 47','14177','Jens5534@yahoo.com',1,NULL),(46,'Ulrike','Rudolf','2017-12-12 10:59:27','1981-09-23','49230307','Berlin','Ullsteinweg 59','14879','Ulrike3715@hotmail.com',0,NULL),(47,'Joachim','Torres','2017-12-12 10:59:27','1975-12-30','49794477','Koeln','Friedrichstrasse 91','14390','Joachim3302@googlemail.com',0,NULL),(48,'Paul','Meier','2017-12-12 10:59:27','1980-10-30','49877465','Koeln','Kottbusser Damm 53','16911','Paul3693@hotmail.com',0,NULL),(49,'Markus','Otto','2017-12-19 12:20:42','1971-12-28','49706433','Muenchen','Kottbusser Damm 14','18087','Markus8157@yahoo.com',1,NULL),(50,'Peter','Friedel','2017-12-12 13:15:25','1988-09-30','49152783','Leipzig','Hauptstrasse 77','16736','Peter3368@yahoo.com',0,NULL),(51,'andrea','sad','2017-12-12 13:39:27','2017-09-07','493032923','berlin','any strett','32323','esae@asdas.com',0,NULL),(52,'Andrew','Grants','2017-12-12 13:50:32','1990-02-12','492032323','Berlin','herestrasse 83','13142','emails@eamsl.com',0,NULL),(53,'Nacho','Merino','2017-12-12 14:07:53','1986-01-26','492032323577','Berlin','herestrasse 83','13142','nachoemails@eamsl.com',0,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,0,18,1350),(2,1,16,1150),(3,1,13,850),(4,1,5,450),(5,2,19,1450),(6,2,9,550),(7,3,12,750),(8,4,8,450),(9,5,12,750),(10,5,10,650),(11,5,11,750),(12,6,6,550),(13,6,4,350),(14,7,22,1750),(15,7,19,1450),(16,8,5,450),(17,8,20,1550),(18,9,23,1850),(19,9,5,450),(20,10,21,1650),(21,11,6,550),(22,11,8,450),(23,11,19,1450),(24,12,12,750),(25,12,10,650),(26,13,21,1650),(27,14,0,500),(28,15,17,1250),(29,15,20,1550),(30,16,6,550),(31,16,13,850),(32,16,18,1350),(33,17,9,550),(34,17,16,1150),(35,18,9,550),(36,18,0,500),(37,18,13,850),(38,19,3,800),(39,19,8,450),(40,20,8,450),(41,20,0,500),(42,20,20,1550),(43,21,7,650),(44,22,14,950),(45,23,14,950),(46,24,0,500),(47,25,1,600),(48,25,12,750),(49,25,18,1350),(50,26,23,1850),(51,26,16,1150),(52,26,10,650),(53,27,22,1750),(54,27,18,1350),(55,28,16,1150),(56,28,8,450),(57,28,6,550),(58,29,15,1050),(59,30,19,1450),(60,30,7,650),(61,30,18,1350),(62,31,6,550),(63,31,14,950),(64,32,13,850),(65,32,9,550),(66,32,10,650),(67,33,12,750),(68,34,1,600),(69,34,18,1350),(70,35,15,1050),(71,35,7,650),(72,36,11,750),(73,36,1,600),(74,36,5,450),(75,37,17,1250),(76,37,18,1350),(77,38,12,750),(78,38,21,1650),(79,39,21,1650),(80,40,22,1750),(81,40,6,550),(82,41,21,1650),(83,41,5,450),(84,41,12,750),(85,42,15,1050),(86,42,9,550),(87,43,19,1450),(88,43,13,850),(89,44,2,700),(90,44,22,1750),(91,45,4,350),(92,45,7,650),(93,46,8,450),(94,47,7,650),(95,47,18,1350),(96,47,4,350),(97,48,0,500),(98,48,19,1450),(99,48,13,850),(100,49,13,850),(101,49,21,1650),(102,50,10,650),(103,51,12,750),(104,52,6,550),(105,52,21,1650),(106,53,11,750),(107,53,10,650),(108,54,18,1350),(109,55,5,450),(110,55,5,450),(111,56,12,750),(112,57,3,800),(113,58,16,1150),(114,58,10,650),(115,59,7,650),(116,60,5,450),(117,61,1,600),(118,62,14,950),(119,63,22,1750),(120,63,10,650),(121,63,14,950),(122,64,15,1050),(123,64,4,350),(124,64,12,750),(125,65,6,550),(126,65,7,650),(127,65,18,1350),(128,66,9,550),(129,67,20,1550),(130,67,15,1050),(131,68,15,1050),(132,68,8,450),(133,68,12,750),(134,69,14,950),(135,69,15,1050),(136,70,20,1550),(137,70,17,1250),(138,71,11,750),(139,71,17,1250),(140,72,0,500),(141,73,5,450),(142,74,23,1850),(143,75,15,1050),(144,75,4,350),(145,75,6,550),(146,76,15,1050),(147,76,20,1550),(148,77,18,1350),(149,77,4,350),(150,77,23,1850),(151,78,17,1250),(152,79,7,650),(153,80,7,650),(154,80,20,1550),(155,81,13,850),(156,82,15,1050),(157,83,2,700),(158,84,13,850),(159,84,4,350),(160,45,32,4545),(171,105,56,565);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `paid` timestamp NULL DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,'2017-12-19 13:28:24',NULL,3),(2,3,'2017-12-19 13:28:24','2011-12-02 15:40:25',2),(3,4,'2017-12-19 13:28:24','2013-11-03 22:05:46',4),(4,4,'2017-12-19 13:28:24',NULL,1),(5,6,'2017-12-19 13:28:24','2012-02-11 22:18:54',2),(6,6,'2017-12-19 13:28:24','2012-08-11 21:18:40',4),(7,6,'2017-12-19 13:28:24','2012-06-01 21:19:23',3),(8,7,'2017-12-19 13:28:24','2011-02-09 15:16:21',2),(9,8,'2011-10-31 21:31:18','2011-11-09 21:33:16',NULL),(10,8,'2012-07-31 20:31:18','2012-08-13 20:32:19',NULL),(11,9,'2010-10-31 18:19:37','2010-11-09 18:21:14',NULL),(12,9,'2010-11-30 18:19:37','2010-11-30 18:21:20',NULL),(13,9,'2010-12-31 18:19:37',NULL,NULL),(14,10,'2011-01-30 22:22:15','2011-02-04 22:22:35',NULL),(15,11,'2011-02-28 17:16:09','2011-03-04 17:17:24',NULL),(16,12,'2011-04-30 19:51:54','2011-05-05 19:53:46',NULL),(17,12,'2011-08-30 19:51:54','2011-09-06 19:53:15',NULL),(18,12,'2011-08-30 19:51:54','2011-09-07 19:53:23',NULL),(19,13,'2012-03-30 21:57:18',NULL,NULL),(20,13,'2012-01-30 22:57:18','2012-02-11 22:58:13',NULL),(21,14,'2014-01-30 19:41:08','2014-02-05 19:41:34',NULL),(22,14,'2013-10-30 19:41:08','2013-10-31 19:42:27',NULL),(23,15,'2011-09-28 21:05:07','2011-10-05 21:05:16',NULL),(24,15,'2011-05-28 21:05:07','2011-06-08 21:05:59',NULL),(25,16,'2011-04-30 18:40:58','2011-05-13 18:41:02',NULL),(26,16,'2010-08-31 18:40:58','2010-09-02 18:42:19',NULL),(27,17,'2012-06-30 17:05:43','2012-07-12 17:06:40',NULL),(28,17,'2011-09-30 17:05:43','2011-10-03 17:07:05',NULL),(29,17,'2011-09-30 17:05:43',NULL,NULL),(30,18,'2011-05-30 14:26:41','2011-05-30 14:27:43',NULL),(31,19,'2013-11-30 16:34:47','2013-12-05 16:35:06',NULL),(32,19,'2013-11-30 16:34:47','2013-12-03 16:34:51',NULL),(33,19,'2013-12-31 16:34:47',NULL,NULL),(34,20,'2010-08-30 21:20:45','2010-09-01 21:22:11',NULL),(35,20,'2010-09-30 21:20:45','2010-10-02 21:20:57',NULL),(36,22,'2012-07-30 21:38:53','2012-08-05 21:39:06',NULL),(37,22,'2013-03-30 22:38:53','2013-04-02 21:39:57',NULL),(38,22,'2012-07-30 21:38:53','2012-07-30 21:40:14',NULL),(39,23,'2013-08-31 16:19:27','2013-09-02 16:19:54',NULL),(40,23,'2013-11-30 17:19:27','2013-12-08 17:19:32',NULL),(41,23,'2013-07-31 16:19:27','2013-08-06 16:19:51',NULL),(42,24,'2010-02-28 16:57:06','2010-03-05 16:57:30',NULL),(43,24,'2010-07-31 15:57:06','2010-08-07 15:57:35',NULL),(44,24,'2010-04-30 15:57:06','2010-05-11 15:57:51',NULL),(45,25,'2014-01-30 20:11:18','2014-02-04 20:12:31',NULL),(46,27,'2011-04-30 20:08:00','2011-05-10 20:09:49',NULL),(47,27,'2012-01-30 21:08:00','2012-02-08 21:09:39',NULL),(48,28,'2012-11-30 16:58:54',NULL,NULL),(49,29,'2013-01-31 22:36:14','2013-02-11 22:36:21',NULL),(50,29,'2013-07-31 21:36:14','2013-08-05 21:37:44',NULL),(51,29,'2013-07-31 21:36:14','2013-08-11 21:37:48',NULL),(52,31,'2012-08-31 21:55:32','2012-09-02 21:55:58',NULL),(53,31,'2012-06-30 21:55:32','2012-07-08 21:56:01',NULL),(54,31,'2013-02-28 22:55:32','2013-03-02 22:56:34',NULL),(55,32,'2014-03-31 18:41:42','2014-04-02 18:43:02',NULL),(56,32,'2014-01-31 19:41:42','2014-02-12 19:42:45',NULL),(57,33,'2012-03-30 17:27:43','2012-04-05 17:29:07',NULL),(58,34,'2013-08-28 20:49:56',NULL,NULL),(59,34,'2013-07-28 20:49:56','2013-08-04 20:50:00',NULL),(60,36,'2013-10-31 16:54:02','2013-11-06 16:54:36',NULL),(61,36,'2013-11-30 16:54:02','2013-12-10 16:55:02',NULL),(62,36,'2014-02-28 16:54:02','2014-03-03 16:54:50',NULL),(63,37,'2012-01-31 21:24:59','2012-02-03 21:26:07',NULL),(64,37,'2012-06-30 20:24:59','2012-07-10 20:25:47',NULL),(65,37,'2011-11-30 21:24:59','2011-12-03 21:26:52',NULL),(66,38,'2013-12-30 16:37:58','2014-01-05 16:39:16',NULL),(67,38,'2013-12-30 16:37:58','2013-12-30 16:38:17',NULL),(68,39,'2011-03-28 15:54:03','2011-04-07 15:54:43',NULL),(69,39,'2011-05-28 15:54:03',NULL,NULL),(70,39,'2011-04-28 15:54:03','2011-05-08 15:54:20',NULL),(71,40,'2013-07-31 18:35:41',NULL,NULL),(72,40,'2013-04-30 18:35:41','2013-05-12 18:36:19',NULL),(73,40,'2013-06-30 18:35:41','2013-07-04 18:36:22',NULL),(74,42,'2011-04-30 19:20:33','2011-05-03 19:21:50',NULL),(75,42,'2011-07-31 19:20:33','2011-08-04 19:21:51',NULL),(76,42,'2011-03-31 19:20:33','2011-04-13 19:20:50',NULL),(77,44,'2013-09-30 18:30:21','2013-10-10 18:32:14',NULL),(78,44,'2014-01-30 19:30:21','2014-02-02 19:30:26',NULL),(79,44,'2013-08-30 18:30:21','2013-09-10 18:31:01',NULL),(80,45,'2011-10-30 18:59:35','2011-11-04 19:01:07',NULL),(81,45,'2012-02-29 18:59:35','2012-03-09 19:00:55',NULL),(82,45,'2012-05-30 17:59:35','2012-06-09 17:59:35',NULL),(83,46,'2010-08-31 18:25:51','2010-09-13 18:27:30',NULL),(84,48,'2011-02-28 19:52:05','2011-03-09 19:53:12',NULL),(85,45,'2012-05-30 17:59:35','2012-03-09 19:00:55',NULL),(105,43,'2017-12-19 14:42:46',NULL,3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `method` varchar(45) DEFAULT NULL,
  `icon` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'paypal','http://pngimg.com/uploads/paypal/paypal_PNG21.png'),(2,'visa','https://www.oroyfinanzas.com/files/2015/05/visa.png'),(3,'sepa','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Single_Euro_Payments_Area_logo.svg/1280px-Single_Euro_Payments_Area_logo.svg.png'),(4,'bitcoin','https://8356-presscdn-0-69-pagely.netdna-ssl.com/wp-content/uploads/2013/04/bitcoin.png');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (0,'PC'),(1,'Laptop'),(2,'Mac'),(3,'SmartPhone');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (0,'Dell 1000',500,0),(1,'Dell 2000',600,0),(2,'Dell 3000',700,0),(3,'Dell 4000',800,0),(4,'HP Workstation 1',350,0),(5,'HP Workstation 2',450,0),(6,'HP Workstation 3',550,0),(7,'HP Workstation 4',650,0),(8,'HP Probook 1100',450,1),(9,'HP Probook 2100',550,1),(10,'HP Probook 3100',650,1),(11,'HP Probook 4100',750,1),(12,'Sony Vaio x1',750,1),(13,'Sony Vaio x2',850,1),(14,'Sony Vaio x3',950,1),(15,'Sony Vaio x4',1050,1),(16,'MacBook Pro 1',1150,2),(17,'MacBook Pro 2',1250,2),(18,'MacBook Pro 3',1350,2),(19,'MacBook Pro 4',1450,2),(20,'MacBook Pro 5',1550,2),(21,'MacBook Pro 6',1650,2),(22,'MacBook Pro 7',1750,2),(23,'MacBook Pro 8',1850,2),(24,'Samsung Galaxy S6',390,3),(25,'Samsung Galaxy S7',578,3),(26,'Samsung Galaxy S8',800,3),(27,'Iphone 10',1200,3),(28,'Iphone 11',1400,3),(29,'Iphone 12',1700,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-20 23:49:46
