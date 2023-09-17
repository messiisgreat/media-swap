import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Add Product - MediaSwap',
}

async function addProduct(formData: FormData) {
  "use server";

  // formDataからデータを取得する
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("必要な項目が存在しません")
  }

  await prisma.product.create({
    data: {name, description, imageUrl, price}
  });

  redirect("/");
}

export default function AddProductPage() {
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
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <button className="btn btn-primary btn-block" type="submit">Add Product</button>
      </form>
    </div>
  );
}
