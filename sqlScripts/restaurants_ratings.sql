-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurants
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` int(10) unsigned NOT NULL,
  `restaurantID` int(11) unsigned NOT NULL,
  `review` varchar(200) NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (3,2,1,'asdasdasd',3,NULL),(4,3,1,'fdsdfgdf asdasd',3,NULL),(5,1,1,'Bra pizza',1,NULL),(6,3,1,'coolt',3,NULL),(7,2,1,'dasdasdasdasdasdasd',15,NULL),(8,1,1,'heu',13,NULL),(9,4,1,'reee',15,NULL),(10,1,2,'ree',15,NULL),(11,5,5,'Very good pasta',15,NULL),(12,1,3,'bad pizzas',15,NULL),(13,4,4,'Gammal krogsmiljö!',15,NULL),(14,5,8,'Bästa korven i stan',25,'2018-12-12'),(15,2,6,'Lite för hårdkokt ris för min smak.',15,'2020-01-08'),(16,4,7,'Riktig bra sushi!',15,'2020-01-08'),(17,3,7,'Nice sushi!',25,'2020-01-08'),(18,3,7,'Nice sushi!',25,'2020-01-08'),(19,1,1,'Bad cheese',28,'2020-01-08'),(20,1,9,'Otrevlig ägare',15,'2020-01-08'),(21,4,13,'Deras ekologiska utbud var utmärkt',15,'2020-01-08'),(22,1,12,'Föredrar Tallkrogen pizzeria',15,'2020-01-08');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-08 16:30:44
