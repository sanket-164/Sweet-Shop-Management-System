/*
  Warnings:

  - You are about to alter the column `price` on the `Sweet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.

*/
-- DropIndex
DROP INDEX `Sweet_name_category_key` ON `Sweet`;

-- AlterTable
ALTER TABLE `Sweet` MODIFY `price` INTEGER NOT NULL;
