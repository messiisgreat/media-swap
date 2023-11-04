const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 出品者をシードする
  const seller = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      // その他の必要な User フィールド
    },
  });

  // 商品情報をシードする
  const listing = await prisma.listing.create({
    data: {
      productName: "Super Banana",
      price: 5000,
      description: "An excellent delicious banana.",
      isPublic: true,
      seller: {
        connect: { id: seller.id }, // 出品者として先に作成した User を接続
      },
      // その他の必要な Listing フィールド
    },
  });

  // 画像情報をシードする
  const image = await prisma.image.create({
    data: {
      imageURL:
        "https://media-swap-image-storage.s3.amazonaws.com/products/1695991467209_banana",
      caption: "Very delicious banana.",
      // その他の必要な Image フィールド
    },
  });

  // 出品情報と画像のリレーションを作成する
  const listingImage = await prisma.listingImage.create({
    data: {
      listing: {
        connect: { id: listing.id }, // Listing モデルと接続
      },
      image: {
        connect: { id: image.id }, // Image モデルと接続
      },
      order: 1,
    },
  });

  console.log(`Created listing with id: ${listing.id}`);
  console.log(`Created image with id: ${image.id}`);
  console.log(`Created listingImage with id: ${listingImage.id}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
