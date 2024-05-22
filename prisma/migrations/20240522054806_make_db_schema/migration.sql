-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `profile_pict` VARCHAR(191) NOT NULL,
    `labelId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Label` (
    `id` INTEGER NOT NULL,
    `label_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_labelId_fkey` FOREIGN KEY (`labelId`) REFERENCES `Label`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
