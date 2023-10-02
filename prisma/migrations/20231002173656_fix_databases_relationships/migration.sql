/*
  Warnings:

  - You are about to drop the column `petId` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `orgEmail` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "orgEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "petId";

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgEmail_fkey" FOREIGN KEY ("orgEmail") REFERENCES "orgs"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
