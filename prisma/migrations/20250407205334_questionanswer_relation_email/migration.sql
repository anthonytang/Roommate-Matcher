/*
  Warnings:

  - You are about to drop the column `userId` on the `QuestionAnswer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `QuestionAnswer` DROP FOREIGN KEY `QuestionAnswer_userId_fkey`;

-- DropIndex
DROP INDEX `QuestionAnswer_userId_key` ON `QuestionAnswer`;

-- AlterTable
ALTER TABLE `QuestionAnswer` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `QuestionAnswer` ADD CONSTRAINT `QuestionAnswer_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
