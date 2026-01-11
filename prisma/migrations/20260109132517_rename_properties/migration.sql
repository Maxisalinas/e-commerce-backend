/*
  Warnings:

  - You are about to drop the column `billingZip` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingZip` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `ShippingMethod` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billingPostalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPostalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `ShippingMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "billingZip",
DROP COLUMN "shippingZip",
ADD COLUMN     "billingPostalCode" TEXT NOT NULL,
ADD COLUMN     "shippingPostalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "weight" DECIMAL(3,3) NOT NULL;

-- AlterTable
ALTER TABLE "ShippingMethod" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShippingMethod_code_key" ON "ShippingMethod"("code");
