SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+03:00";


-- --------------------------------------------------------

--
-- Table structure for table `tblcategory`
--

DROP TABLE IF EXISTS `tblcategory`;
CREATE TABLE IF NOT EXISTS `tblcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tblcategory`
--

INSERT INTO `tblcategory` (`id`, `categoryName`) VALUES
(1, 'Ev Eşyaları'),
(2, 'Fatura'),
(3, 'Gıda'),
(4, 'Kira');

-- --------------------------------------------------------

--
-- Table structure for table `tblchat`
--

DROP TABLE IF EXISTS `tblchat`;
CREATE TABLE IF NOT EXISTS `tblchat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receiverId` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `senderId` (`senderId`),
  KEY `receiverId` (`receiverId`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tblchat`
--

INSERT INTO `tblchat` (`id`, `receiverId`, `senderId`, `message`, `createdAt`) VALUES
(173, 4, 1, 'hi', '2021-05-20 23:03:51'),
(174, 2, 1, 'g', '2021-05-20 23:04:06'),
(175, 1, 4, 'hi', '2021-05-20 23:05:39'),
(176, 1, 6, 'selam', '2021-05-20 23:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `tblcomments`
--

DROP TABLE IF EXISTS `tblcomments`;
CREATE TABLE IF NOT EXISTS `tblcomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `text` text COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `photo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tblcomments`
--

INSERT INTO `tblcomments` (`id`, `postId`, `userId`, `text`, `createdAt`, `photo`) VALUES
(16, 14, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2021-04-28 23:21:26', NULL),
(18, 30, 1, 'hello', '2021-04-30 16:57:24', NULL),
(25, 7, 1, 'hello', '2021-05-04 18:46:47', NULL),
(27, 30, 8, 'Lorem Ipsum', '2021-05-06 21:15:16', NULL),
(31, 14, 8, 'kkokoko', '2021-05-16 01:25:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblposts`
--

DROP TABLE IF EXISTS `tblposts`;
CREATE TABLE IF NOT EXISTS `tblposts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `text` text COLLATE utf8mb4_bin NOT NULL,
  `postphoto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tblposts`
--

INSERT INTO `tblposts` (`id`, `userId`, `categoryId`, `text`, `postphoto`, `createdAt`) VALUES
(7, 6, 1, 'Selamlar', NULL, '2021-04-25 18:00:56'),
(14, 1, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, '2021-04-28 02:15:21'),
(30, 4, 2, 'sample text', NULL, '2021-04-30 00:14:19'),
(101, 1, 3, 'Hard truth...', 'http://localhost:5000/images/posts/Hard hardtruryh.jpg', '2021-05-17 10:41:30'),
(102, 1, 4, 'Helpful', 'http://localhost:5000/images/posts/Helpftumblr_f0a18f5aa10cfc040bd974ce2dd02680_ddb6756b_1280.jpg', '2021-05-17 10:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
CREATE TABLE IF NOT EXISTS `tbluser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `Surname` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `EmailAddress` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Password` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `profilePhoto` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg',
  `mobile` varchar(11) COLLATE utf8mb4_bin NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `city` varchar(25) COLLATE utf8mb4_bin NOT NULL,
  `district` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `department` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `website` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `github` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `twitter` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `instagram` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `facebook` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `kaggle` varchar(80) COLLATE utf8mb4_bin DEFAULT NULL,
  `UserTypeName` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'User',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `UserTypeName` (`UserTypeName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`id`, `Name`, `Surname`, `EmailAddress`, `Password`, `profilePhoto`, `mobile`, `address`, `city`, `district`, `department`, `website`, `github`, `twitter`, `instagram`, `facebook`, `kaggle`, `UserTypeName`, `createdAt`) VALUES
(1, 'Ogulcan', 'Culfa', 'ogulcanculfa@gmail.com', '123456789', 'http://localhost:5000/images/users/me.jpg', '', 'Adnan Kahveci Mah. Yavuz Sultan Selim Bulvarı Göktürk-1 Apt. Kat:5 Daire:28', 'İstanbul', 'Beylikdüzü', 'YBS', 'https://www.ogulcanculfa.com', 'https://github.com/OgulcanCulfa', '', '', '', '', 'Root', '2021-04-19 00:00:00'),
(2, 'Mesut', 'Güneri', 'mesutkomser@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', 'İstanbul', 'Beyoğlu', '', '', '', '', '', '', NULL, 'User', '0000-00-00 00:00:00'),
(4, 'Stannis', 'Baratheon', 'kingstannis@gmail.com', '123456789', 'http://localhost:5000/images/users/Stannis-Baratheon-Profile_(3).png	', '', '', 'Westeros', 'Dragonstone', '', '', '', '', '', '', NULL, 'User', '0000-00-00 00:00:00'),
(5, 'Robert', 'Baratheon', 'kingrobert@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', '', '', '', '', '', '', '', '', NULL, 'User', '0000-00-00 00:00:00'),
(6, 'Haktan', 'Yücesoy', 'haktanyucesoy@gmail.com', '123456789', 'http://localhost:5000/images/users/hacktin.jpg	', '', 'Somewhere', 'Balıkesir', 'Ayvalık', 'YBS', '', 'https://github.com/KadirHaktan', '', '', '', '', 'User', '0000-00-00 00:00:00'),
(7, 'Tywin', 'Lannister', 'tywinlannister@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', '', '', '', '', '', '', '', '', NULL, 'User', '0000-00-00 00:00:00'),
(8, 'Aynur', 'Katırcıoğlu', 'aynrkatircioglu@gmail.com', '123456789', 'http://localhost:5000/images/users/aynr.jpg		', '', 'Hatayda bi yer.', 'Hatay', 'İskenderun', 'Bilgisayar Mühendisliği', '', 'https://github.com/aynrkatircioglu', '', '', '', 'https://www.kaggle.com/aynrkatircioglu', 'User', '0000-00-00 00:00:00'),
(9, 'Zeynep', 'İşbay', 'zeynepisbay@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', 'İstanbul', 'Üsküdar', '', '', '', '', '', '', NULL, 'User', '0000-00-00 00:00:00'),
(10, 'Sefa', 'Öztürkmen', 'sefaozturkmen@gmail.com', '123456789', 'http://localhost:5000/images/users/sefa.jpg', '', '', '', '', '', '', '', '', '', '', NULL, 'User', '2021-05-08 22:38:39');

-- --------------------------------------------------------

--
-- Table structure for table `tblusertype`
--

DROP TABLE IF EXISTS `tblusertype`;
CREATE TABLE IF NOT EXISTS `tblusertype` (
  `UserTypeName` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `UserTypeNumber` int(11) NOT NULL,
  PRIMARY KEY (`UserTypeName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tblusertype`
--

INSERT INTO `tblusertype` (`UserTypeName`, `UserTypeNumber`) VALUES
('Administrator', 666),
('Manager', 555),
('Root', 777),
('User', 444);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vwcategorieswithcounts`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vwcategorieswithcounts`;
CREATE TABLE IF NOT EXISTS `vwcategorieswithcounts` (
`id` int(11)
,`categoryName` varchar(50)
,`countOfCategories` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vwchatwithusers`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vwchatwithusers`;
CREATE TABLE IF NOT EXISTS `vwchatwithusers` (
`id` int(11)
,`senderId` int(11)
,`userId` int(11)
,`Name` varchar(80)
,`Surname` varchar(50)
,`profilephoto` varchar(150)
,`chatCreatedAt` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vwcommentswithusers`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vwcommentswithusers`;
CREATE TABLE IF NOT EXISTS `vwcommentswithusers` (
`id` int(11)
,`postId` int(11)
,`userId` int(11)
,`text` text
,`createdAt` datetime
,`photo` text
,`Name` varchar(80)
,`Surname` varchar(50)
,`profilePhoto` varchar(150)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vwpostswithusers`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vwpostswithusers`;
CREATE TABLE IF NOT EXISTS `vwpostswithusers` (
`postId` int(11)
,`postUserId` int(11)
,`postText` text
,`postPhoto` text
,`postCreatedAt` datetime
,`countOfComments` bigint(21)
,`Name` varchar(80)
,`Surname` varchar(50)
,`city` varchar(25)
,`district` varchar(50)
,`profilePhoto` varchar(150)
,`categoryId` int(11)
,`countOfCategories` bigint(21)
,`categoryName` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vwusersforchat`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vwusersforchat`;
CREATE TABLE IF NOT EXISTS `vwusersforchat` (
`id` int(11)
,`Name` varchar(80)
,`Surname` varchar(50)
,`profilePhoto` varchar(150)
);

-- --------------------------------------------------------

--
-- Structure for view `vwcategorieswithcounts`
--
DROP TABLE IF EXISTS `vwcategorieswithcounts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwcategorieswithcounts`  AS  select `tblcategory`.`id` AS `id`,`tblcategory`.`categoryName` AS `categoryName`,count(0) AS `countOfCategories` from (`tblcategory` left join `tblposts` on((`tblcategory`.`id` = `tblposts`.`categoryId`))) group by `tblcategory`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `vwchatwithusers`
--
DROP TABLE IF EXISTS `vwchatwithusers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwchatwithusers`  AS  select `tblchat`.`id` AS `id`,`tblchat`.`senderId` AS `senderId`,`tbluser`.`id` AS `userId`,`tbluser`.`Name` AS `Name`,`tbluser`.`Surname` AS `Surname`,`tbluser`.`profilePhoto` AS `profilephoto`,max(`tblchat`.`createdAt`) AS `chatCreatedAt` from (`tbluser` join `tblchat` on((`tblchat`.`receiverId` = `tbluser`.`id`))) group by `tbluser`.`id`,`tblchat`.`senderId` order by `chatCreatedAt` desc ;

-- --------------------------------------------------------

--
-- Structure for view `vwcommentswithusers`
--
DROP TABLE IF EXISTS `vwcommentswithusers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwcommentswithusers`  AS  select `tblcomments`.`id` AS `id`,`tblcomments`.`postId` AS `postId`,`tblcomments`.`userId` AS `userId`,`tblcomments`.`text` AS `text`,`tblcomments`.`createdAt` AS `createdAt`,`tblcomments`.`photo` AS `photo`,`tbluser`.`Name` AS `Name`,`tbluser`.`Surname` AS `Surname`,`tbluser`.`profilePhoto` AS `profilePhoto` from (`tblcomments` join `tbluser` on((`tbluser`.`id` = `tblcomments`.`userId`))) order by `tblcomments`.`createdAt` desc ;

-- --------------------------------------------------------

--
-- Structure for view `vwpostswithusers`
--
DROP TABLE IF EXISTS `vwpostswithusers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwpostswithusers`  AS  select `tblposts`.`id` AS `postId`,`tblposts`.`userId` AS `postUserId`,`tblposts`.`text` AS `postText`,`tblposts`.`postphoto` AS `postPhoto`,`tblposts`.`createdAt` AS `postCreatedAt`,count(`tblcomments`.`id`) AS `countOfComments`,`tbluser`.`Name` AS `Name`,`tbluser`.`Surname` AS `Surname`,`tbluser`.`city` AS `city`,`tbluser`.`district` AS `district`,`tbluser`.`profilePhoto` AS `profilePhoto`,`tblcategory`.`id` AS `categoryId`,count(`tblcategory`.`id`) AS `countOfCategories`,`tblcategory`.`categoryName` AS `categoryName` from (((`tblposts` left join `tblcomments` on((`tblposts`.`id` = `tblcomments`.`postId`))) join `tbluser` on((`tbluser`.`id` = `tblposts`.`userId`))) join `tblcategory` on((`tblposts`.`categoryId` = `tblcategory`.`id`))) group by `tblposts`.`id`,`tblposts`.`categoryId` order by `tblposts`.`createdAt` desc ;

-- --------------------------------------------------------

--
-- Structure for view `vwusersforchat`
--
DROP TABLE IF EXISTS `vwusersforchat`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwusersforchat`  AS  select `tbluser`.`id` AS `id`,`tbluser`.`Name` AS `Name`,`tbluser`.`Surname` AS `Surname`,`tbluser`.`profilePhoto` AS `profilePhoto` from `tbluser` ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblchat`
--
ALTER TABLE `tblchat`
  ADD CONSTRAINT `tblchat_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `tbluser` (`id`),
  ADD CONSTRAINT `tblchat_ibfk_2` FOREIGN KEY (`receiverId`) REFERENCES `tbluser` (`id`);

--
-- Constraints for table `tblcomments`
--
ALTER TABLE `tblcomments`
  ADD CONSTRAINT `tblcomments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `tblposts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tblcomments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `tbluser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblposts`
--
ALTER TABLE `tblposts`
  ADD CONSTRAINT `tblposts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `tbluser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tblposts_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `tblcategory` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD CONSTRAINT `tbluser_ibfk_1` FOREIGN KEY (`UserTypeName`) REFERENCES `tblusertype` (`UserTypeName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
