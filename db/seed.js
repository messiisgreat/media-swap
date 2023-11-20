const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 出品者をシードする
  const seller = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });

  const buyer = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
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
  const listingImage = await prisma.listingImage.create({
    data: {
      listing: {
        connect: { id: listing.id }, // Listing モデルと接続
      },
      imageURL:
        "https://media-swap-image-storage.s3.amazonaws.com/products/1695991467209_banana",
      caption: "Very delicious banana.",
      order: 1,
      // その他の必要な Image フィールド
    },
  });

  // 商品状態を作成
  const newCondition = await prisma.productCondition.create({
    data: {
      name: "New",
      listings: {
        connect: { id: listing.id },
      },
    },
  });

  // カテゴリーを作成（親子関係もここで設定）
  const parentCategory = await prisma.category.create({
    data: {
      categoryName: "Electronics",
    },
  });

  const childCategory = await prisma.category.create({
    data: {
      categoryName: "Computers",
      parentId: parentCategory.id,
    },
  });

  // タグを作成
  const tag = await prisma.tag.create({
    data: {
      text: "Innovative",
    },
  });

  const like = await prisma.like.create({
    data: {
      userId: seller.id,
      listingId: listing.id,
    },
  });

  const listingCategory = await prisma.listingCategory.create({
    data: {
      listingId: listing.id,
      categoryId: childCategory.id,
    },
  });

  const listingTag = await prisma.listingTag.create({
    data: {
      listingId: listing.id,
      tagId: tag.id,
    },
  });

  // 配送日数データの作成
  const shippingDay = await prisma.shippingDays.create({
    data: {
      name: "1 to 3 days",
      maxDays: 3,
      listing: {
        connect: { id: listing.id },
      },
    },
  });

  // 配送方法データの作成
  const shippingMethod = await prisma.shippingMethod.create({
    data: {
      name: "Express",
      amount: 500,
      listings: {
        connect: { id: listing.id },
      },
    },
  });

  // 出品情報コメントの作成
  const listingComment = await prisma.listingComment.create({
    data: {
      userId: seller.id,
      listingId: listing.id,
      comment: "Great product!",
      createdAt: new Date("2023-01-01T00:00:00Z"),
    },
  });

  // 取引データの作成
  const transaction = await prisma.transaction.create({
    data: {
      listingId: listing.id,
      buyerId: seller.id,
      transactionStatus: 2,
    },
  });

  // 取引コメントデータの作成
  const transactionComment = await prisma.transactionComment.create({
    data: {
      transactionId: transaction.id,
      userId: seller.id,
      comment: "Looking forward to receiving the item.",
    },
  });

  const transactionRating = await prisma.transactionRating.create({
    data: {
      transactionId: transaction.id,
      raterId: seller.id,
      ratedId: buyer.id,
      // transactionRatingOptionIdはオプショナルです
      comment: "素晴らしい取引でした。",
    },
  });

  // TransactionRatingOptionのシードデータ
  const transactionRatingOption = await prisma.transactionRatingOption.create({
    data: {
      name: "Excellent",
      rating: 5,
    },
  });

  // UserViewHistoryのシードデータ
  const userViewHistory = await prisma.userViewHistory.create({
    data: {
      userId: seller.id,
      listingId: listing.id,
    },
  });

  // NotificationTypeのシードデータ
  const notificationType = await prisma.notificationType.create({
    data: {
      name: "取引通知",
      defaultPermit: true,
    },
  });

  // Notificationのシードデータ
  const notification = await prisma.notification.create({
    data: {
      notificationTypeId: notificationType.id,
      content: "新しい取引が利用可能です。",
    },
  });

  // UserNotificationReadのシードデータ
  const userNotificationRead = await prisma.userNotificationRead.create({
    data: {
      notificationId: notification.id,
      userId: seller.id,
    },
  });

  // UserNotificationPermitのシードデータ
  const userNotificationPermit = await prisma.userNotificationPermit.create({
    data: {
      userId: seller.id,
      notificationTypeId: notificationType.id,
      isPermit: true,
    },
  });

  // Accountのシードデータ
  const account = await prisma.account.create({
    data: {
      userId: seller.id,
      type: "oauth",
      provider: "google",
      providerAccountId: "provider-specific-account-id",
    },
  });

  // Sessionのシードデータ
  const session = await prisma.session.create({
    data: {
      userId: seller.id,
      sessionToken: "session-token-string",
      expires: new Date("2023-12-31T23:59:59Z"),
    },
  });

  // VerificationTokenのシードデータ
  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: "user-email@example.com",
      token: "verification-token-string",
      expires: new Date("2023-12-31T23:59:59Z"),
    },
  });

  // Addressのシードデータ
  const address = await prisma.address.create({
    data: {
      userId: seller.id, // 既存のユーザーID
      postalCode: "123-4567",
      prefecture: "東京都",
      city: "新宿区",
      addressLine1: "〇〇ビルディング101",
      addressLine2: "その他の住所情報",
      phoneNumber: "03-1234-5678",
    },
  });

  // Couponのシードデータ
  const coupon = await prisma.coupon.create({
    data: {
      name: "10%オフ",
      discountRate: 10,
      startDate: new Date("2023-01-01T00:00:00Z"),
      endDate: new Date("2023-12-31T23:59:59Z"),
    },
  });

  // ListingReportのシードデータ
  const listingReport = await prisma.listingReport.create({
    data: {
      listingId: listing.id, // 既存の出品情報ID
      userId: seller.id, // 既存のユーザーID
      comment: "不適切な内容があります。",
    },
  });

  // PointChangeのシードデータ
  const pointChange = await prisma.pointChange.create({
    data: {
      userId: seller.id, // 既存のユーザーID
      amount: 1000,
      date: new Date(), // 現在の日時
      description: "初回登録ボーナス",
    },
  });

  // PointChangeEventのシードデータ
  const pointChangeEvent = await prisma.pointChangeEvent.create({
    data: {
      name: "新年のボーナスポイント",
      amount: 500,
    },
  });

  // TransferRequestのシードデータ
  const transferRequest = await prisma.transferRequest.create({
    data: {
      userId: seller.id, // 既存のユーザーID
      amount: 1500,
      date: new Date(), // 現在の日時
      isTransferred: false,
    },
  });

  // UserCouponのシードデータ
  const userCoupon = await prisma.userCoupon.create({
    data: {
      userId: seller.id, // 既存のユーザーID
      couponId: coupon.id, // 既存のクーポンID
      isUsed: false,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
