/*
  Warnings:

  - A unique constraint covering the columns `[uf]` on the table `ufs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ufs_uf_key" ON "ufs"("uf");
