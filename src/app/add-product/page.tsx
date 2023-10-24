import { fetchTags, insertProduct } from "@/app/add-product/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormSubmitButton from "@/components/FormSubmitButton";
import ProductTag from "@/components/ProductTag";
import { uploadToS3 } from "@/lib/ImageUploadS3";
import { prisma } from "@/lib/db/prisma";
import { Tag } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Swappy",
};

/**
 * 一致しないタグの取得
 *
 * @param {Tag[]} tags - タグオブジェクトの配列
 * @returns {Promise<Tag[]>} 一致しないタグオブジェクトの配列
 */
async function getNonMatchingTags(tags: Tag[]): Promise<Tag[]> {
  const allTagNames = await fetchTags();
  const existingTagNames = allTagNames.flatMap((tag) => tag.text);
  const nonMatchingTags = tags.filter(
    (tag) => !existingTagNames.includes(tag.text),
  );
  return nonMatchingTags;
}

/**
 * タグ情報を処理して、一致するタグのIDの配列を返す
 *
 * @param {string | null | undefined} tagsString - タグ情報のJSON文字列。省略可能
 * @returns {Promise<string[]>} 一致するタグのIDの配列
 */
async function processTags(tagsString?: string | null): Promise<string[]> {
  const tagsObject = tagsString ? JSON.parse(tagsString) : null;

  if (tagsObject) {
    const nonMatching = await getNonMatchingTags(tagsObject);
    await prisma.tag.createMany({
      data: nonMatching.map((tag) => ({ text: tag.text })),
    });
  }
  const matchingIds = tagsObject?.map((tag: Tag) => tag.id);

  tagsObject?.forEach(async (tag: Tag) => {
    const existingTag = await prisma.tag.findFirst({
      where: {
        text: tag.text,
      },
    });
    if (existingTag) {
      matchingIds?.push(existingTag.id);
    }
  });

  return matchingIds;
}

/**
 * フォームに入力された商品情報をDBに登録する
 * @param formData
 */
const addProduct = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const tagsString = formData.get("tags")?.toString();
  const imageFile = formData.get("imageFile") as File;
  if (!name || !description || !imageFile || !price) {
    throw Error("必要な項目が存在しません");
  }

  const tagIds = await processTags(tagsString);

  const imageUrl = await uploadToS3(
    imageFile,
    `products/${Date.now()}_${name}`, // 一意のIDをつけるべきでは？
  );

  /** @todo 必須の型がいろいろと不足しているのでanyにしてある */
  const product: any = {
    name,
    description,
    imageUrl,
    price,
    tagIds,
  };

  await insertProduct(product);
  redirect("/");
  // TODO: 失敗したときの処理を書いてない
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const tags = await fetchTags();

  return (
    <div className="my-8">
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct} className="flex flex-col gap-3">
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <input
          required
          type="file"
          name="imageFile"
          accept="image/*"
          className="file-input file-input-bordered file-input-accent"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered w-full"
        />
        <ProductTag fetchedTags={tags} />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
