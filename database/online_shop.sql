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
  `birthdate` date DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `postal` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `active` int(11) DEFAULT '0',
  `deleted` datetime DEFAULT NULL,
  `pwd` varchar(200) DEFAULT 'halloworld',
  `token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Juergen','Erickson','2018-01-09 13:10:37','1987-09-21','49034185','Leipzig','Friedrichstrasse 13','12958','escatman1@gmail.com',0,'2017-12-18 11:58:19','halloworld',NULL),(2,'Monika','Brueckner','2018-01-09 13:10:37','1970-09-09','49160504','Erfurt','Hauptstrasse 35','17676','escatman2@gmail.com',0,'2017-12-18 13:44:36','halloworld',NULL),(3,'Paul','Erickson','2018-01-09 09:47:38','1987-09-24','49945098','Dortmund','Fegenweg 23','19229','hescatman@gmail.com',0,NULL,'halloworld',NULL),(4,'Peter','Wolta','2018-01-09 09:47:38','1978-12-13','49829711','Dortmund','Bornholmer Strasse 48','15627','hescatman@gmail.com',0,NULL,'halloworld',NULL),(5,'Katarina','Pechstein','2018-01-09 09:47:38','1974-09-29','49691059','Koeln','Fegenweg 52','18716','hescatman@gmail.com',1,NULL,'halloworld',NULL),(6,'Ferdinand','Mueller','2018-01-09 09:47:38','1982-11-12','49048421','Muenchen','Bahnhofstrasse 69','11347','hescatman@gmail.com',0,NULL,'halloworld',NULL),(7,'Anna','Oberbaum','2018-01-09 09:47:38','1986-10-26','49785464','Dortmund','Bornholmer Strasse 68','10569','hescatman@gmail.com',0,NULL,'halloworld',NULL),(8,'Judith','Meier','2018-01-09 09:47:38','1976-09-30','49312371','Berlin','Fegenweg 42','10166','hescatman@gmail.com',1,NULL,'halloworld',NULL),(9,'Ferdinand','Torres','2018-01-09 09:47:38','1990-10-24','49510488','Duesseldorf','Fegenweg 24','10712','hescatman@gmail.com',0,NULL,'halloworld',NULL),(10,'Markus','Torres','2018-01-09 09:47:38','1981-12-14','49389585','Koeln','Bornholmer Strasse 36','10867','hescatman@gmail.com',1,NULL,'halloworld',NULL),(11,'Nacho','Merino','2018-01-09 09:47:38','1991-12-30','49883124','Dortmund','Kottbusser Damm 73','18149','hescatman@gmail.com',0,NULL,'halloworld',NULL),(12,'Nacho','Merino','2018-01-09 09:47:38','1975-09-26','49152191','Koeln','Fegenweg 68','19206','hescatman@gmail.com',0,NULL,'halloworld',NULL),(13,'Achim','Rudolf','2018-01-09 09:47:38','1970-09-13','49784637','Leipzig','Friedrichstrasse 89','19842','hescatman@gmail.com',0,NULL,'halloworld',NULL),(14,'Nacho','Merino','2018-01-09 09:47:38','1986-11-07','49768194','Koeln','Papel Alle 61','16075','hescatman@gmail.com',1,NULL,'halloworld',NULL),(15,'Hannes','Drechsler','2018-01-09 09:47:38','1974-11-07','49100550','Duesseldorf','Ullsteinweg 93','19967','hescatman@gmail.com',0,NULL,'halloworld',NULL),(16,'Paul','Wolta','2018-01-09 09:47:38','1980-09-24','49463360','Leipzig','Bahnhofstrasse 67','13577','hescatman@gmail.com',0,NULL,'halloworld',NULL),(17,'Achim','Ziegler','2018-01-09 09:47:38','1970-10-12','49080440','Muenchen','PepaPig 76','13472','hescatman@gmail.com',1,NULL,'halloworld',NULL),(18,'Markus','Monser','2018-01-09 09:47:38','1980-11-25','49077298','Koeln','Bornholmer Strasse 51','16030','hescatman@gmail.com',0,NULL,'halloworld',NULL),(19,'Nacho','Merino','2018-01-09 09:47:38','1988-10-17','4903432324','Schmalkalden','Martin Luther Ring 12','27123','hescatman@gmail.com',0,NULL,'halloworld',NULL),(20,'Nacho','Merinoaaaxzx','2018-01-11 15:00:15','1986-01-23','492032323577','Berlin','pankow 83','sad13142','escatman@gmail.com',0,NULL,'halloworld',NULL),(21,'Katarina','Wolta','2018-01-09 09:47:38','1989-12-08','49981008','Dortmund','Bornholmer Strasse 70','16737','hescatman@gmail.com',0,NULL,'halloworld',NULL),(22,'Peter','Tischler','2018-01-09 09:47:38','1983-10-22','49310929','Dortmund','Hauptstrasse 56','11925','hescatman@gmail.com',1,NULL,'halloworld',NULL),(23,'Anatol','Otto','2018-01-09 09:47:38','1988-11-09','49922444','Erfurt','Bornholmer Strasse 6','16035','hescatman@gmail.com',0,NULL,'halloworld',NULL),(24,'Ferdinand','Mueller','2018-01-09 09:47:38','1988-11-28','49326416','Berlin','Ullsteinweg 85','15167','hescatman@gmail.com',0,NULL,'halloworld',NULL),(25,'Ferdinand','Mueller','2018-01-09 09:47:38','1976-09-04','49922832','Koeln','Bornholmer Strasse 1','14674','hescatman@gmail.com',0,NULL,'halloworld',NULL),(26,'Hannes','Oberbaum','2018-01-09 09:47:38','1974-11-28','49437395','Berlin','Bahnhofstrasse 52','13440','hescatman@gmail.com',0,NULL,'halloworld',NULL),(27,'Judith','Erickson','2018-01-09 09:47:38','1972-09-06','49373362','Muenchen','Fegenweg 87','17781','hescatman@gmail.com',0,NULL,'halloworld',NULL),(28,'Achim','Schmidt','2018-01-09 09:47:38','1989-11-15','49860569','Berlin','Fegenweg 39','11001','hescatman@gmail.com',0,NULL,'halloworld',NULL),(29,'Kevin','Ziegler','2018-01-09 09:47:38','1977-12-16','49976601','Muenchen','Friedrichstrasse 99','12457','hescatman@gmail.com',1,NULL,'halloworld',NULL),(30,'Barbara','Pechstein','2018-01-09 09:47:38','1986-10-08','49947142','Duesseldorf','Friedrichstrasse 87','19643','hescatman@gmail.com',0,NULL,'halloworld',NULL),(31,'Paul','Tischler','2018-01-09 09:47:38','1980-11-08','49376409','Koeln','Bahnhofstrasse 84','17933','hescatman@gmail.com',0,NULL,'halloworld',NULL),(32,'Achim','Wohlgefahrt','2018-01-09 09:47:38','1991-12-25','49105386','Muenchen','Fegenweg 16','19956','hescatman@gmail.com',0,NULL,'halloworld',NULL),(33,'Paul','Schulz','2018-01-09 09:47:38','1990-10-10','49619759','Duesseldorf','Ullsteinweg 39','12175','hescatman@gmail.com',0,NULL,'halloworld',NULL),(34,'Kristin','Wolta','2018-01-09 09:47:38','1991-12-11','49574550','Leipzig','Bahnhofstrasse 15','19845','hescatman@gmail.com',0,NULL,'halloworld',NULL),(35,'Peter','Torres','2018-01-09 09:47:38','1975-09-08','49243822','Leipzig','Hauptstrasse 21','11374','hescatman@gmail.com',0,NULL,'halloworld',NULL),(36,'Achim','Rudolf','2018-01-09 09:47:38','1971-10-17','49827562','Dortmund','Bundesalle 60','10798','hescatman@gmail.com',0,NULL,'halloworld',NULL),(37,'Ulrike','Brueckner','2018-01-09 09:47:38','1988-09-29','49936883','Erfurt','Bundesalle 70','10403','hescatman@gmail.com',1,NULL,'halloworld',NULL),(38,'Hans','Tischler','2018-01-09 09:47:38','1973-11-15','49337333','Duesseldorf','Hauptstrasse 55','11413','hescatman@gmail.com',0,NULL,'halloworld',NULL),(39,'Anna','Schulz','2018-01-09 09:47:38','1985-11-18','49699513','Muenchen','Friedrichstrasse 67','13261','hescatman@gmail.com',0,NULL,'halloworld',NULL),(40,'Hans','Drechsler','2018-01-09 09:47:38','1978-12-26','49158467','Erfurt','Fegenweg 3','10880','hescatman@gmail.com',0,NULL,'halloworld',NULL),(41,'Lorenz','Mueller','2018-01-09 09:47:38','1990-09-15','49834767','Koeln','Ullsteinweg 97','10378','hescatman@gmail.com',0,NULL,'halloworld',NULL),(42,'Jens','Drechsler','2018-01-09 09:47:38','1987-12-20','49026885','Duesseldorf','Hauptstrasse 14','15198','hescatman@gmail.com',1,NULL,'halloworld',NULL),(43,'Johnathan','Monser','2018-01-09 09:47:38','1988-11-08','49859521','Duesseldorf','Ullsteinweg 66','11905','hescatman@gmail.com',0,NULL,'halloworld',NULL),(44,'Kevin','Kleinschmidt','2018-01-09 09:47:38','1985-10-18','49675856','Berlin','Bundesalle 26','15097','hescatman@gmail.com',0,NULL,'halloworld',NULL),(45,'Jens','Mueller','2018-01-09 09:47:38','1975-12-19','49195804','Koeln','Kottbusser Damm 47','14177','hescatman@gmail.com',1,NULL,'halloworld',NULL),(46,'Ulrike','Rudolf','2018-01-09 09:47:38','1981-09-23','49230307','Berlin','Ullsteinweg 59','14879','hescatman@gmail.com',0,NULL,'halloworld',NULL),(47,'Joachim','Torres','2018-01-09 09:47:38','1975-12-30','49794477','Koeln','Friedrichstrasse 91','14390','hescatman@gmail.com',0,NULL,'halloworld',NULL),(48,'Paul','Meier','2018-01-09 09:47:38','1980-10-30','49877465','Koeln','Kottbusser Damm 53','16911','hescatman@gmail.com',0,NULL,'halloworld',NULL),(49,'Markus','Otto','2018-01-09 09:47:38','1971-12-28','49706433','Muenchen','Kottbusser Damm 14','18087','hescatman@gmail.com',1,NULL,'halloworld',NULL),(50,'Peter','Friedel','2018-01-09 09:47:38','1988-09-30','49152783','Leipzig','Hauptstrasse 77','16736','hescatman@gmail.com',0,NULL,'halloworld',NULL),(51,'andrea','sad','2018-01-09 09:47:38','2017-09-07','493032923','berlin','any strett','32323','hescatman@gmail.com',0,NULL,'halloworld',NULL),(52,'Andrew','Grants','2018-01-09 09:47:38','1990-02-12','492032323','Berlin','herestrasse 83','13142','hescatman@gmail.com',0,NULL,'halloworld',NULL),(53,'Nacho','Merino','2018-01-09 09:47:38','1986-01-26','492032323577','Berlin','herestrasse 83','13142','hescatman@gmail.com',0,NULL,'halloworld',NULL),(54,'CoolName','AwesomeSurname','2018-01-11 09:22:17','2222-02-22',NULL,'A Random City','That is secret','82334','escatman@gmax',0,NULL,'halloworld',NULL),(55,'CoolName','AwesomeSurname','2018-01-11 11:54:20','0111-11-11',NULL,'A Random City','That is secret','82334','QWescatman@gmail.com',0,NULL,'halloworld',NULL),(56,'ROUTER','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','sescatman@gmail.com',0,NULL,'halloworld',NULL),(57,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','xxescatman@gmail.com',0,NULL,'halloworld',NULL),(58,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','xdxescatman@gmail.com',0,NULL,'halloworld',NULL),(59,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','escatman@gmail.comdd',0,NULL,'halloworld',NULL),(60,'CoolNamesdf','AwesomeSurnamesdf','2018-01-11 11:54:20','2001-02-04',NULL,'A Random Citysdf','That is secretsdf','82334sdf','escatman@gmail.comffff',0,NULL,'halloworld',NULL),(61,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','escatman@gmail.comfff',0,NULL,'halloworld',NULL),(62,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','escatman@gmail.comffffsd',0,NULL,'halloworld',NULL),(63,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','escactman@gmail.com',0,NULL,'halloworld',NULL),(64,'CoolName','AwesomeSurname','2018-01-11 11:54:20','2001-02-04',NULL,'A Random City','That is secret','82334','escatmdddan@gmail.com',0,NULL,'halloworld',NULL),(65,'Nass','Mad','2018-01-11 11:54:37','1990-02-13',NULL,'verlim','A street','823342','imerin26@gmail.com',0,NULL,'ranagepaja900',NULL),(66,'CoolName','AwesomeSurname','2018-01-11 11:55:21','2001-02-04',NULL,'A Random City','That is secret','82334','imerin27@gmail.com',0,NULL,'qwerty',NULL),(67,NULL,NULL,'2018-01-11 13:11:47',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(68,'CoolName','asd','2018-01-11 14:05:47','4343-12-31',NULL,'asd','That is secret','asda','escatmqweqwean@gmail.com',0,NULL,'wqeqwqwe',NULL),(69,'asd','asd','2018-01-11 14:39:57','0043-03-31',NULL,'A Random City','sad','82334','esc34@232',0,NULL,'sdfsdfs',NULL),(70,NULL,NULL,'2018-01-11 14:51:48',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(71,NULL,NULL,'2018-01-11 14:54:04',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(72,NULL,NULL,'2018-01-11 14:57:58',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(73,NULL,NULL,'2018-01-11 15:05:56',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(74,NULL,NULL,'2018-01-11 15:06:30',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL),(75,NULL,NULL,'2018-01-11 15:06:46',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,0,18,1350),(2,1,16,1150),(3,1,13,850),(4,1,5,450),(5,2,19,1450),(6,2,9,550),(7,3,12,750),(8,4,8,450),(9,5,12,750),(10,5,10,650),(11,5,11,750),(12,6,6,550),(13,6,4,350),(14,7,22,1750),(15,7,19,1450),(16,8,5,450),(17,8,20,1550),(18,9,23,1850),(19,9,5,450),(20,10,21,1650),(21,11,6,550),(22,11,8,450),(23,11,19,1450),(24,12,12,750),(25,12,10,650),(26,13,21,1650),(27,14,0,500),(28,15,17,1250),(29,15,20,1550),(30,16,6,550),(31,16,13,850),(32,16,18,1350),(33,17,9,550),(34,17,16,1150),(35,18,9,550),(36,18,0,500),(37,18,13,850),(38,19,3,800),(39,19,8,450),(40,20,8,450),(41,20,0,500),(42,20,20,1550),(43,21,7,650),(44,22,14,950),(45,23,14,950),(46,24,0,500),(47,25,1,600),(48,25,12,750),(49,25,18,1350),(50,26,23,1850),(51,26,16,1150),(52,26,10,650),(53,27,22,1750),(54,27,18,1350),(55,28,16,1150),(56,28,8,450),(57,28,6,550),(58,29,15,1050),(59,30,19,1450),(60,30,7,650),(61,30,18,1350),(62,31,6,550),(63,31,14,950),(64,32,13,850),(65,32,9,550),(66,32,10,650),(67,33,12,750),(68,34,1,600),(69,34,18,1350),(70,35,15,1050),(71,35,7,650),(72,36,11,750),(73,36,1,600),(74,36,5,450),(75,37,17,1250),(76,37,18,1350),(77,38,12,750),(78,38,21,1650),(79,39,21,1650),(80,40,22,1750),(81,40,6,550),(82,41,21,1650),(83,41,5,450),(84,41,12,750),(85,42,15,1050),(86,42,9,550),(87,43,19,1450),(88,43,13,850),(89,44,2,700),(90,44,22,1750),(91,45,4,350),(92,45,7,650),(93,46,8,450),(94,47,7,650),(95,47,18,1350),(96,47,4,350),(97,48,0,500),(98,48,19,1450),(99,48,13,850),(100,49,13,850),(101,49,21,1650),(102,50,10,650),(103,51,12,750),(104,52,6,550),(105,52,21,1650),(106,53,11,750),(107,53,10,650),(108,54,18,1350),(109,55,5,450),(110,55,5,450),(111,56,12,750),(112,57,3,800),(113,58,16,1150),(114,58,10,650),(115,59,7,650),(116,60,5,450),(117,61,1,600),(118,62,14,950),(119,63,22,1750),(120,63,10,650),(121,63,14,950),(122,64,15,1050),(123,64,4,350),(124,64,12,750),(125,65,6,550),(126,65,7,650),(127,65,18,1350),(128,66,9,550),(129,67,20,1550),(130,67,15,1050),(131,68,15,1050),(132,68,8,450),(133,68,12,750),(134,69,14,950),(135,69,15,1050),(136,70,20,1550),(137,70,17,1250),(138,71,11,750),(139,71,17,1250),(140,72,0,500),(141,73,5,450),(142,74,23,1850),(143,75,15,1050),(144,75,4,350),(145,75,6,550),(146,76,15,1050),(147,76,20,1550),(148,77,18,1350),(149,77,4,350),(150,77,23,1850),(151,78,17,1250),(152,79,7,650),(153,80,7,650),(154,80,20,1550),(155,81,13,850),(156,82,15,1050),(157,83,2,700),(158,84,13,850),(159,84,4,350),(160,45,32,4545),(171,105,56,565),(172,110,1,600),(173,111,1,600),(174,112,0,500),(175,113,0,500),(176,114,0,500),(177,117,0,500),(178,117,1,600),(179,117,2,700),(180,118,1,600),(181,118,2,700),(182,118,0,500),(183,119,0,500),(184,119,1,600),(185,119,2,700),(186,120,0,500),(187,120,1,600),(188,120,2,700),(189,121,0,500),(190,121,1,600),(191,121,2,700),(192,121,3,800),(193,121,4,350),(194,121,5,450),(195,121,6,550),(196,121,7,650),(197,122,6,550),(198,122,7,650),(199,122,8,450),(200,122,15,1050),(201,122,16,1150),(202,122,17,1250),(203,123,1,600),(204,123,0,500),(205,123,2,700),(206,124,1,600),(207,124,0,500),(208,124,2,700),(209,125,1,600),(210,125,0,500),(211,125,2,700),(212,126,1,600),(213,126,0,500),(214,126,2,700),(215,127,2,700),(216,127,1,600),(217,127,0,500),(218,128,2,700),(219,128,1,600),(220,128,0,500),(221,129,2,700),(222,129,1,600),(223,129,0,500),(224,130,2,700),(225,130,1,600),(226,130,0,500),(227,131,2,700),(228,131,1,600),(229,131,0,500),(230,132,1,600),(231,132,0,500),(232,133,0,500),(233,133,1,600),(234,134,1,600),(235,134,0,500),(236,135,2,700),(237,136,0,500),(238,136,1,600),(239,136,2,700),(240,137,0,500),(241,137,1,600),(242,137,2,700),(243,138,1,600),(244,138,0,500),(245,139,1,600),(246,140,1,600),(247,140,0,500);
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
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,'2017-12-19 13:28:24',NULL,3),(2,3,'2017-12-19 13:28:24','2011-12-02 15:40:25',2),(3,4,'2017-12-19 13:28:24','2013-11-03 22:05:46',4),(4,4,'2017-12-19 13:28:24',NULL,1),(5,6,'2017-12-19 13:28:24','2012-02-11 22:18:54',2),(6,6,'2017-12-19 13:28:24','2012-08-11 21:18:40',4),(7,6,'2017-12-19 13:28:24','2012-06-01 21:19:23',3),(8,7,'2017-12-19 13:28:24','2011-02-09 15:16:21',2),(9,8,'2011-10-31 21:31:18','2011-11-09 21:33:16',NULL),(10,8,'2012-07-31 20:31:18','2012-08-13 20:32:19',NULL),(11,9,'2010-10-31 18:19:37','2010-11-09 18:21:14',NULL),(12,9,'2010-11-30 18:19:37','2010-11-30 18:21:20',NULL),(13,9,'2010-12-31 18:19:37',NULL,NULL),(14,10,'2011-01-30 22:22:15','2011-02-04 22:22:35',NULL),(15,11,'2011-02-28 17:16:09','2011-03-04 17:17:24',NULL),(16,12,'2011-04-30 19:51:54','2011-05-05 19:53:46',NULL),(17,12,'2011-08-30 19:51:54','2011-09-06 19:53:15',NULL),(18,12,'2011-08-30 19:51:54','2011-09-07 19:53:23',NULL),(19,13,'2012-03-30 21:57:18',NULL,NULL),(20,13,'2012-01-30 22:57:18','2012-02-11 22:58:13',NULL),(21,14,'2014-01-30 19:41:08','2014-02-05 19:41:34',NULL),(22,14,'2013-10-30 19:41:08','2013-10-31 19:42:27',NULL),(23,15,'2011-09-28 21:05:07','2011-10-05 21:05:16',NULL),(24,15,'2011-05-28 21:05:07','2011-06-08 21:05:59',NULL),(25,16,'2011-04-30 18:40:58','2011-05-13 18:41:02',NULL),(26,16,'2010-08-31 18:40:58','2010-09-02 18:42:19',NULL),(27,17,'2012-06-30 17:05:43','2012-07-12 17:06:40',NULL),(28,17,'2011-09-30 17:05:43','2011-10-03 17:07:05',NULL),(29,17,'2011-09-30 17:05:43',NULL,NULL),(30,18,'2011-05-30 14:26:41','2011-05-30 14:27:43',NULL),(31,19,'2013-11-30 16:34:47','2013-12-05 16:35:06',NULL),(32,19,'2013-11-30 16:34:47','2013-12-03 16:34:51',NULL),(33,19,'2013-12-31 16:34:47',NULL,NULL),(34,20,'2010-08-30 21:20:45','2010-09-01 21:22:11',NULL),(35,20,'2010-09-30 21:20:45','2010-10-02 21:20:57',NULL),(36,22,'2012-07-30 21:38:53','2012-08-05 21:39:06',NULL),(37,22,'2013-03-30 22:38:53','2013-04-02 21:39:57',NULL),(38,22,'2012-07-30 21:38:53','2012-07-30 21:40:14',NULL),(39,23,'2013-08-31 16:19:27','2013-09-02 16:19:54',NULL),(40,23,'2013-11-30 17:19:27','2013-12-08 17:19:32',NULL),(41,23,'2013-07-31 16:19:27','2013-08-06 16:19:51',NULL),(42,24,'2010-02-28 16:57:06','2010-03-05 16:57:30',NULL),(43,24,'2010-07-31 15:57:06','2010-08-07 15:57:35',NULL),(44,24,'2010-04-30 15:57:06','2010-05-11 15:57:51',NULL),(45,25,'2014-01-30 20:11:18','2014-02-04 20:12:31',NULL),(46,27,'2011-04-30 20:08:00','2011-05-10 20:09:49',NULL),(47,27,'2012-01-30 21:08:00','2012-02-08 21:09:39',NULL),(48,28,'2012-11-30 16:58:54',NULL,NULL),(49,29,'2013-01-31 22:36:14','2013-02-11 22:36:21',NULL),(50,29,'2013-07-31 21:36:14','2013-08-05 21:37:44',NULL),(51,29,'2013-07-31 21:36:14','2013-08-11 21:37:48',NULL),(52,31,'2012-08-31 21:55:32','2012-09-02 21:55:58',NULL),(53,31,'2012-06-30 21:55:32','2012-07-08 21:56:01',NULL),(54,31,'2013-02-28 22:55:32','2013-03-02 22:56:34',NULL),(55,32,'2014-03-31 18:41:42','2014-04-02 18:43:02',NULL),(56,32,'2014-01-31 19:41:42','2014-02-12 19:42:45',NULL),(57,33,'2012-03-30 17:27:43','2012-04-05 17:29:07',NULL),(58,34,'2013-08-28 20:49:56',NULL,NULL),(59,34,'2013-07-28 20:49:56','2013-08-04 20:50:00',NULL),(60,36,'2013-10-31 16:54:02','2013-11-06 16:54:36',NULL),(61,36,'2013-11-30 16:54:02','2013-12-10 16:55:02',NULL),(62,36,'2014-02-28 16:54:02','2014-03-03 16:54:50',NULL),(63,37,'2012-01-31 21:24:59','2012-02-03 21:26:07',NULL),(64,37,'2012-06-30 20:24:59','2012-07-10 20:25:47',NULL),(65,37,'2011-11-30 21:24:59','2011-12-03 21:26:52',NULL),(66,38,'2013-12-30 16:37:58','2014-01-05 16:39:16',NULL),(67,38,'2013-12-30 16:37:58','2013-12-30 16:38:17',NULL),(68,39,'2011-03-28 15:54:03','2011-04-07 15:54:43',NULL),(69,39,'2011-05-28 15:54:03',NULL,NULL),(70,39,'2011-04-28 15:54:03','2011-05-08 15:54:20',NULL),(71,40,'2013-07-31 18:35:41',NULL,NULL),(72,40,'2013-04-30 18:35:41','2013-05-12 18:36:19',NULL),(73,40,'2013-06-30 18:35:41','2013-07-04 18:36:22',NULL),(74,42,'2011-04-30 19:20:33','2011-05-03 19:21:50',NULL),(75,42,'2011-07-31 19:20:33','2011-08-04 19:21:51',NULL),(76,42,'2011-03-31 19:20:33','2011-04-13 19:20:50',NULL),(77,44,'2013-09-30 18:30:21','2013-10-10 18:32:14',NULL),(78,44,'2014-01-30 19:30:21','2014-02-02 19:30:26',NULL),(79,44,'2013-08-30 18:30:21','2013-09-10 18:31:01',NULL),(80,45,'2011-10-30 18:59:35','2011-11-04 19:01:07',NULL),(81,45,'2012-02-29 18:59:35','2012-03-09 19:00:55',NULL),(82,45,'2012-05-30 17:59:35','2012-06-09 17:59:35',NULL),(83,46,'2010-08-31 18:25:51','2010-09-13 18:27:30',NULL),(84,48,'2011-02-28 19:52:05','2011-03-09 19:53:12',NULL),(85,45,'2012-05-30 17:59:35','2012-03-09 19:00:55',NULL),(105,43,'2017-12-19 14:42:46',NULL,3),(106,37,'2017-12-21 10:38:15',NULL,3),(107,17,'2017-12-21 10:39:17',NULL,2),(108,45,'2017-12-21 10:40:18',NULL,3),(109,45,'2017-12-21 10:40:45',NULL,3),(110,22,'2017-12-21 10:41:16',NULL,4),(111,22,'2017-12-21 10:41:40',NULL,2),(112,37,'2017-12-21 12:51:40',NULL,3),(113,42,'2018-01-02 08:26:24',NULL,1),(114,14,'2018-01-02 08:28:10',NULL,3),(115,17,'2018-01-02 09:02:30',NULL,NULL),(116,45,'2018-01-02 09:04:05',NULL,NULL),(117,14,'2018-01-02 09:08:46',NULL,NULL),(118,10,'2018-01-02 09:10:18',NULL,4),(119,17,'2018-01-02 09:13:27',NULL,3),(120,17,'2018-01-02 09:14:02',NULL,4),(121,45,'2018-01-02 10:11:36',NULL,3),(122,5,'2018-01-02 10:22:48',NULL,3),(123,14,'2018-01-02 13:21:12',NULL,2),(124,14,'2018-01-02 13:23:22',NULL,4),(125,14,'2018-01-02 13:25:19',NULL,4),(126,14,'2018-01-02 14:03:13',NULL,2),(127,45,'2018-01-02 14:05:49',NULL,4),(128,45,'2018-01-02 14:11:03',NULL,3),(129,45,'2018-01-02 14:11:58',NULL,4),(130,45,'2018-01-02 14:48:13',NULL,3),(131,45,'2018-01-02 14:49:19',NULL,4),(132,5,'2018-01-08 09:55:45',NULL,NULL),(133,5,'2018-01-08 09:56:45',NULL,NULL),(134,5,'2018-01-08 09:58:26',NULL,NULL),(135,5,'2018-01-08 09:58:50',NULL,NULL),(136,45,'2018-01-08 10:00:13',NULL,NULL),(137,45,'2018-01-08 10:00:52',NULL,NULL),(138,14,'2018-01-08 10:01:24',NULL,NULL),(139,14,'2018-01-08 10:02:42',NULL,NULL),(140,14,'2018-01-08 10:03:45',NULL,NULL);
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
  `pictures` varchar(200) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (0,'PC','https://images.unsplash.com/photo-1500083443496-000d756d070c?auto=format&fit=crop&w=1328&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D','A personal computer (PC) is a multi-purpose computer whose size, capabilities, and price make it feasible for individual use. PCs are intended to be operated directly by an end user, rather than by a computer expert or technician. Computer time-sharing models that were typically used with larger, more expensive minicomputer and mainframe systems, to enable them be used by many people at the same time, are not used with PCs.'),(1,'Laptop','https://images.unsplash.com/photo-1508984921474-bc8302cb4d04?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D','A laptop, often called a notebook, is a small, portable personal computer with a clamshell form factor, an alphanumeric keyboard on the lower part of the clamshell and a thin LCD or LED computer screen on the upper part, which is opened up to use the computer. Laptops are folded shut for transportation, and thus are suitable for mobile use.Although originally there was a distinction between laptops and notebooks, the former being bigger and heavier than the latter, as of 2014, there is often no longer any difference.Laptops are commonly used in a variety of settings, such as at work, in education, in playing games, Internet surfing, for personal multimedia and general home computer use.'),(2,'Mac','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1351&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D','The MacBook is a brand of notebook computers manufactured by Apple Inc. from May 2006 to February 2012, and relaunched in 2015. It replaced the iBook series and 12-inch PowerBook series of notebooks as a part of the Apple-Intel transition from PowerPC. Positioned as the low end of the MacBook family, below the premium ultra-portable MacBook Air and the powerful MacBook Pro, the MacBook was aimed at the consumer and education markets. It was the best-selling Macintosh ever. For five months in 2008, it was the best-selling laptop of any brand in US retail stores.'),(3,'SmartPhone','https://images.unsplash.com/photo-1470350576089-539d5a852bf7?auto=format&fit=crop&w=1050&q=80','A smartphone is a handheld personal computer with a mobile operating system and an integrated mobile broadband cellular network connection for voice, SMS, and Internet data communication; most if not all smartphones also support Wi-Fi. Smartphones are typically pocket-sized, as opposed to tablets, which are much larger in size. They are able to run a variety of software components, known as “apps”.');
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
  `pictures` varchar(200) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (0,'Dell 1000',500,0,'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(1,'Dell 2000',600,0,'https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(2,'Dell 3000',700,0,'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(3,'Dell 4000',800,0,'https://images.unsplash.com/photo-1414690165279-49ab0a9a7e66?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(4,'HP Workstation 1',350,0,'https://images.unsplash.com/5/unsplash-kitsune-3.jpg?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(5,'HP Workstation 2',450,0,'https://images.unsplash.com/photo-1485988412941-77a35537dae4?auto=format&fit=crop&w=1372&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(6,'HP Workstation 3',550,0,'https://images.unsplash.com/photo-1481887328591-3e277f9473dc?auto=format&fit=crop&w=1360&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(7,'HP Workstation 4',650,0,'https://images.unsplash.com/photo-1501555568989-0d12d825d489?auto=format&fit=crop&w=752&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(8,'HP Probook 1100',450,1,'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1504&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(9,'HP Probook 2100',550,1,'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(10,'HP Probook 3100',650,1,'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1489&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(11,'HP Probook 4100',750,1,'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1466&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(12,'Sony Vaio x1',750,1,'https://images.unsplash.com/photo-1511415932124-42efedd2eacf?auto=format&fit=crop&w=1351&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(13,'Sony Vaio x2',850,1,'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1302&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(14,'Sony Vaio x3',950,1,'https://images.unsplash.com/photo-1426024120108-99cc76989c71?auto=format&fit=crop&w=1506&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(15,'Sony Vaio x4',1050,1,'https://images.unsplash.com/uploads/14125120591540eb48427/c1c4b1aa?auto=format&fit=crop&w=1444&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(16,'MacBook Pro 1',1150,2,'https://images.unsplash.com/7/Top_view.jpg?auto=format&fit=crop&w=1400&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(17,'MacBook Pro 2',1250,2,'https://images.unsplash.com/45/QDSMoAMTYaZoXpcwBjsL__DSC0104-1.jpg?auto=format&fit=crop&w=1510&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(18,'MacBook Pro 3',1350,2,'https://images.unsplash.com/photo-1511415932124-42efedd2eacf?auto=format&fit=crop&w=1351&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(19,'MacBook Pro 4',1450,2,'https://images.unsplash.com/photo-1455894127589-22f75500213a?auto=format&fit=crop&w=1279&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(20,'MacBook Pro 5',1550,2,'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(21,'MacBook Pro 6',1650,2,'https://images.unsplash.com/photo-1466228432269-af42b400b934?auto=format&fit=crop&w=1400&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(22,'MacBook Pro 7',1750,2,'https://images.unsplash.com/photo-1511415932124-42efedd2eacf?auto=format&fit=crop&w=1351&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(23,'MacBook Pro 8',1850,2,'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',NULL),(24,'Samsung Galaxy S6',390,3,'https://images.unsplash.com/photo-1421757350652-9f65a35effc7?auto=format&fit=crop&w=1053&q=80',NULL),(25,'HTC X345',578,3,'https://images.unsplash.com/photo-1505740494862-e7e49c099cf1?auto=format&fit=crop&w=750&q=80',NULL),(26,'Samsung Galaxy S8',800,3,'https://images.unsplash.com/photo-1478358161113-b0e11994a36b?auto=format&fit=crop&w=334&q=80',NULL),(27,'Iphone 10',1200,3,'https://images.unsplash.com/photo-1494366222322-387658a1a976?auto=format&fit=crop&w=751&q=80',NULL),(28,'Iphone 11',1400,3,'https://images.unsplash.com/photo-1458862768540-8b091824fe2d?auto=format&fit=crop&w=752&q=80',NULL),(29,'Iphone 12',1700,3,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',NULL);
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

-- Dump completed on 2018-01-12  8:33:20
