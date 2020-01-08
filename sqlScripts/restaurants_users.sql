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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `userPassword` varchar(150) NOT NULL,
  `roleID` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `userPassword_UNIQUE` (`userPassword`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'n','$2a$10$YAmAhFh3QAM.J4U38hi5nOu9rLSSt1G6/JlyeIxauJ52uyCTaozy6',0),(14,'ree','$2a$10$qehCoZ7gFq3jwd/BvrxiPuUI/h4Qe288ZuzVw96NaAzwXgpe34cua',0),(15,'tree','$2a$10$NOnVeTCtDOM0860CpM7Ni.LKWbpjdvMJM8QRoxn/JLRC4npuvzvZ2',1),(16,'fre','$2a$10$DMEGyS8//dzWouobl/80IeGsw6cWUF3IOxL8NM3iIUz7kOO/qsiAe',0),(17,'test','$2a$10$wd7X/qiHicEYOGvy.key.OFjMf4OIB.NgRKB8pYzW1LCuyLRQh6Ee',0),(18,'hey','$2a$10$QiCP0wD2LkfUE/wPj5jqwew5CrYhNhl7Pmbhp9c6ZdbaMPXXr8Zly',0),(19,'öö','$2a$10$MYtam7P/GEjGC3E0R/9ToO86GWS3h0ckhWAAnKz079IXfR3KOuXEe',0),(21,'k','$2a$10$754kj5nTOuEmYKr3jcbH4en1PhdDaaMb8PNnV4dOSKkKj.51wk2Nm',0),(22,'t','$2a$10$wBy4NDIIsuN9TH9mu3X7YeOxp9J.wLmNxEdVotEOBL4qdYigWqqt.',0),(23,'l','$2a$10$m9rlqjO3VfE3WRHcjEAPjuY7Dw0phPQ7u8qpUo75GF/M74RThmzku',0),(24,'new','$2a$10$svpArngDfT0USJTJUzHnh.do4Hxp6i03l4bc3oRjLBKEajdN/ProC',0),(25,'s','$2a$10$M8PGxl5xLOjyR89asc/EoOgCwM34e7W8G.jm8qmBU38FWHib1GCwe',0),(26,'tö','$2a$10$4YUEeAHhyDcbcVf6X/ixd.gLbKOB5PqFg/MZzkzAKvnLee1CZHNTy',0),(28,'jh','$2a$10$uktCXYka7xTpYD2XbowV/OHboOiYIhUvW2TTafBFJpN0HhbVt1ubW',0),(29,'ee','$2a$10$OF3wWS.c/GQzZgHr72wXu.xr2MKGgk0cChcl.xcKd0CMUAPcwf4Y6',0),(31,'jj','$2a$10$Wo8ZYNdhSOfwtJk8F4lw6OtF/dPm.tUq/TbqeZa6NaNf7vg3PdOBO',0),(32,'yy','$2a$10$LjaCxKRv8aqOy2RIoHaPFOwIb3RUWfzU0gdu2qPhOe3lwIRJGl.Am',0),(35,'','$2a$10$0i8QV.G235P64aCWO5/.vu59fRj0rmjStrOo.DOflbn9aZGIAaZFa',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
