const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      name: "ユーザー1",
      email: "user1@example.com",
      image: "https://media-swap-image-storage.s3.amazonaws.com/products/1695809991830_test",
      Products: {
        create: [
          {
            description: "商品1の説明",
            imageUrl: "https://media-swap-image-storage.s3.amazonaws.com/products/1695809991830_test",
            name: "商品1",
            price: 1000,
            tagIds: ["tag1"],
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "ユーザー2",
      email: "user2@example.com",
      image: "https://media-swap-image-storage.s3.amazonaws.com/products/1695809991830_test",
    },
  });

  // タグの作成
  const tag1 = await prisma.tag.create({
    data: {
      text: "タグ1",
    },
  });

  // 会話とメッセージの作成
  const conversation = await prisma.conversation.create({
    data: {
      users: {
        connect: [
          { id: user1.id },
          { id: user2.id },
        ],
      },
      messages: {
        create: [
          {
            body: "こんにちは、商品1に興味があります。",
            sender: {
              connect: { id: user2.id },
            },
          },
        ],
      },
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
