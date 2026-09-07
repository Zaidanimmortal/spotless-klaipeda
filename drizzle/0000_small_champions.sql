CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(160) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`service` varchar(180) NOT NULL,
	`bookingDate` varchar(10) NOT NULL,
	`bookingTime` varchar(5) NOT NULL,
	`notes` text,
	`status` enum('new','confirmed','cancelled') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
