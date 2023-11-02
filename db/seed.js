const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      name: "ユーザー1",
      email: "user1@example.com",
      birthDate: new Date("2000-01-01"),
      iconImageUrl:
        "https://media-swap-image-storage.s3.amazonaws.com/products/1695809991830_test",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "ユーザー2",
      email: "user2@example.com",
      birthDate: new Date("2000-01-01"),
      iconImageUrl:
        "https://media-swap-image-storage.s3.amazonaws.com/products/1695809991830_test",
    },
  });

  const listing = await prisma.listing.create({
    data: {
      description: "商品1の説明",
      productName: "商品1",
      price: 1000,
    },
  });

  // タグの作成
  const tag1 = await prisma.tag.create({
    data: {
      name: "タグ1",
    },
  });

  // 会話とメッセージの作成
  const listingComment = await prisma.listingComment.create({
    data: {
      listingId: listing.id,
      userId: user1.id,
      comment: "コメント1",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
