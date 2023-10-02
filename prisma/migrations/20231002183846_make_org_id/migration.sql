/*
  Warnings:

  - You are about to drop the column `orgEmail` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `orgs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_orgEmail_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "orgEmail",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "orgs_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
