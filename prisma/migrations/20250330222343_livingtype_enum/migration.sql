/*
  Warnings:

  - Added the required column `category` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` ADD COLUMN `category` ENUM('ON_CAMPUS', 'OFF_CAMPUS') NOT NULL;
