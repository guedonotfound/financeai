-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "observations" TEXT,
ALTER COLUMN "amount" DROP DEFAULT,
ALTER COLUMN "costPrice" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "costPrice" DROP DEFAULT;
