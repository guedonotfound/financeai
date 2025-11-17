-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "costPrice" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "costPrice" DECIMAL(10,2) NOT NULL DEFAULT 0;
