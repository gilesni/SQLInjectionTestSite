DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `id` MEDIUMINT(9) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `size` ENUM('x-small', 'small', 'medium', 'large', 'x-large'),
  `value` SMALLINT(5),
  `color` ENUM('red', 'blue', 'green', 'black', 'white', 'purple', 'orange', 'grey', 'brown'),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES `items` WRITE;
INSERT INTO `items` VALUES
  (null, 'Chair', 'x-large', 50, 'black'),
  (null, 'Table', 'x-large', 75, 'brown'),
  (null, 'Stapler', 'small', 10, 'black'),
  (null, 'PaperClip', 'x-small', 1, 'grey'),
  (null, 'Computer', 'large', 800, 'black'),
  (null, 'Keyboard', 'medium', 20, 'white'),
  (null, 'Mouse', 'small', 10, 'black'),
  (null, 'Paper Tray', 'large', 30, 'blue');
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `secret` VARCHAR(255),
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES
  ('rosulek', 'hunter2', 'crypto'),
  ('xXkiller269Xx', 'blunder years', 'breniser'),
  ('hooyah1775', 'navy', 'rotc'),
  ('hoibbes', 'p4ssw0rd', 'trombone');
UNLOCK TABLES;
