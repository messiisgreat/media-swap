/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment */
import { prismaMock } from "@/lib/prismaMock";
import { updateItem, type UpdateItem } from "@/repositories/item";
import { type Listing } from "@prisma/client";

describe("Item Repository", () => {
  describe("updateItem", () => {
    const mockItem: Listing = {
      id: "12",
      productName: "同人誌A",
      price: 2800,
      previousPrice: null,
      description: "同人誌Aです",
      isPublic: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: "1",
      shippingDaysId: "1",
      shippingMethodId: "1",
      productConditionId: "1",
      transactionId: null,
      pageView: 0,
      postageIsIncluded: false,
    };

    const query: UpdateItem = {
      ...mockItem,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/fuurin-paint-workshop.appspot.com/o/listing%2Fimage%2F12%2F0?alt=media&token=1",
      ],
      tags: ["同人誌"],
    };
    it("Itemの更新ができること", async () => {
      prismaMock.listing.update.mockResolvedValue(mockItem);

      expect(await updateItem(query)).toEqual(mockItem);
    });

    it("タグの更新メソッドが呼ばれていること", async () => {
      prismaMock.listing.update.mockResolvedValue(mockItem);

      await updateItem(query);

      expect(prismaMock.listing.update).toHaveBeenCalledWith({
        where: { id: query.id },
        data: expect.objectContaining({
          tags: {
            updateMany: {
              where: { listingId: query.id },
              data: query.tags.map((text) => ({
                tag: { connectOrCreate: { where: { text }, create: { text } } },
              })),
            },
          },
        }),
      });
    });

    it("imageUrlの更新メソッドが呼ばれていること", async () => {
      prismaMock.listing.update.mockResolvedValue(mockItem);

      await updateItem(query);

      expect(prismaMock.listing.update).toHaveBeenCalledWith({
        where: { id: query.id },
        data: expect.objectContaining({
          images: {
            updateMany: {
              where: { listingId: query.id },
              data: query.imageUrls.map((url, i) => ({
                imageUrl: url,
                order: i,
              })),
            },
          },
        }),
      });
    });

    it("更新対象が存在しない場合、エラーがスローされること", async () => {
      prismaMock.listing.update.mockRejectedValue(new Error("Not Found"));

      await expect(updateItem(query)).rejects.toThrow("Not Found");
    });

    it("DBエラーが発生した場合、エラーがスローされること", async () => {
      prismaMock.listing.update.mockRejectedValue(new Error("Database Error"));

      await expect(updateItem(query)).rejects.toThrow("Database Error");
    });
  });
});
