/*
  Warnings:

  - You are about to drop the `blacklist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `blacklist` DROP FOREIGN KEY `Blacklist_contactId_fkey`;

-- AlterTable
ALTER TABLE `contact` ADD COLUMN `blacklist` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `blacklist`;
