/*
  Warnings:

  - Added the required column `savedCode` to the `ExerciseProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseProgress" ADD COLUMN     "savedCode" TEXT NOT NULL;
