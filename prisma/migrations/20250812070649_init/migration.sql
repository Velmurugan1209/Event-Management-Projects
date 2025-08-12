/*
  Warnings:

  - You are about to drop the `adminconfirmation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `status` ENUM('Accept', 'Reject', 'Pending') NOT NULL;

-- DropTable
DROP TABLE `adminconfirmation`;
