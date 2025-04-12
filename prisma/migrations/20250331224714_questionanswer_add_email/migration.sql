/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `QuestionAnswer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `QuestionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QuestionAnswer` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `QuestionAnswer_email_key` ON `QuestionAnswer`(`email`);
