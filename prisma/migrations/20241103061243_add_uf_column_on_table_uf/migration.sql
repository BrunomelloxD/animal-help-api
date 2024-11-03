/*
  Warnings:

  - Added the required column `uf` to the `ufs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ufs" ADD COLUMN     "uf" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Ong" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Ong_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ong" ADD CONSTRAINT "Ong_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
