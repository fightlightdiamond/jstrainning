/*
  Warnings:

  - You are about to drop the column `skill` on the `Hero` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Hero` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "skill",
ALTER COLUMN "acc" SET DEFAULT 0,
ALTER COLUMN "atk" SET DEFAULT 1000,
ALTER COLUMN "atkHealing" SET DEFAULT 0,
ALTER COLUMN "cc" SET DEFAULT 0,
ALTER COLUMN "critDmg" SET DEFAULT 175,
ALTER COLUMN "critRate" SET DEFAULT 20,
ALTER COLUMN "def" SET DEFAULT 15,
ALTER COLUMN "dodge" SET DEFAULT 1,
ALTER COLUMN "effectResistance" SET DEFAULT 0,
ALTER COLUMN "intrinsicStatus" SET DEFAULT 0,
ALTER COLUMN "element" SET DEFAULT 0,
ALTER COLUMN "hp" SET DEFAULT 10000,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "spd" SET DEFAULT 200,
ALTER COLUMN "status" SET DEFAULT 1,
ALTER COLUMN "story" DROP NOT NULL,
ALTER COLUMN "guide" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
