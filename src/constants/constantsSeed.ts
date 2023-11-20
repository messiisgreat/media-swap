import {
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
  TRANSACTION_RATING_OPTION,
} from "@/constants/listing";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 定数のシードを行う
 * idが一致するものがあれば更新、無ければ新規作成する
 */
async function main() {
  await Promise.all(
    PRODUCT_CONDITION.map((condition) => {
      const { id, ...rest } = condition;
      return prisma.productCondition.upsert({
        where: {
          id,
        },
        update: rest,
        create: condition,
      });
    }),
  );

  await Promise.all(
    SHIPPING_METHOD.map((method) => {
      const { id, ...rest } = method;
      return prisma.shippingMethod.upsert({
        where: {
          id,
        },
        update: rest,
        create: method,
      });
    }),
  );

  await Promise.all(
    SHIPPING_DAYS.map((days) => {
      const { id, ...rest } = days;
      return prisma.shippingDays.upsert({
        where: {
          id,
        },
        update: rest,
        create: days,
      });
    }),
  );

  await Promise.all(
    TRANSACTION_RATING_OPTION.map((option) => {
      const { id, ...rest } = option;
      return prisma.transactionRatingOption.upsert({
        where: {
          id,
        },
        update: rest,
        create: option,
      });
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("定数のシードが完了しました🌱");
  });
