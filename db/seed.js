const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Bob",
      email: `${Math.random().toString(32).substring(2)}@example.com`,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Alice",
      email: `${Math.random().toString(32).substring(2)}@example.com`,
    },
  });

  const tags = await prisma.tag.createMany({
    data: { text: Math.random().toString(32).substring(2) },
  });

  const data = {
    name: "MacBook Pro 16-inch",
    description: "M1チップ搭載のMacBook Proです。",
    price: 200000,
    shippingMethodCode: "1",
    shippingDaysCode: "1",
    conditionCode: "1",
    isShippingIncluded: true,
    isPublic: true,
    seller: {
      connect: {
        id: user.id,
      },
    },
    images: {
      create: {
        imageURL:
          "https://media-swap-image-storage.s3.amazonaws.com/products/1695991467209_banana",
      },
    },
    tags: {
      create: {
        tag: {
          create: {
            text: Math.random().toString(32).substring(2),
          },
        },
      },
    },
  };

  // 購入可能データのシード
  const onSaleItem = await prisma.item.create({
    data,
  });

  // 購入済みデータのシード
  const soldItem = await prisma.item.create({
    data: {
      name: "MacBook Pro 13-inch",
      description: "M1チップ搭載のMacBook Proです。",
      price: 150000,
      shippingMethodCode: "1",
      shippingDaysCode: "1",
      conditionCode: "1",
      isShippingIncluded: true,
      isPublic: true,
      seller: {
        connect: {
          id: user.id,
        },
      },
      images: {
        create: {
          imageURL:
            "https://media-swap-image-storage.s3.amazonaws.com/products/1695991467209_banana",
        },
      },
      tags: {
        create: {
          tag: {
            create: {
              text: Math.random().toString(32).substring(2),
            },
          },
        },
      },
    },
  });

  // 出品情報コメントの作成
  await prisma.itemComment.create({
    data: {
      userId: user2.id,
      itemId: soldItem.id,
      comment: "Great product!",
      createdAt: new Date("2023-01-01T00:00:00Z"),
    },
  });

  // 取引データの作成
  const transaction = await prisma.transaction.create({
    data: {
      itemId: soldItem.id,
      buyerId: user2.id,
      transactionStatus: 2,
    },
  });

  // 取引コメントデータの作成
  const transactionComment = await prisma.transactionComment.create({
    data: {
      transactionId: transaction.id,
      userId: user2.id,
      comment: "Looking forward to receiving the item.",
    },
  });

  // // TransactionRatingOptionのシードデータ
  // const transactionRatingOption = await prisma.transactionRatingOption.create({
  //   data: {
  //     name: "Excellent",
  //     rating: 5,
  //   },
  // });

  // // NotificationTypeのシードデータ
  // const notificationType = await prisma.notificationType.create({
  //   data: {
  //     name: "取引通知",
  //     defaultPermit: true,
  //   },
  // });

  // // Notificationのシードデータ
  // const notification = await prisma.notification.create({
  //   data: {
  //     notificationTypeId: notificationType.id,
  //     content: "新しい取引が利用可能です。",
  //   },
  // });

  // // UserNotificationReadのシードデータ
  // const userNotificationRead = await prisma.userNotificationRead.create({
  //   data: {
  //     notificationId: notification.id,
  //     userId: user2.id,
  //   },
  // });

  // // UserNotificationPermitのシードデータ
  // const userNotificationPermit = await prisma.userNotificationPermit.create({
  //   data: {
  //     userId: user2.id,
  //     notificationTypeId: notificationType.id,
  //     isPermit: true,
  //   },
  // });

  // // Accountのシードデータ
  // const account = await prisma.account.create({
  //   data: {
  //     userId: user2.id,
  //     type: "oauth",
  //     provider: "google",
  //     providerAccountId: "provider-specific-account-id",
  //   },
  // });

  // // Sessionのシードデータ
  // const session = await prisma.session.create({
  //   data: {
  //     userId: user2.id,
  //     sessionToken: "session-token-string",
  //     expires: new Date("2023-12-31T23:59:59Z"),
  //   },
  // });

  // // VerificationTokenのシードデータ
  // const verificationToken = await prisma.verificationToken.create({
  //   data: {
  //     identifier: "user-email@example.com",
  //     token: "verification-token-string",
  //     expires: new Date("2023-12-31T23:59:59Z"),
  //   },
  // });

  // // Addressのシードデータ
  // const address = await prisma.address.create({
  //   data: {
  //     userId: user2.id, // 既存のユーザーID
  //     postalCode: "123-4567",
  //     prefecture: "東京都",
  //     city: "新宿区",
  //     addressLine1: "〇〇ビルディング101",
  //     addressLine2: "その他の住所情報",
  //     phoneNumber: "03-1234-5678",
  //   },
  // });

  // // Couponのシードデータ
  // const coupon = await prisma.coupon.create({
  //   data: {
  //     name: "10%オフ",
  //     discountRate: 10,
  //     startDate: new Date("2023-01-01T00:00:00Z"),
  //     endDate: new Date("2023-12-31T23:59:59Z"),
  //   },
  // });

  // // ItemReportのシードデータ
  // const itemReport = await prisma.itemReport.create({
  //   data: {
  //     itemId: soldItem.id, // 既存の出品情報ID
  //     userId: user2.id, // 既存のユーザーID
  //     comment: "不適切な内容があります。",
  //   },
  // });

  // // PointChangeのシードデータ
  // const pointChange = await prisma.pointChange.create({
  //   data: {
  //     userId: user2.id, // 既存のユーザーID
  //     amount: 1000,
  //     date: new Date(), // 現在の日時
  //     description: "初回登録ボーナス",
  //   },
  // });

  // // PointChangeEventのシードデータ
  // const pointChangeEvent = await prisma.pointChangeEvent.create({
  //   data: {
  //     name: "新年のボーナスポイント",
  //     amount: 500,
  //   },
  // });

  // // TransferRequestのシードデータ
  // const transferRequest = await prisma.transferRequest.create({
  //   data: {
  //     userId: user2.id, // 既存のユーザーID
  //     amount: 1500,
  //     date: new Date(), // 現在の日時
  //     isTransferred: false,
  //   },
  // });

  // // UserCouponのシードデータ
  // const userCoupon = await prisma.userCoupon.create({
  //   data: {
  //     userId: user2.id, // 既存のユーザーID
  //     couponId: coupon.id, // 既存のクーポンID
  //     isUsed: false,
  //   },
  // });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
