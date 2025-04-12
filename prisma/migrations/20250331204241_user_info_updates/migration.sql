/*
  Warnings:

  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bringingItems` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lookingFor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roommateStatus` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `bio` VARCHAR(191) NOT NULL,
    ADD COLUMN `bringingItems` JSON NOT NULL,
    ADD COLUMN `lookingFor` JSON NOT NULL,
    ADD COLUMN `major` VARCHAR(191) NOT NULL,
    ADD COLUMN `roommateStatus` VARCHAR(191) NOT NULL;
