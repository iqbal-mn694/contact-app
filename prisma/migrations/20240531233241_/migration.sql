-- AlterTable
ALTER TABLE `contact` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `group` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `label` ADD COLUMN `deletedAt` DATETIME(3) NULL;
