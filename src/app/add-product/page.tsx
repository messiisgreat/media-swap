import { prisma } from "@/lib/db/prisma";
import { uploadToS3 } from "@/lib/ImageUploadS3";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProductTag from "../components/ProductTag";
import { useState } from "react";
import { Tag } from "../types/tag";

export const metadata = {
  title: "Add Product - Swappy",
};

async function fetchTags() {
  "use server";

  const fetchedTags = await prisma.tag.findMany();
  const transformedTags = fetchedTags.map((tag) => ({
    id: tag.id,
    text: tag.name,
  }));
  return transformedTags;
}

async function getNonMatchingTags(tags: Tag[]) {
  // Prismaを使用してtagコレクションからすべてのnameを取得
  const allTagNames = await prisma.tag.findMany({
    select: {
      name: true,
    },
  });

  const existingTagNames = allTagNames.map((t) => t.name);

  // 提供されたタグの中から、existingTagNamesに存在しないものをフィルタリング
  const nonMatchingTags = tags.filter(
    (tag) => !existingTagNames.includes(tag.text),
  );

  return nonMatchingTags;
}

async function processTags(tagsString?: string | null): Promise<string[]> {
  const tagsObject = tagsString ? JSON.parse(tagsString) : null;

  if (tagsObject) {
    const nonMatching = await getNonMatchingTags(tagsObject);
    for (const tag of nonMatching) {
      await prisma.tag.create({
        data: {
          name: tag.text,
        },
      });
    }
  }
  const matchingIds: string[] = [];
  for (const tagObj of tagsObject) {
    const tag = await prisma.tag.findFirst({
      where: {
        name: tagObj.text,
      },
    });
    if (tag) {
      matchingIds.push(tag.id);
    }
  }
  return matchingIds;
}

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  // formDataからデータを取得する
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const tagsString = formData.get("tags")?.toString();

  const tagIds = await processTags(tagsString);

  const imageFile = formData.get("imageFile") as File;
  const imageUrl = await uploadToS3(
    imageFile,
    `products/${Date.now()}_${name}`,
  );

  if (!name || !description || !imageUrl || !price) {
    throw Error("必要な項目が存在しません");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      imageUrl,
      price,
      tagIds: tagIds,
      status: "selling",
    },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const tags = await fetchTags();

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>
        <input
          required
          type="file"
          name="imageFile"
          accept="image/*"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <ProductTag fetchedTags={tags} />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
