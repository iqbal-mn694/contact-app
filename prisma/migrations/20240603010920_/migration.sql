-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_contactId_fkey`;

-- AlterTable
ALTER TABLE `group` MODIFY `contactId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Blacklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blacklist` BOOLEAN NULL,
    `contactId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blacklist` ADD CONSTRAINT `Blacklist_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
