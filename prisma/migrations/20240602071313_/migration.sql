-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_contactId_fkey`;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
