-- DropForeignKey
ALTER TABLE `Mood` DROP FOREIGN KEY `Mood_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mood` ADD CONSTRAINT `Mood_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
