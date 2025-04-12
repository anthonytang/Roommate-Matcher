/*
  Warnings:

  - You are about to drop the column `question1` on the `QuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `question2` on the `QuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `question3` on the `QuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `question4` on the `QuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `question5` on the `QuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `searchingPreferences` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_UserMatches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answers` to the `QuestionAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuestionAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `livingType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_UserMatches` DROP FOREIGN KEY `_UserMatches_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserMatches` DROP FOREIGN KEY `_UserMatches_B_fkey`;

-- AlterTable
ALTER TABLE `QuestionAnswer` DROP COLUMN `question1`,
    DROP COLUMN `question2`,
    DROP COLUMN `question3`,
    DROP COLUMN `question4`,
    DROP COLUMN `question5`,
    ADD COLUMN `answers` JSON NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `weights` JSON NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `searchingPreferences`,
    ADD COLUMN `livingType` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_UserMatches`;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `options` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchResult` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `matches` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MatchResult_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MatchResult` ADD CONSTRAINT `MatchResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
