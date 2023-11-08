import {
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
  TRANSACTION_RATING_OPTION,
  TRANSACTION_STATUS,
} from "@/constants/listing";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  Promise.all(
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

  Promise.all(
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

  Promise.all(
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

  Promise.all(
    TRANSACTION_STATUS.map((status) => {
      const { id, ...rest } = status;
      return prisma.transactionStatus.upsert({
        where: {
          id,
        },
        update: rest,
        create: status,
      });
    }),
  );

  Promise.all(
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
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("定数のシードが完了しました🌱");
  });
