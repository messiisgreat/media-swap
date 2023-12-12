import prisma from "@/lib/prisma";
import { type Listing } from "@prisma/client";

export type UpdateItem = {
  imageUrls: string[];
  tags: string[];
} & Listing;

/**
 * Item（商品）の情報を更新します
 * @param {UpdateItem} query - 更新する商品の情報。UpdateItem型のオブジェクトで、商品のID、画像URLの配列、タグの配列、およびListingの他のプロパティを含む。
 * @returns {Promise<Listing>} - 更新後の商品情報を含むPromiseオブジェクト。非同期操作が完了すると、このPromiseは更新後のListingオブジェクトを返します。
 * @throws {Prisma.PrismaClientKnownRequestError} - 更新操作が失敗した場合、PrismaClientKnownRequestErrorがスローされます。例えば、指定したIDの商品が存在しない場合などです。
 */
export const updateItem = async (query: UpdateItem): Promise<Listing> => {
  await prisma.listingImage.deleteMany({ where: { id: query.id } });

  return await prisma.listing.update({
    where: { id: query.id },
    data: {
      images: {
        updateMany: {
          where: { listingId: query.id },
          data: query.imageUrls.map((url, i) => ({ imageUrl: url, order: i })),
        },
      },
      productName: query.productName,
      price: query.price,
      description: query.description,
      seller: { connect: { id: query.sellerId } },
      shippingDays: {
        connect: { id: query.shippingDaysId! },
      },
      shippingMethod: {
        connect: { id: query.shippingMethodId! },
      },
      productCondition: {
        connect: { id: query.productConditionId! },
      },
      tags: {
        updateMany: {
          where: { listingId: query.id },
          data: query.tags.map((text) => ({
            tag: { connectOrCreate: { where: { text }, create: { text } } },
          })),
        },
      },
    },
  });
};
