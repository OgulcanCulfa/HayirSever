

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+03:00";



-- Database: `hayirsever`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tblchat`
--

INSERT INTO `tblchat` (`id`, `receiverId`, `senderId`, `message`, `createdAt`) VALUES
(197, 2, 1, 'ş', '2021-05-26 02:28:16'),
(198, 2, 1, 'lll', '2021-05-26 02:28:20'),
(199, 2, 1, 'koko', '2021-05-26 02:28:25'),
(200, 7, 1, 'jjj', '2021-05-26 02:29:34'),
(201, 7, 1, 'jjj', '2021-05-26 02:29:47'),
(202, 1, 8, 'jj', '2021-05-26 02:31:27'),
(203, 1, 8, 'jıjı', '2021-05-26 02:31:37'),
(204, 1, 8, 'okkkk', '2021-05-26 02:31:42'),
(205, 8, 1, 'nn', '2021-05-26 02:31:47'),
(206, 8, 1, 'mkmk', '2021-05-26 02:33:11'),
(207, 8, 1, 'ı', '2021-05-26 02:33:47'),
(208, 8, 1, 'ı9ı9', '2021-05-26 02:34:00'),
(209, 1, 8, '99', '2021-05-26 02:34:14'),
(210, 1, 8, '9', '2021-05-26 02:34:16'),
(211, 8, 1, 'ıı', '2021-05-26 02:34:23'),
(212, 1, 8, 'ı9ı9', '2021-05-26 02:34:32'),
(213, 1, 8, 'ı9ı9', '2021-05-26 02:34:43'),
(214, 1, 8, '999', '2021-05-26 02:34:50'),
(215, 1, 8, 'ı', '2021-05-26 02:35:10'),
(216, 1, 8, 'ı99ı', '2021-05-26 02:35:17'),
(217, 8, 1, 'ı9ı9', '2021-05-26 02:35:22'),
(218, 8, 1, 'ııııı', '2021-05-26 02:35:24'),
(219, 8, 1, 'üü', '2021-05-26 02:36:41'),
(220, 1, 8, 'll', '2021-05-26 02:36:53'),
(221, 1, 8, 'klklkl', '2021-05-26 02:37:01'),
(222, 8, 1, 'llllll', '2021-05-26 02:37:07'),
(223, 8, 1, 'll', '2021-05-26 02:37:38'),
(224, 1, 8, 'mmm', '2021-05-26 02:40:41'),
(225, 1, 8, 'mmmm', '2021-05-26 02:40:45'),
(226, 8, 1, 'mmm', '2021-05-26 02:41:28'),
(227, 8, 1, 'mjkmkmk', '2021-05-26 02:41:45'),
(228, 1, 8, 'hi', '2021-05-26 15:31:46'),
(229, 8, 1, 'sup', '2021-05-26 15:32:07'),
(230, 1, 8, 'ii', '2021-05-26 15:32:13'),
(231, 8, 1, 'ok', '2021-05-26 15:32:34'),
(232, 2, 1, 'll', '2021-05-26 16:46:08'),
(233, 2, 1, 'şşşş', '2021-05-26 16:46:11'),
(234, 2, 1, '', '2021-05-26 16:46:14'),
(235, 8, 1, 'hi', '2021-05-26 17:10:37'),
(236, 1, 8, 'hi', '2021-05-26 17:10:46'),
(237, 8, 1, 'sup', '2021-05-26 17:11:24'),
(238, 1, 8, 'oo', '2021-05-26 17:11:38'),
(239, 8, 1, 'öö', '2021-05-26 17:11:44'),
(240, 1, 8, 'hey', '2021-05-26 17:11:59'),
(241, 8, 1, 'hhh', '2021-05-26 17:12:12'),
(242, 1, 8, 'llll', '2021-05-26 17:12:24'),
(243, 1, 8, 'hi', '2021-05-26 19:34:58'),
(244, 1, 8, 'wassup', '2021-05-26 19:35:16'),
(245, 1, 8, 'şş', '2021-05-26 19:35:24'),
(246, 1, 8, 'hh', '2021-05-26 19:35:28'),
(247, 1, 8, 'ghgh', '2021-05-26 19:35:35'),
(248, 8, 1, 'ghghghgh', '2021-05-26 19:35:44'),
(249, 1, 8, 'ghghg', '2021-05-26 19:36:04'),
(250, 1, 8, 'nnn', '2021-05-26 19:37:17'),
(251, 1, 8, 'okey', '2021-05-26 19:37:37'),
(252, 8, 1, 'uıuı', '2021-05-26 19:38:05'),
(253, 8, 1, 'ııı', '2021-05-26 19:38:10'),
(254, 8, 1, 'ıııııı', '2021-05-26 19:39:28'),
(255, 1, 8, 'uuu', '2021-05-26 19:39:36'),
(256, 1, 8, 'uıuıuı', '2021-05-26 19:39:52'),
(257, 8, 1, 'uıuıuıuıuı', '2021-05-26 19:40:05');

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

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
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

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
  `classNum` int(1) DEFAULT NULL,
  `website` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `github` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `twitter` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `instagram` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `facebook` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `kaggle` varchar(80) COLLATE utf8mb4_bin DEFAULT NULL,
  `isOnline` tinyint(1) NOT NULL DEFAULT '0',
  `UserTypeName` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'User',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `UserTypeName` (`UserTypeName`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`id`, `Name`, `Surname`, `EmailAddress`, `Password`, `profilePhoto`, `mobile`, `address`, `city`, `district`, `department`, `classNum`, `website`, `github`, `twitter`, `instagram`, `facebook`, `kaggle`, `isOnline`, `UserTypeName`, `createdAt`) VALUES
(1, 'Ogulcan', 'Culfa', 'ogulcanculfa@gmail.com', '123456789', 'http://localhost:5000/images/users/me.jpg', '', 'Adnan Kahveci Mah. Yavuz Sultan Selim Bulvarı Göktürk-1 Apt. Kat:5 Daire:28', 'İstanbul', 'Beylikdüzü', 'YBS', 4, 'https://www.ogulcanculfa.com', 'https://github.com/OgulcanCulfa', '', '', '', '', 0, 'Root', '2021-04-19 00:00:00'),
(2, 'Mesut', 'Güneri', 'mesutkomser@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', 'İstanbul', 'Beyoğlu', '', NULL, '', '', '', '', '', NULL, 0, 'User', '0000-00-00 00:00:00'),
(4, 'Stannis', 'Baratheon', 'kingstannis@gmail.com', '123456789', 'http://localhost:5000/images/users/Stannis-Baratheon-Profile_(3).png	', '', '', 'Westeros', 'Dragonstone', '', NULL, '', '', '', '', '', NULL, 0, 'User', '0000-00-00 00:00:00'),
(5, 'Robert', 'Baratheon', 'kingrobert@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', '', '', '', NULL, '', '', '', '', '', NULL, 0, 'User', '0000-00-00 00:00:00'),
(6, 'Haktan', 'Yücesoy', 'haktanyucesoy@gmail.com', '123456789', 'http://localhost:5000/images/users/hacktin.jpg	', '', 'Somewhere', 'Balıkesir', 'Ayvalık', 'YBS', NULL, '', 'https://github.com/KadirHaktan', '', '', '', '', 0, 'User', '0000-00-00 00:00:00'),
(7, 'Tywin', 'Lannister', 'tywinlannister@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', '', '', '', NULL, '', '', '', '', '', NULL, 0, 'User', '0000-00-00 00:00:00'),
(8, 'Aynur', 'Katırcıoğlu', 'aynrkatircioglu@gmail.com', '123456789', 'http://localhost:5000/images/users/aynr.jpg		', '', 'Hatayda bi yer.', 'Hatay', 'İskenderun', 'Bilgisayar Mühendisliği', NULL, '', 'https://github.com/aynrkatircioglu', '', '', '', 'https://www.kaggle.com/aynrkatircioglu', 0, 'User', '0000-00-00 00:00:00'),
(9, 'Zeynep', 'İşbay', 'zeynepisbay@gmail.com', '123456789', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg	', '', '', 'İstanbul', 'Üsküdar', '', NULL, '', '', '', '', '', NULL, 0, 'User', '0000-00-00 00:00:00'),
(10, 'Sefa', 'Öztürkmen', 'sefaozturkmen@gmail.com', '123456789', 'http://localhost:5000/images/users/sefa.jpg', '', '', '', '', '', NULL, '', '', '', '', '', NULL, 0, 'User', '2021-05-08 22:38:39'),
(33, 'Mehmet', 'Yılmaz', 'myilmaz@gmail.com', '44444444444', 'http://localhost:5000/images/users/Empty-Profile-Testimonials.jpg', '', '', '', '', 'YBS', 4, '', '', '', '', '', NULL, 0, 'User', '2021-05-24 22:30:41');

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
,`isOnline` tinyint(1)
);

-- --------------------------------------------------------

--
-- Structure for view `vwcategorieswithcounts`
--
DROP TABLE IF EXISTS `vwcategorieswithcounts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwcategorieswithcounts`  AS  select `tblcategory`.`id` AS `id`,`tblcategory`.`categoryName` AS `categoryName`,count(`tblposts`.`id`) AS `countOfCategories` from (`tblcategory` left join `tblposts` on((`tblcategory`.`id` = `tblposts`.`categoryId`))) group by `tblcategory`.`id` ;

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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwusersforchat`  AS  select `tbluser`.`id` AS `id`,`tbluser`.`Name` AS `Name`,`tbluser`.`Surname` AS `Surname`,`tbluser`.`profilePhoto` AS `profilePhoto`,`tbluser`.`isOnline` AS `isOnline` from `tbluser` order by `tbluser`.`isOnline` desc ;

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
